const math = require('mathjs');
const CryptoModel = require('../model/cryptoModel');

const calculateDeviation = async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ message: 'Coin parameter is required' });
    }

    try {
        const records = await CryptoModel.find({ coin })
            .sort({ timestamp: -1 })
            .limit(100);

        if (records.length < 100) {
            return res.status(404).json({ message: 'Not enough records found for standard deviation' });
        }

        const prices = records.map(record => record.price);

        const stdDeviation = math.std(prices);

        return res.status(200).json({ deviation: stdDeviation });
    } catch (error) {
        console.error('Error calculating standard deviation:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = calculateDeviation;
