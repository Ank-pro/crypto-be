const cron = require('node-cron');
const axios = require('axios');
const Crypto = require('../model/cryptoModel');

const fetchPrices = async () => {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    try {
        console.log('Starting to fetch...')
        const { data } = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
        );

        for (const coin of coins) {
            if (data[coin]) {
                await Crypto.create({
                    coin,
                    price: data[coin].usd,
                    marketCap: data[coin].usd_market_cap,
                    change24h: data[coin].usd_24h_change,
                    timestamp: new Date()
                });
            }
        }

        console.log('Crypto data fetched and stored successfully');
    } catch (error) {
        console.error('Error fetching crypto data:', error.message);
    }
};

// Scheduling every 2 hours
cron.schedule('0 */2 * * *', fetchPrices);

module.exports = fetchPrices;
