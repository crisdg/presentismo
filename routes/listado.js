var express = require("express");
var router = express.Router();
const empleadosController = require("../controllers/empleadosController");
const controlEmpleados = require("../controllers/API/controlEmpleadosController");

/* GET home page. */
router.get("/", empleadosController.empleadosListado);
router.get("/", controlEmpleados.controlCreateGet);
router.post("/", controlEmpleados.controlCreatePost);
/*router.get("/", function (req, res, next) {
  res.render("presentismo/index", { title: "Presentismo" });
});*/

module.exports = router;
