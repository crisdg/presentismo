var express = require("express");
var router = express.Router();
var controlControllerAPI = require("../../controllers/API/controlEmpleadosControllerApi");

router.get("/", controlControllerAPI.controlList);

module.exports = router;
