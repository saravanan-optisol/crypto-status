require('dotenv').config();

/**
 *This function is used to get the value for env variables
 * @param key - This function is used to throw Error
 * @returns - value for the given key
 */
function envOrThrow(key) {
  const val = process.env[key];
  if (!val) {
    throw new Error(`Required environment variable ${key} not set`);
  }

  return val;
}

// TODO: Get rid of the static and getConfigOrNull. This helps for getting rid of module side effects for now
// eslint-disable-next-line import/no-mutable-exports
let config = null;
/**
 * @returns This function is used to get ENVConfig if available
 */
function getConfigOrNull() {
  return config;
}
/**
 *
 * @returns This function is used to set env variables based on node environment (production or staging or development)
 */
function getConfig() {
  if (config) {
    return config;
  }

  config = {
    db: {
      url: envOrThrow('APP_DB_URL'),
    },
    coin_market_cap: {
      api_key: envOrThrow('COIN_MARKETCAP_API_KEY'),
      api_url: envOrThrow('COIN_MARKETCAP_API_URL'),
    },
    env: envOrThrow('NODE_ENV'),
    port: envOrThrow('APP_PORT'),
    socket_url: envOrThrow('SOCKET_URL'),
  };

  return config;
}

module.exports = {
  getConfig,
  getConfigOrNull,
};
