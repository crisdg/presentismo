var inicio = localStorage.getItem("inicio");
var fin = localStorage.getItem("fin");

var fechaInicio = new Date(inicio);
var fechaFin = new Date(fin);

let fechas = [];
let indice = 0;

function traerControl() {
  let cont = document.getElementById("cont");
  cont.innerHTML = "";
  let table = document.createElement("table");
  table.className =
    "table table-hover table-sm table-responsive table-bordered";
  let encabezado = document.createElement("thead");
  let tbody = document.createElement("tbody");
  let titulo = document.createElement("tr");
  let tituloCont = document.createElement("th");
  tituloCont.innerHTML = "Nombre";

  titulo.appendChild(tituloCont);
  encabezado.appendChild(titulo);
  table.appendChild(encabezado);
  table.appendChild(tbody);
  cont.appendChild(table);

  let arrayCompleto = [];
  let arrayFiltrado = [];

  $.ajax({
    dataType: "json",
    url: "API/control",
    success: function (result) {
      let controlArray = Array.from(result.control);
      console.log(result);

      // filtro y creo arrays de nombres y fechas unicos para encabezados de tabla
      let fechasArr = [];
      let nombresArr = [];

      controlArray.forEach((element) => {
        let fechaUnica = element.fecha;
        let nombreUnico = element.empleado;
        let status = element.status;
        let statusUnico = status;
        let objStatus = new Object();
        objStatus.nombre = nombreUnico;
        objStatus.fecha = fechaUnica;
        objStatus.status = statusUnico;

        fechasArr.push(fechaUnica);
        nombresArr.push(nombreUnico);
      });
      const data = new Set(fechasArr);
      const nomDAta = new Set(nombresArr);

      let fechasArray = [...data];
      let nombreArray = [...nomDAta];
      nombreArray.sort();
      fechasArray.sort();

      // filtro datos por fecha y genero los encabezados
      fechasArray.forEach((fecha) => {
        let row = document.createElement("th");
        let date = new Date(fecha);
        date.setDate(date.getDate() + 1);

        let shortDate = date.getDate() + "/" + (date.getMonth() + 1);

        row.innerHTML = shortDate;
        titulo.appendChild(row);

        let filtrado = controlArray.filter((dia) => dia.fecha == fecha);

        arrayFiltrado.push(filtrado);
      });
      // tomo array filtrado por nombre y fecha, completo los datos faltantes con vacio
      arrayFiltrado.forEach((element) => {
        nombreArray.forEach((nom) => {
          const resultado = element.find((item) => item.empleado == nom);

          cont = new Object();

          if (resultado) {
            cont.fecha = resultado.fecha;
            cont.nombre = resultado.empleado;
            cont.status = resultado.status;

            arrayCompleto.push(cont);
          } else {
            cont.fecha = element[0].fecha;
            cont.nombre = nom;
            cont.status = " -- ";

            arrayCompleto.push(cont);
          }
        });
      });

      //completo la tabla con los datos del array completo filtrando por nombre
      nombreArray.forEach((nombre) => {
        let col = document.createElement("tr");
        let row = document.createElement("td");
        let celdaNombre = document.createElement("th");
        let nomb = nombre;
        celdaNombre.innerHTML = nomb;
        col.appendChild(celdaNombre);
        tbody.appendChild(col);

        let filtrado = arrayCompleto.filter((nom) => nom.nombre == nombre);

        filtrado.forEach((element) => {
          let cel = document.createElement("td");
          cel.innerHTML = element.status;

          claseEnt = element.status;

          claseSin = claseEnt.replace(/ /g, "");
          clase = claseSin.replace(/\//g, "");

          cel.classList = clase;

          col.appendChild(cel);
        });
      });
    },
  });
  console.log(table);
}

// Funcion para modal de carga

let radioPresente = document.getElementById("radioPresente");
let radioPicking = document.getElementById("radioPicking");
let radioPeriferia = document.getElementById("radioPeriferia");
let radioExterno = document.getElementById("radioExterno");
let nombres = 2;
enviar = document.getElementById("enviar");

enviar.addEventListener("click", guardarDatos);

function guardarDatos(ev) {
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

      nombres = result.empleados.length;
    },
  });

  //guardar los datos del modal en DB
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
      console.log("GUARDADO!");
    },
    error: function (jqXHR, textStatus, err) {
      alert("text status " + textStatus + ", err " + err);
    },
  });
  console.log(indice, nombres);
  if (indice >= nombres - 1) {
    location.reload();
  }
  indice++;
}
