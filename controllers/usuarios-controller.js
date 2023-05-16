const Usuario = require("../models/usuario");

function createUsuario(req, res){
    const name=req.body.name,email=req.body.email, pass1=req.body.password, pass2=req.body.confirm_password;
    console.log("\nCreando usuario con campos provistos...");
    if(pass1!=pass2){
        return res.status(400).json({
            error:true,
            message: "Las contraseñas deben coincidir.",
            code: 0,
        });
    }
    Usuario.findOne({email:email})
    .then((data) => {
        if(data){
            console.log("\nYa existe un usuario con ese correo electronico");
            res.send({
                error: true,
                message: "Ya existe un usuario con ese correo electronico.",
                code: 400,
                data: data,
            }); 
        }else{
            console.log(req.body);
            let usuario = new Usuario({
                name: name,
                password: pass1,
                email: email
            });
            usuario
            .save(usuario)
            .then((data) => {
                res.status(200).send({
                    error: false,
                    message: "Usuario creado satisfactoriamente.",
                    code: 20,
                    data: data,
                });
            } )
            .catch((error) =>{
                res.status(500).send({
                    error: true,
                    message: "Error en el servidor.",
                    code: 0,
                });
            });
        }
    })
    
}

function loginUsuario(req,res){
    const email=req.body.email, pass=req.body.password;
    console.log("\nIniciando sesion con campos provistos...");

    Usuario.findOne($and[{email:email},{password:pass}])
    .then((data) => {
        if(data){
            res.status(200).send({
                error: false,
                message: "Inicio de sesion exitoso",
                code: 20,
                data: data,
            });
        }else{
            res.status(400).send({
                error: false,
                message: "Datos erroneos",
                code: 20,
            });
        }
    })
}

module.exports = {
    createUsuario, loginUsuario
};