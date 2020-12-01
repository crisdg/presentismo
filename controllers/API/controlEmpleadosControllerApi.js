const Control = require("../../models/ControlEmpleados");

exports.controlList = function (req, res) {
  Control.all(function (error, control) {
    res.status(200).json({ control: control });
  });
};
