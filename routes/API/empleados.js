var express = require("express");
var router = express.Router();
var empleadosControllerAPI = require("../../controllers/API/empleadosControllerApi");

router.get("/", empleadosControllerAPI.empleadosList);

module.exports = router;
