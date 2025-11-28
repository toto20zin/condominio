const express = require("express");
const router = express.Router();
const Controller = require("../controllers/area.Controller");

router.get("/listararea", Controller.listarAreas);
router.get("/buscararea/:id", Controller.buscarArea);
router.post("/cadastrararea", Controller.cadastrarArea);
router.put("/atualizararea/:id", Controller.atualizarArea);
router.delete("/excluirarea/:id", Controller.excluirArea);

module.exports = router;