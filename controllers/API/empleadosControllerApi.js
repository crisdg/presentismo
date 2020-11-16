const Empleado = require("../../models/Empleados");

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
    code: req.body.id,
    apellido: req.body.color,
    nombre: req.body.modelo,
    dni: req.body.dni,
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
};

exports.bicicletaUpdatePost = function (req, res) {
  bicicleta.findByCode(req.params.id, function (err, bici) {
    bici.code = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];
    bici.save();

    res.redirect("/bicicletas");
  });
};

exports.bicicletaDeletePost = function (req, res) {
  bicicleta.removeByCode(req.body.id, function (err) {
    console.log(req.body.id, "desde delete");
    res.redirect("/bicicletas");
  });
};
*/
