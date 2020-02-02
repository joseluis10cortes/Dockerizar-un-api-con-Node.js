'use strict'

const express = require('express')
const router = express.Router()
const middleware = require('../middleware/index');
const WeatherController = require('../controllers/weather')

router.get('/today',middleware.ensureAuthenticated, WeatherController.getWeather);
router.get('/from/:from/to/:to',middleware.ensureAuthenticated, WeatherController.getWeather);

router.get('/:id', WeatherController.getUno);

router.post('/',middleware.ensureAuthenticatedManager, WeatherController.nuevoWeather);


module.exports = router