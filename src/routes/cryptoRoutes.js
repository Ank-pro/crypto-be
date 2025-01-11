const express = require('express');
const axios = require('axios');
const getStats = require('../controller/statsController');
const getDeviation = require('../controller/deviationController');
const route = express.Router();

route.get('/stats',getStats);

route.get('/deviation',getDeviation);


module.exports = route;