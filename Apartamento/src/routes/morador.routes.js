const express = require("express");
const router = express.Router();
const Controller = require("../controllers/morador.Controller");

router.get("/listarmorador", Controller.listarMoradores);
router.get("/buscarmorador/:id", Controller.buscarMorador);
router.post("/cadastrarmorador", Controller.cadastrarMorador);
router.put("/atualizarmorador/:id", Controller.atualizarMorador);
router.delete("/excluirmorador/:id", Controller.excluirMorador);

module.exports = router;