var express = require("express");
var router = express.Router();
const empleadosController = require("../controllers/empleadosController");

router.get("/", empleadosController.empleadosList);
router.get("/create", empleadosController.empleadosCreateGet);
router.post("/create", empleadosController.empleadosCreatePost);
//router.get("/:id/update", usersController.update_get);
//router.post("/:id/update", usersController.update);
//router.post("/:id/delete", usersController.delete);

module.exports = router;
