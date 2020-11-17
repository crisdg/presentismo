var express = require("express");
var router = express.Router();
const empleadosController = require("../controllers/empleadosController");

router.get("/", empleadosController.empleadosList);
router.get("/create", empleadosController.empleadosCreateGet);
router.post("/create", empleadosController.empleadosCreatePost);
router.get("/:id/update", empleadosController.empleadosUpdateGet);
router.post("/:id/update", empleadosController.empleadosUpdatePost);
router.post("/:id/delete", empleadosController.empleadosDeletePost);

module.exports = router;
