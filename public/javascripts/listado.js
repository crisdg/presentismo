var inicio = localStorage.getItem("inicio");
var fin = localStorage.getItem("fin");

var fechaInicio = new Date(inicio);
var fechaFin = new Date(fin);

let fechas = [];
let indice = 0;

function llamarInforme() {
  let fechaDesde = document.getElementById("inicio");
  let fechaHasta = document.getElementById("fin");

  fechaInicio = fechaDesde.value;
  fechaFin = fechaHasta.value;

  localStorage.setItem("inicio", JSON.stringify(fechaInicio));
  localStorage.setItem("fin", JSON.stringify(fechaFin));

  console.log(fechaInicio, fechaFin);

  window.location.reload();
}
window.onload = function saludar() {
  let indice = 0;
  let fechaDesde = document.getElementById("inicio");
  let fechaHasta = document.getElementById("fin");

  let fi = new Date(inicio);
  let ff = new Date(fin);

  let ini = fi.getFullYear() + "-" + fi.getMonth() + "-" + fi.getDate();
  let final = ff.getFullYear() + "-" + ff.getMonth() + "-" + ff.getDate();

  fechaDesde.value = ini;
  fechaHasta.value = final;
  fechas = [];

  while (fi.getTime() <= ff.getTime()) {
    fecha = fi.getDate() + "/" + fi.getMonth();

    fechas.push(fecha);

    fi.setDate(fi.getDate() + 1);
  }

  fechas.forEach((fecha) => {
    let fechaImp = document.getElementById("fecha");

    celda = document.createElement("th");

    txt = document.createTextNode(fecha);

    celda.appendChild(txt);

    fechaImp.appendChild(celda);

    fechaImp.appendChild(celda);
  });
};

// Funcion para modal de carga

let radioPresente = document.getElementById("radioPresente");
let radioPicking = document.getElementById("radioPicking");
let radioPeriferia = document.getElementById("radioPeriferia");
let radioExterno = document.getElementById("radioExterno");

function tomarPuesto() {
  if (radioPresente.checked) {
    radioPeriferia.disabled = false;
    radioPicking.disabled = false;
    radioExterno.disabled = false;

    console.log(radioPeriferia.disabled);
  } else {
    radioPeriferia.disabled = true;
    radioPicking.disabled = true;
    radioExterno.disabled = true;
  }
}

radioPresente.addEventListener("change", tomarPuesto);

enviar = document.getElementById("enviar");

enviar.addEventListener("click", guardarDatos);

function guardarDatos(ev) {
  console.log("click");
  ev.preventDefault();
  $.ajax({
    dataType: "json",
    url: "API/empleados",
    success: function (result) {
      let nombre = document.getElementById("empleado");
      nombre.value =
        result.empleados[indice].apellido +
        " " +
        result.empleados[indice].nombre;
    },
  });
  $.ajax({
    url: "/listado",
    type: "post",
    cache: false,
    data: {
      dia: $("input[name=dia]").val(),
      inlineRadioOptions: $("input[name=inlineRadioOptions]:checked").val(),
      nombre: $("input[name=nombre]").val(),
      status: $("input[name=status]:checked").val(),
      puesto: $("input[name=puesto]:checked").val(),
    },
    success: function (data) {
      console.log(data);
    },
    error: function (jqXHR, textStatus, err) {
      alert("text status " + textStatus + ", err " + err);
    },
  });

  indice++;
}
