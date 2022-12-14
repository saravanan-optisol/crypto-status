const axios = require('axios');
const config = require('../config/env').getConfig();
const coinsSchema = require('../model/coins');

module.exports = {
  updateTopCryptos: async () => {
    let response = null;

    const params = {
      cryptocurrency_type: 'coins',
      limit: 100,
    };
    const headers = {
      'X-CMC_PRO_API_KEY': config.coin_market_cap.api_key,
    };

    response = await axios.get(
      config.coin_market_cap.api_url,
      { headers, params }
    );
    if (response) {
      const { data } = response.data;
      let updateData = [];

      data.forEach((element) => {
        const {
          price,
          percent_change_24h,
          percent_change_7d,
          market_cap,
          volume_24h,
        } = element.quote.USD;

        const { name, circulating_supply } = element;

        updateData.push({
          name,
          price,
          percent_change_24h,
          percent_change_7d,
          market_cap,
          volume_24h,
          circulating_supply,
        });
      });

      const coins = new coinsSchema({ record: updateData });
      await coins.save();
    }
  },
  
  getTopCryptos: async () => {
    return coinsSchema.findOne({}).sort({ _id: -1 }).limit(1);
  },
};
