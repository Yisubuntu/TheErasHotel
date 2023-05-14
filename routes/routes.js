const express = require("express");
const usuariosController = require("../controllers/usuarios-controller");
const reservacionesController = require("../controllers/reservaciones-controller");
const router = express.Router();
router.use(express.static("front-end"));

router.get("/", (req, res) => {
    res.sendFile(__dirname + "/../front-end/templates/index.html");
  });

router.get("/reservaciones", (req, res) => {
    res.sendFile(__dirname + "/../front-end/templates/reservaciones.html");
  });
router.post("/reservaciones",reservacionesController.createReservacion);
router.get("/reservaciones/:id", reservacionesController.findReservacion);
router.delete("/reservaciones/:id", reservacionesController.deleteReservacion);
router.put("/reservaciones/:id", reservacionesController.updateReservacion);

module.exports = router;