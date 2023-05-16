const Habitacion = require("../models/habitacion");

function findPisos(req, res) {
    console.log("\nEncontrando pisos del hotel");

    Habitacion.aggregate([
        { $group: { _id: "$piso" } }
    ]).then((data) => {
        if (data) {
            const pisos = data.map((item) => item._id);
            res.status(200).send({
                error: false,
                message: "Pisos encontrados",
                code: 20,
                data: pisos,
            });
        } else {
            res.status(400).send({
                error: false,
                message: "Error en el servidor",
                code: 20,
            });
        }
    });
}

function findHabitaciones(req,res){
    const piso = req.params.piso;
    console.log("\nEncontrando habitaciones del piso",piso);

    Habitacion.find({piso:piso})
    .then((data) => {
        if(data){
            res.status(200).send({
                error: false,
                message: "Habitaciones encontradas",
                code: 20,
                data: data,
            });
        }else{
            res.status(400).send({
                error: false,
                message: "Error en el servidor",
                code: 20,
            });
        }
    })
}

module.exports = {
    findPisos, findHabitaciones
};