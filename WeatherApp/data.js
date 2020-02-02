// ESTE ARCHIVO CONTIENE DATOS MOCK

//ES NECESARIO EJECUTARLO UNA SOLA VEZ.


//DATOS USER
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const mongoose = require('mongoose');

const hash= bcrypt.hashSync('1',parseInt(process.env.BCRYPT_ROUNDS));

const usuario=new User({
    fullname: "Luismi López",
    username: "luismi.lopez@salesianos.edu",
    password: hash,
    email: "luismi.lopez@salesianos.edu",
    registered_station: [],
    keep_station: [],
    rol: "ADMIN"
});

const usuario2=new User({
    fullname: "Miguel Campos",
    username: "miguel.campos@salesianos.edu",
    password: hash,
    email: "miguel.campos@salesianos.edu",
    registered_station: [],
    keep_station: [],
    rol: "USER"
});

const usuario3=new User({
    fullname: "Ángel Naranjo",
    username: "angel.naranjo@salesianos.edu",
    password: hash,
    email: "angel.naranjo@salesianos.edu",
    registered_station: [],
    keep_station: [],
    rol: "MANAGER"
});

usuario.save();
usuario2.save();
usuario3.save();

//DATOS STATION
const Station = require('./models/station');

const station1 = new Station({
    latitud: '13.55862',
    longitud: '-3.58262',
    nombre : 'Estación 1',
    registro: usuario._id,
    mantenimiento: usuario3._id
});
usuario.registered_station.push(station1._id);
usuario.update();

const station2 = new Station({
    latitud: '1.52796',
    longitud: '5.46794',
    nombre : 'Estación 2',
    registro: usuario2._id,
    mantenimiento: usuario._id
});
usuario2.registered_station.push(station2._id);
usuario2.update();

const station3 = new Station({
    latitud: '-12.51268',
    longitud: '7.56482',
    nombre : 'Estación 3',
    registro: usuario3._id,
    mantenimiento: usuario2._id
});

station1.save();
station2.save();
station3.save();

//DATOS WEATHER
const Weather = require('./models/weather');

const weather1 = new Weather({
    station: station2,
    lluvia: 58,
    velocidad: 35.27,
    direccion_viento: 143.91,
    temp_ambiente: 27,
    temp_suelo: -2,
    humedad : 4,
    calidad_aire: 38.15,
    presion: 10132.52
});

const weather2 = new Weather({
    station: station1,
    lluvia: 87,
    velocidad: 26,
    direccion_viento: 162.62,
    temp_ambiente: 18,
    temp_suelo: -3,
    humedad : 20.5,
    calidad_aire: 39,
    presion: 303975
});

const weather3 = new Weather({
    station: station3,
    lluvia: 128,
    velocidad: 14.4,
    direccion_viento: 85.39,
    temp_ambiente: 36,
    temp_suelo: 35,
    humedad : 13.4,
    calidad_aire: 32.5,
    presion: 124933.73
});

weather1.save();
weather2.save();
weather3.save();


console.log("No olvide comentar el require('./data'); del app.js")
