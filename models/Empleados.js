const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var empleadoSchema = new Schema({
  code: Number,
  nombre: String,
  apellido: String,
  dni: Number,
  direccion: String,
  puesto: String,
  turno: String,
});

empleadoSchema.methods.toString = function () {
  return "id: " + this.code + " | nombre: " + this.nombre;
};

empleadoSchema.statics.createInstance = function (
  code,
  nombre,
  apellido,
  dni,
  direccion,
  puesto,
  turno
) {
  return new this({
    code: code,
    nombre: nombre,
    apellido: apellido,
    dni: dni,
    direccion: direccion,
    puesto: puesto,
    turno: turno,
  });
};

empleadoSchema.statics.all = function (cb) {
  return this.find({}, cb);
};

empleadoSchema.statics.add = function (empleado, cb) {
  this.create(empleado, cb);
};

empleadoSchema.statics.findByCode = function (aCode, cb) {
  return this.findOne({ code: aCode }, cb);
};

empleadoSchema.statics.removeByCode = function (aCode, cb) {
  return this.deleteOne({ code: aCode }, cb);
};

module.exports = mongoose.model("Empleado", empleadoSchema);
