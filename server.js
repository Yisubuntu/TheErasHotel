require("dotenv").config({path:""})
const cors = require("cors")
const express = require("express");
const mongoose = require("mongoose");


//Crear server

const app = express();

const port = process.env.PORT || 4000;

//Conexión a la BD
console.log(process.env.DATABASE_URL_CLOUD);
mongoose.connect(process.env.DATABASE_URL_CLOUD, {useNewUrlParser: true});
const db = mongoose.connection;

//Setear manejo de eventos
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Conectando a la base de datos"));

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
//port = process.env.PORT || 3001;
//Iniciar el servidor
app.use("/", require("./routes/routes"));
app.listen(port, () => console.log("El servidor esta escuchando..."));