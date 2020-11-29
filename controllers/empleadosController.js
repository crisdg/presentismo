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
    turno: req.body.turno,
  });
  console.log(empleado);

  Empleado.add(empleado, function (error, newElement) {
    res.redirect("/empleados");
  });
};

exports.empleadosUpdateGet = function (req, res) {
  Empleado.findByCode(req.params.id, function (err, empleado) {
    res.render("empleados/update", { empleado });
  });
};

exports.empleadosUpdatePost = function (req, res) {
  console.log(req.body, "desde post");
  Empleado.findByCode(req.params.id, function (err, empleado) {
    empleado.code = req.body.id;
    empleado.apellido = req.body.apellido;
    empleado.nombre = req.body.nombre;
    empleado.dni = req.body.dni;
    empleado.direccion = req.body.direccion;
    empleado.puesto = req.body.puesto;
    empleado.turno = req.body.turno;
    empleado.save();

    res.redirect("/empleados");
  });
};

exports.empleadosDeletePost = function (req, res) {
  Empleado.removeByCode(req.body.id, function (err) {
    console.log(req.body.id, "desde delete");
    res.redirect("/empleados");
  });
};

exports.empleadosListado = function (req, res) {
  Empleado.all(function (error, empleados) {
    res.render("presentismo/index", {
      empleados: empleados,
    });
  });
};
