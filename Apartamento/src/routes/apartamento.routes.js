const express = require("express");
const router = express.Router();
const Controller = require("../controllers/apartamento.Controller");

router.get("/listarapartamento", Controller.listarApartamentos);
router.get("/buscarapartamento/:id", Controller.buscarApartamento);
router.post("/cadastrarapartamento", Controller.cadastrarApartamento);
router.put("/atualizarapartamento/:id", Controller.atualizarApartamento);
router.delete("/excluirapartamento/:id", Controller.excluirApartamento);

module.exports = router;