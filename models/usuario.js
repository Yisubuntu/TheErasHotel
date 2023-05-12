const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Usuario",usuarioSchema);