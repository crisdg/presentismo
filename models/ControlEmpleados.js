const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var controlSchema = new Schema(
  {
    fecha: Date,
    turno: String,
    empleado: String,
    status: String,
    puesto: String,
  },
  {
    collection: "control",
  }
);

controlSchema.statics.createInstance = function (
  fecha,
  turno,
  empleado,
  status,
  puesto
) {
  return new this({
    fecha: fecha,
    turno: turno,
    empleado: empleado,
    status: status,
    puesto: puesto,
  });
};

controlSchema.statics.all = function (cb) {
  return this.find({}, cb);
};

controlSchema.statics.add = function (control, cb) {
  this.create(control, cb);
};

module.exports = mongoose.model("ControlEmpleados", controlSchema);
