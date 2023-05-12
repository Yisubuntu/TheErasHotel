const mongoose = require("mongoose");

const reservacionSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    piso:{
        type: String,
        required: true
    },
    habitacion:{
        type: Number,
        required: true
    },
    fecha:{
        type: Date,
        required: true
    },
});

module.exports = mongoose.model("Reservacion",reservacionSchema);