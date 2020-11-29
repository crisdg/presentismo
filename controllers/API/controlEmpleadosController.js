const Control = require("../../models/ControlEmpleados");

exports.controlCreateGet = function (req, res) {
  res.render("/listado");
};

exports.controlCreatePost = function (req, res) {
  let control = new Control({
    fecha: req.body.dia,
    turno: req.body.inlineRadioOptions,
    empleado: req.body.nombre,
    status: req.body.status,
    puesto: req.body.puesto,
  });
  console.log(control, "desde control");

  Control.add(control, function (error, newElement) {
    res.redirect("/listado");
  });
};
