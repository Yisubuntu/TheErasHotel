const Reservacion = require("../models/reservacion");

//CRUD

function findAllReservaciones(req, res){
    Reservacion.find().then((reservaciones) => {
        console.log(reservaciones);
        return res.status(200).json({
            error:false,
            message: "OK",
            code:10,
            data:reservaciones,
        });
    }).catch((error) => {
        console.log(error);
        return res.status(500).json({
            error:true,
            message: "Error",
            code: 0,
        });
    }
    );
}

function createReservacion(req, res){
    console.log("\nCreando reservacion...");
    console.log(req.body);
    let reservacion = new Reservacion({
        id: req.body.id,
        piso: req.body.piso,
        habitacion: req.body.habitacion,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin
    });

    reservacion
        .save(reservacion)
        .then((data) => {
            res.status(200).send({
                error: false,
                message: "Reserva creada",
                code: 20,
                data: data,
            });
        } )
        .catch((error) =>{
            res.status(500).send({
                error: true,
                message: "Error en el servidor",
                code: 0,
            });
        });
}

function findReservacion(req,res){
    const id = req.params.id;

    console.log("\nBuscando reservacion con id "+id+"...");
    Reservacion.findOne({id:id})
        .then((data) => {
            if(!data)
            res
                .status(404)
                .send({
                    message: "No encontrada reservacion con id "+id,
                });
            else res.send(data);
        })
        .catch((error) => {
            res.status(500).send({message: "Error en la reservacion"});
        });
}

function deleteReservacion(req,res){
    const id = req.params.id;

    console.log("\nCancelando reservacion con id "+id+"...");
    Reservacion.findOneAndRemove({id:id})
        .then((data) => {
            if(!data)
            res
                .status(404)
                .send({
                    message: "No encontrada reservacion con id "+id,
                });
            else{
                console.log("\nReservacion con id "+id+" cancelada exitosamente.");
                res.send(data);
            }
        })
        .catch((error) => {
            res.status(500).send({message: "Error en la reservacion con id ",id});
        });
}

function updateReservacion(req,res){
    const id = req.params.id;

    console.log("\nCambiando fecha a la reservacion con id "+id+"...");
    Reservacion.findOneAndUpdate({id:id},{fecha_inicio:req.body.fecha_inicio, fecha_fin:req.body.fecha_fin},{new:true})
        .then((data) => {
            if(!data)
            res
                .status(404)
                .send({
                    message: "No encontrada reservacion con id "+id,
                });
            else{
                console.log("\nReservacion con id "+id+" ha cambiado su fecha exitosamente. ");
                res.send(data);
            }
        })
        .catch((error) => {
            res.status(500).send({message: "Error en el servidor"});
        });
}
function findDisponibilidad(req,res){
    const hab=req.body.habitacion, f_inicio=req.body.fecha_inicio, f_fin=req.body.fecha_fin;

    console.log("\nChecando disponibilidad para habitacion "+hab+"...");
    Reservacion.findOne({habitacion:hab,$and:[{fecha_fin:{$gt:f_inicio}},{fecha_inicio:{$lt:f_fin}}]})
    .then((data) => {
        if(!data){
            console.log("\nLa habitacion "+hab+" esta disponible para reservar en el intervalo dado");
            res.status(200)
            .send({
                error: false,
                message: "Habitacion disponible durante el intervalo dado",
                code: 20,
            });
        }else{
            console.log("\nLa habitacion "+hab+" no esta disponible para reservar durante el intervalo dado");
            res.send({
                error: false,
                message: "Habitacion ocupada durante el intervalo dado",
                code: 20,
                data: data,
            });
        }
    })
    .catch((error) => {
        res.status(500).send({message: "Error en el servidor"});
    });
}

module.exports = {
    findAllReservaciones, createReservacion, findReservacion, deleteReservacion, updateReservacion, findDisponibilidad
};