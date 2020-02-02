"use strict";

const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station"
  },
  lluvia: { type: Number },
  velocidad: { type: Number },
  direccion_viento: { type: Number },
  temp_ambiente: { type: Number },
  temp_suelo: { type: Number },
  humedad :  { type: Number },
  calidad_aire: { type: Number },
  presion: { type: Number },
  fecha: { type: Date, default: Date.now()  }
});

module.exports = mongoose.model("Weather", weatherSchema);
