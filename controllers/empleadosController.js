var Empleado = require("../models/Empleados");

exports.empleadosList = function (req, res) {
  Empleado.all(function (error, empleados) {
    res.render("empleados/index", { empleados: empleados });
  });
};

exports.empleadosCreateGet = function (req, res) {
  res.render("empleados/create");
};

exports.empleadosCreatePost = function (req, res) {
  let empleado = new Empleado({
    code: req.body.code,
    apellido: req.body.apellido,
    nombre: req.body.nombre,
    dni: req.body.dni,
    direccion: req.body.direccion,
    puesto: req.body.puesto,
  });
  console.log(empleado);

  Empleado.add(empleado, function (error, newElement) {
    res.redirect("/empleados");
  });
};

/*exports.bicicletaUpdateGet = function (req, res) {
  bicicleta.findByCode(req.params.id, function (err, bici) {
    console.log(bici);
    res.render("bicicletas/update", { bici });
  });
}; */
