const mongoose = require("mongoose");

const habitacionSchema = new mongoose.Schema({
    numero:{
        type: Number,
        required: true
    },
    piso:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Habitacion",habitacionSchema);