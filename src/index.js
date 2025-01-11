const express = require('express');
const app = express();
const dbConnect = require('./config/db');
const axios = require('axios');
const fetchPrices = require('./backgroundJob/fetchPrices');

dbConnect(); //connect DB




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})