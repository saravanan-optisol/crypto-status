const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const cors = require('cors');
const http = require('http');
const connectDB = require('./dbConfig');
const cryptoRouter = require('./src/routes/cryptoRoute');
const cryptoService = require('./src/services/cryptoService.js');
const logger = require('./src/config/logger/Logger');
const config = require('./src/config/env').getConfig();

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: config.socket_url,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  },
  allowEIO3: true
});

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api', cryptoRouter);

// socket connection
io.on('connection', (socket) => {
  logger.info("Socket connected !!!");
  socket.on('disconnect', function() {
      logger.info("socket disconnected !!!");
  });
  });

const runApp = async () => {
  // connect to Mongodb database
  await connectDB();

  // it will run every 5 mins to fetch the latest crypto detials
  cron.schedule('*/1 * * * *', async () => {
    logger.info('running a task every 5  minute', new Date());
    await cryptoService.updateTopCryptos();
    io.emit('coinsUpdate', new Date());
  });

  // app listen
  server.listen(config.port, () => {
    logger.info(`App listening at port number : ${config.port}`)
  });

  
}
// run the application
runApp();

