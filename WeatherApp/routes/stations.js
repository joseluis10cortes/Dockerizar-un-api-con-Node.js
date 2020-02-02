"use strict";

const express = require("express");
const router = express.Router();
const middleware = require("../middleware/index");
const controller = require("../controllers/station");

router.get('/:id',
middleware.ensureAuthenticatedManager,
controller.getStationById);

router.get(
  "/:id/weather",
  middleware.ensureAuthenticated,
  controller.getWeatherByStationId
);
router.get(
  "/:id/weather/from/:from/to/:to",
  middleware.ensureAuthenticated,
  controller.getWeatherByStationId
);
router.put(
  "/:id",
  middleware.ensureAuthenticatedManager,
  controller.putStation
);

router.get(
  "/:id/summary/today",
  middleware.ensureAuthenticated,
  controller.getSummaryToday
);


router.get("/",
  middleware.ensureAuthenticatedManager,
  controller.getStations);

router.post("/",
  middleware.ensureAuthenticatedManager,
  controller.newStation);

router.delete('/:id',
  middleware.ensureAuthenticatedManager,
  controller.deleteStation);

module.exports = router;
