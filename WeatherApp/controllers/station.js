//Controladores de station
const Station = require("../models/station");
const Weather = require("../models/weather");
const error_types = require("../controllers/error_types");

let controller = {
  getStationById: (req, res, next) => {
    Station.findById(req.params.id)
    .populate({ 
      path: "registro mantenimiento", 
      model: "User", 
      select: "fullname email" 
    }).exec((err, resp) => { 
      if (err) return next(new error_types.Error404(err.message));
      res.status(200).json(resp); 
    }); 
  },
  getWeatherByStationId: (req, res, next) => {
     //Método realizado por Esperanza Escacena. He parametrizado la consulta para reutilizar el método para dos rutas
    //que son /stations/id/weather y /stations/id/weather/from/to, ya que necesitaba el mismo código con diferente consulta.

    let busqueda;
    if(req.params.from==undefined && req.params.to==undefined){
      busqueda={"station": req.params.id};

    }else{
      let from= new Date();
      let fecha=req.params.from.split('-');
      from= from.setFullYear(fecha[2],fecha[1]-1,fecha[0]);
      from=new Date(from);
      from.setUTCHours(0, 0, 0, 0);

      let to = new Date();
      fecha=req.params.to.split('-');
      to = to.setFullYear(fecha[2],fecha[1]-1,fecha[0]);
      to= new Date(to);
      to.setDate(to.getDate() + 1);
      to.setUTCHours(0, 0, 0, 0);
     
      busqueda={"station": req.params.id ,fecha: { $gte: from, $lte: to }};
    }

   
    Weather.find(busqueda)
      .populate({
        path: "station",
        model: "Station",
        populate: {
          path: "registro mantenimiento",
          model: "User",
          select: "fullname email"
        }
      })
      .exec((err, resp) => {
        if (err) return next(new error_types.Error404(err.message));
        let stationDto = {};
        if (resp.length != 0) {
          stationDto.ubicacion =
            resp[0].station.latitud + " , " + resp[0].station.latitud;
          stationDto.nombre = resp[0].station.nombre;
          stationDto.registro = {
            fullname: resp[0].station.registro.fullname,
            email: resp[0].station.registro.email
          };
          stationDto.mantenimiento = {
            fullname: resp[0].station.mantenimiento.fullname,
            email: resp[0].station.mantenimiento.email
          };
        }
        let weatherList = [];
        resp.forEach(x => {
          weatherList.push({
            lluvia: x.lluvia,
            velocidad: x.velocidad,
            direccion_viento: x.direccion_viento,
            temp_ambiente: x.temp_ambiente,
            temp_suelo: x.temp_suelo,
            humedad : x.humedad,
            calidad_aire: x.calidad_aire,
            presion: x.presion,
            fecha: x.fecha
          });
        });
        res.status(200).json({
          station: stationDto,
          weather: weatherList
        });
      });
  },
    putStation: (req, res,next) => {
      
      Station.findByIdAndUpdate((req.params.id),req.body,{new:true})
      .populate({
            path: "registro mantenimiento",
            model: "User",
            select: "fullname email"
          
        }).exec((err,resp) => {
          if (err) return next(new error_types.Error404(err.message));
          res.status(200).json(resp);
          
        
      });
     
  },

    getSummaryToday : (req, res,next) => {
      let hoy = new Date(Date.now());
      let hoy_num = new Date(hoy);
      hoy_num.setUTCHours(0, 0, 0, 0);
      let manana = new Date(hoy);
      manana.setDate(hoy.getDate() + 1);
      manana.setUTCHours(0, 0, 0, 0);

      let busqueda = {station: req.params.id ,fecha: {  $gte: hoy_num, $lt: manana  }};
  
      Weather.find(busqueda).populate({
        path: "station",
        model: "Station",
        populate: {
          path: "registro mantenimiento",
          model: "User",
          select: "fullname email"
        }
      })
      .exec((err,resp)=>{
        if (err) return next(new error_types.Error404(err.message));
        let stationDto = {};
        if (resp.length != 0) {
          stationDto.ubicacion =
            resp[0].station.latitud + " , " + resp[0].station.latitud;
          stationDto.nombre = resp[0].station.nombre;
          stationDto.registro = {
            fullname: resp[0].station.registro.fullname,
            email: resp[0].station.registro.email
          };
          stationDto.mantenimiento = {
            fullname: resp[0].station.mantenimiento.fullname,
            email: resp[0].station.mantenimiento.email
          };
        }
        //Utilizamos la clase Math con método max para calcular el valor máximo. Como se trata
        //de un campo de un objeto del array, tenemos que utilizar la función map del array de respuestas
        //para que podamos recorrer y comparar los valores de la temperatura ambiente.
        let listaDatos = {
          tem_max_amb : Math.max.apply(Math,resp.map(function(x){return x.temp_ambiente})),
          tem_min_amb : Math.min.apply(Math,resp.map(function(x){return x.temp_ambiente})),
        //Como se trata de un campo de un objeto del array, tenemos que utilizar la función map del array de respuestas
        //para que podamos recorrer , sumamos los valores y lo dividimos entre la longuitud del array, redondeamos a dos decimales
          tem_med_amb : (resp.map(function(x){return x.temp_ambiente}).reduce(( suma , temp_ambiente ) => suma + temp_ambiente, 0 )/resp.length).toFixed(2),
          tem_max_suelo : Math.max.apply(Math,resp.map(function(x){return x.temp_suelo})),
          tem_min_suelo : Math.min.apply(Math,resp.map(function(x){return x.temp_suelo})),
          tem_med_suelo : (resp.map(function(x){return x.temp_suelo}).reduce(( suma , temp_suelo ) => suma + temp_suelo, 0 )/resp.length).toFixed(2),
          precipitaciones : resp.map(function(x){return x.lluvia}).reduce(( suma , lluvia ) => suma + lluvia, 0 ),
          humedad : (resp.map(function(x){return x.humedad}).reduce(( suma , humedad ) => suma + humedad, 0 )/resp.length).toFixed(2),
          calidad_aire : (resp.map(function(x){return x.calidad_aire}).reduce(( suma , calidad_aire ) => suma + calidad_aire, 0 )/resp.length).toFixed(2)
        
        };
  
        res.status(200).json({
          station: stationDto,
          datos_meteorologicos :  listaDatos
        });
      })
    },

  newStation: (req, res) => {
    let station = new Station ({
        latitud: req.body.latitud,
        longitud: req.body.longitud,
        nombre: req.body.nombre,
        registro: req.body.registro,
        mantenimiento: req.body.mantenimiento
    });
    station.save()
            .then(s => s.populate({
              path: "registro mantenimiento",
              model: "User",
              select: "fullname email"
            
          }).execPopulate())
            .then(s => res.status(201).json(s))
            .catch(err => res.send(500).json(err.message));
  },

  deleteStation: (req, res, next) =>{
    Station.findOneAndDelete({_id: req.params.id},(err, resp) =>{
      if (resp==null) return next(new error_types.Error404("No se encuentra la estación"));
     return  res.status(204)
    });
  },

  getStations: (req, res, next) =>{
    Station.find()
    .populate({
        path: "registro mantenimiento",
        model: "User",
        select: "fullname email"
    })
    .exec((err, station) => {
      if (err) return next(new error_types.Error404(err.message));
      res.status(200).json(station);
    });
  }
};

module.exports = controller;
