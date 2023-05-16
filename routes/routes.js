const express = require("express");
const usuariosController = require("../controllers/usuarios-controller");
const habitacionesController = require("../controllers/habitaciones-controller");
const reservacionesController = require("../controllers/reservaciones-controller");
const router = express.Router();
router.use(express.static("front-end"));

//Inicio
router.get("/", (req, res) => {
  res.redirect("/login.html");
});

//Login
router.post("/register", usuariosController.createUsuario);
router.put("/login", usuariosController.loginUsuario);

//CRUD
router.get("/reservaciones", reservacionesController.findAllReservaciones);
router.post("/reservaciones", reservacionesController.createReservacion);
router.get("/reservaciones/:id", reservacionesController.findReservacion);
router.delete("/reservaciones/:id", reservacionesController.deleteReservacion);
router.put("/reservaciones/:id", reservacionesController.updateReservacion);

//Regla de negocio
router.put("/disponibilidad", reservacionesController.findDisponibilidad);

//Checar pisos y habitaciones
router.get("/pisos", habitacionesController.findPisos);
router.get("/habitaciones/:piso", habitacionesController.findHabitaciones);

module.exports = router;