# Crypto Currency Dashboard

Run with the docker compose

    docker-compose up -d --build

## API Url: 

The api can accessible on port 8000.

    http://localhost:8000/api/

## Application Url: 

The frontend can accessible on port 3000.

    http://localhost:3000/

## Coinmarketcap url:
    https://coinmarketcap.com/

## API to get Crypto Currency status

Using the following API to fetch the data and store it on the database.

    https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest
    
## TechStack used

### Server

- [Node v14.17.1](http://nodejs.org/)
- [Express](https://npmjs.com/package/express)
- [HTTP Status](https://www.npmjs.com/package/http-status)
- [Log4js](https://www.npmjs.com/package/log4js) + [Winston](https://www.npmjs.com/package/winston)

### Client
- [Node 12.22.12](http://nodejs.org/)
- [React](https://npmjs.com/package/react)
- [React Redux](https://www.npmjs.com/package/react-redux)