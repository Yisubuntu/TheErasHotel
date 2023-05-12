const Usuario = require("../models/usuario");

//CRUD


function findAllUsuarios(req, res){
    Usuario.find().then((usuarios) => {
        console.log(usuarios);
        return res.status(200).json({
            error:false,
            message: "Success",
            code:10,
            data:usuarios,
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

function createUsuario(req, res){
    console.log("\nCreando usuario...");
    console.log(req.body);
    let usuario = new Usuario({
        id: req.body.id,
        nombre: req.body.nombre,
        password: req.body.password,
        email: req.body.email
    });

    usuario
        .save(usuario)
        .then((data) => {
            res.status(200).send({
                error: false,
                message: "OK",
                code: 20,
                data: data,
            });
        } )
        .catch((error) =>{
            res.status(500).send({
                error: true,
                message: "Server down",
                code: 0,
            });
        });
}

function findUsuario(req,res){
    const id = req.params.id;

    console.log("\nBuscando usuario con id "+id+"...");
    Usuario.findById(id)
        .then((data) => {
            if(!data)
            res
                .status(404)
                .send({
                    message: "No encontrado usuario con id "+id,
                });
            else res.send(data);
        })
        .catch((error) => {
            res.status(500).send({message: "Error en el usuario con id ",id});
        });
}

function deleteUsuario(req,res){
    const id = req.params.id;

    console.log("\nBorrando usuario con id "+id+"...");
    Usuario.findByIdAndRemove(id)
        .then((data) => {
            if(!data)
            res
                .status(404)
                .send({
                    message: "No encontrado usuario con id "+id,
                });
            else{
                console.log("\nUsuario con id "+id+" borrado exitosamente.");
                res.send(data);
            }
        })
        .catch((error) => {
            res.status(500).send({message: "Error en el usuario con id ",id});
        });
}

function updateUsuario(req,res){
    const id = req.params.id;

    console.log("\nCambiando contrasena al usuario con id "+id+"...");
    Usuario.findByIdAndUpdate(id,req.body)
        .then((data) => {
            if(!data)
            res
                .status(404)
                .send({
                    message: "No encontrado usuario con id "+id,
                });
            else{
                console.log("\nUsuario con id "+id+" ha cambiado su contrasena exitosamente. ");
                res.send(data);
            }
        })
        .catch((error) => {
            res.status(500).send({message: "Error en el usuario con id ",id});
        });
}

module.exports = {
    findAllUsuarios, createUsuario, findUsuario, deleteUsuario, updateUsuario
};