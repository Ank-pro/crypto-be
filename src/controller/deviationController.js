const math = require('mathjs');
const CryptoModel = require('../models/Crypto');

const calculateDeviation = async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ message: 'Coin parameter is required' });
    }

    try {
        const records = await CryptoModel.find({ coin }).sort({ timestamp: -1 }).limit(100);

        if (records.length < 100) {
            return res.status(400).json({ message: 'Not enough records (atleast 100 required)' });
        }

        const prices = records.map(record => record.price);

        const stdDeviation = math.std(prices);

        res.status(200).json({ deviation: stdDeviation });
    } catch (error) {
        console.error('Error calculating standard deviation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = calculateDeviation;
