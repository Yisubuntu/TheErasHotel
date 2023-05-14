const express = require("express");
const usuariosController = require("../controllers/usuarios-controller");
const reservacionesController = require("../controllers/reservaciones-controller");
const router = express.Router();
router.use(express.static("front-end"));

router.get("/", (req, res) => {
    res.redirect("/index.html");
  });
router.get("/reservaciones",reservacionesController.findAllReservaciones);
router.post("/reservaciones",reservacionesController.createReservacion);
router.get("/reservaciones/:id", reservacionesController.findReservacion);
router.delete("/reservaciones/:id", reservacionesController.deleteReservacion);
router.put("/reservaciones/:id", reservacionesController.updateReservacion);

module.exports = router;