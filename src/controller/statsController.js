const axios = require('axios');
const Crypto = require('../model/cryptoModel')

const getStats = async (req,res)=>{
    const {coin} = req.query;
    if(!coin){
        return res.status(400).json({message : 'Coin param is required'})
    }

    try {
        const latData = await Crypto.findOne({coin}).sort({timestamp : -1});
        if(!latData){
            return res.status(404).json({msg : 'Error finding coin data'})
        }

        const {price,marketCap,change24h} = latData;
        return res.status(200).json({price,marketCap,change24h});
    } catch (error) {
        console.log('Err :', error);
        return res.status(500).json({msg : 'Internal server error'})
    }
}

module.exports = getStats;