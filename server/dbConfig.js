const mongoose = require('mongoose');
const logger = require('./src/config/logger/Logger');
const config = require('./src/config/env').getConfig();

const { url } = config.db;

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Database connected');
  } catch (err) {
    logger.info('Database connect Error' + err.message);
    //process exit when failure
    process.exit(1);
  }
};

module.exports = connectDB;
