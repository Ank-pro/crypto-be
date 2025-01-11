const express = require('express');
const app = express();
const dbConnect = require('./config/db');
const fetchPrices = require('./backgroundJob/fetchPrices');
const cryptoRoutes = require('./routes/cryptoRoutes')

dbConnect(); //connect DB

fetchPrices(); //fetching crypto

app.use('/api',cryptoRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})