const express = require("express");
const router = express.Router();
const Controller = require("../controllers/reserva.Controller");

router.get("/listarreserva", Controller.listarReservas);
router.get("/buscarreserva/:id", Controller.buscarReserva);
router.post("/cadastrarreserva", Controller.cadastrarReserva);
router.put("/atualizarreserva/:id", Controller.atualizarReserva);
router.delete("/excliurreserva/:id", Controller.excluirReserva);

module.exports = router;