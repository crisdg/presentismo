const Empleado = require("../../models/Empleados");

exports.empleadosList = function (req, res) {
  Empleado.all(function (error, empleados) {
    res.status(200).json({ empleados: empleados });
  });
};

exports.empleadosCreateGet = function (req, res) {
  res.render("empleados/create");
};

exports.empleadosCreatePost = function (req, res) {
  let empleado = new Empleado({
    code: req.body.id,
    apellido: req.body.color,
    nombre: req.body.modelo,
    dni: req.body.dni,
    puesto: req.body.puesto,
    turno: req.body.turno,
  });
  console.log(turno);
  console.log(empleado);

  Empleado.add(empleado, function (error, newElement) {
    res.redirect("/empleados");
  });
};
