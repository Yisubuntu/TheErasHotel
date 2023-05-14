const express = require("express");
const usuariosController = require("../controllers/usuarios-controller");
const reservacionesController = require("../controllers/reservaciones-controller");
const router = express.Router();
router.use(express.static("front-end"));

//Inicio
router.get("/", (req, res) => {
  res.redirect("/index.html");
});

//CRUD
router.get("/reservaciones", reservacionesController.findAllReservaciones);
router.post("/reservaciones", reservacionesController.createReservacion);
router.get("/reservaciones/:id", reservacionesController.findReservacion);
router.delete("/reservaciones/:id", reservacionesController.deleteReservacion);
router.put("/reservaciones/:id", reservacionesController.updateReservacion);

//Regla de negocio
<<<<<<< HEAD
router.get("/disponibilidad",reservacionesController.findDisponibilidad);
=======
router.get("/disponibilidad", reservacionesController.findDisponibilidad);
>>>>>>> 05266322ebc2ff523a070867236b6fc4966c7320

module.exports = router;