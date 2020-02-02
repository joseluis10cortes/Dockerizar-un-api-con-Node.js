//Crear modelo usuario
'use strict'

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {type: String},
    creationDate: {type: Date,default:Date.now()},
    username: {type: String},
    password: {type: String},
    email: {type: String},
    registered_station: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station'}],
    keep_station: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station'}],
    rol: {type: String, enum: ["USER", "MANAGER", "ADMIN"], default: "USER"}
});


module.exports = mongoose.model('User', userSchema);