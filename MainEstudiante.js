var dataUserLogin = JSON.parse(localStorage.getItem("DataUserLocal"));
$(".carreraName").empty().text(dataUserLogin.Carrera);
var DataMaterias = [];

// Validda inputs
const ValidaData = () => {
  let contador = 6;
  let dataStudent = [];
  $(".validad-estudiante").removeClass("is-invalid");

  //Valida nombre
  if ($("#name-user-1").val() === "") {
    $("#name-user-1").addClass("is-invalid");
    contador--;
  } else {
    dataStudent.push($("#name-user-1").val());
  }

  //last-name-user paterno
  if ($("#last-name-user").val() === "") {
    $("#last-name-user").addClass("is-invalid");
    contador--;
  } else {
    dataStudent.push($("#last-name-user").val());
  }

  //last-name-user materno
  if ($("#last-name-user-1").val() === "") {
    $("#last-name-user-1").addClass("is-invalid");
    contador--;
  } else {
    dataStudent.push($("#last-name-user-1").val());
  }

  //   Numero de control
  if ($("#id-user").val() === "") {
    $("#id-user").addClass("is-invalid");
    contador--;
  } else {
    dataStudent.push($("#id-user").val());
  }

  //   Periodo
  if ($("#select-p").val() === "Periodo") {
    $("#select-p").addClass("is-invalid");
    contador--;
  } else {
    dataStudent.push($("#select-p").val());
  }

  //   Year
  if ($("#select-year").val() === "Año") {
    $("#select-year").addClass("is-invalid");
    contador--;
  } else {
    dataStudent.push($("#select-year").val());
  }

  //
  if (contador === 6) {
    getMaterias(dataStudent);

    setTimeout(() => {
      $("#load-modal").modal("hide");
    }, 3000);
  } else {
    setTimeout(() => {
      $("#load-modal").modal("hide");

      tata.error("Sistema Estratégico", "Llenar correctamente los datos", {
        position: "tm",
        closeBtn: false,
      });
    }, 3000);
  }
};

// Consulta a firebase
const getMaterias = (array) => {
  $(".container-registro").css("display", "none");

  let nombre = array[0] + " " + array[1] + " " + array[2];

  $(".name-user-comf")
    .empty()
    .text(
      nombre.toUpperCase() + "  " + array[3] + "  " + array[4] + "  " + array[5]
    );

  $(".name-user-comf-id")
    .empty()
    .text(
      nombre.toUpperCase() + "-" + array[3] + "-" + array[4] + "-" + array[5]
    );

  $(".materias-loads").css("display", "block");

  let body = ``;
  // materias - get - load;

  db.collection("carrera")
    .doc(dataUserLogin.User)
    .collection(array[4])
    .where("PERIODO", "==", array[4])
    .get()
    .then((querySnapshot) => {
      DataMaterias = [];
      querySnapshot.forEach((doc) => {
        let arrayCom = [];
        arrayCom.push([doc.id, doc.data()]);

        DataMaterias.push(arrayCom);

        body += `
        <div class="form-check col-5 m-3 p-4  border rounded border-primary align-items-center">
          <div class="input-group">
            <span class="input-group-text">${doc.data().NOMBRE}</span>
            <input id="${
              doc.id
            }" type="number" aria-label="" class="form-control">
          </div>
        </div>`;
      });
      $(".materias-get-load").empty().append(body);
    });
};

$(".closed-modal-reg").click(function () {
  $("#modalRegistrer").modal("hide");
  $(".form-control").val("");
});

var DataComfirm = [],
  dataRegistro = [];
// Confirmas materias
$("#comfirmRegistro").click(function () {
  $("#load-modal").modal("show");

  let contador = 0;
  setTimeout(() => {
    DataMaterias.forEach((element) => {
      if ($("#" + element[0][0]).val() === "") {
        contador++;
      } else {
        dataRegistro.push({
          Nombre: element[0][1].NOMBRE,
          Calificacion: $("#" + element[0][0]).val(),
        });
      }
    });

    setTimeout(() => {
      if (contador === DataMaterias.length) {
        $("#load-modal").modal("hide");

        tata.error("Sistema Estratégico", "Sin registro de calificaciones", {
          position: "tm",
          closeBtn: false,
        });
      } else {
        $("#load-modal").modal("hide");

        $("#message-text-set").val("");
        $("#modalRegistrer").modal("show");
      }
    }, 2000);
  }, 3000);
});

$("#setDataMaterias").click(function () {
  let labelData = $(".name-user-comf-id").text().split("-");

  let docId = db
    .collection("registro")
    .doc(dataUserLogin.User)
    .collection("Periodo")
    .doc();

  let setdataFirebase = {
    Nombre: labelData[0],
    NC: labelData[1],
    Periodo: labelData[2] + "-" + labelData[3],
    Year: labelData[4],
    Materias: dataRegistro,
    DateSet: new Date(),
    Message:
      $("#message-text-set").val() === "" ? null : $("#message-text-set").val(),
    Area: dataUserLogin.User,
    Status: false,
    idCarrera: dataUserLogin.ID,
    idDocUser: docId.id,
  };

  setTimeout(() => {
    $("#modalRegistrer").modal("hide");

    $("#load-modal").modal("show");

    setDataFinally(docId, setdataFirebase);
  }, 2000);
});

const setDataFinally = (query, data) => {
  query
    .set(data)
    .then(() => {
      $("#load-modal").modal("hide");

      tata.success("Sistema Estratégico", "Registro completado", {
        position: "tm",
        closeBtn: false,
      });
    })
    .catch((error) => {
      tata.error("Sistema Estratégico", "Intentar de nuevo", {
        position: "tm",
        closeBtn: false,
      });
    });
};

// Asesoria

$("#getAsesoria").click(function () {
  $(".validad-estudiante").removeClass("is-invalid");

  let contador = 5,
    dataSet = [];
  if ($("#names-aser").val() === "") {
    contador--;
    $("#names-aser").addClass("is-invalid");
  } else {
    dataSet.push($("#names-aser").val());
  }

  //
  if ($("#last-aser-user").val() === "") {
    contador--;
    $("#last-aser-user").addClass("is-invalid");
  } else {
    dataSet.push($("#last-aser-user").val());
  }

  //
  if ($("#last-aser-user-1").val() === "") {
    contador--;
    $("#last-aser-user-1").addClass("is-invalid");
  } else {
    dataSet.push($("#last-aser-user-1").val());
  }

  //
  if ($("#id-user-aser").val() === "") {
    contador--;
    $("#id-user-aser").addClass("is-invalid");
  } else {
    dataSet.push($("#id-user-aser").val());
  }

  //
  if ($("#textAreaAser").val() === "") {
    contador--;
    $("#textAreaAser").addClass("is-invalid");
  } else {
    dataSet.push($("#textAreaAser").val());
  }

  if (contador === 5) {
    $("#load-modal").modal("show");

    setInfoAsesoria(dataSet);
  } else {
    tata.error("Sistema Estratégico", "Registro completado", {
      position: "tm",
      closeBtn: false,
    });
  }
});

const setInfoAsesoria = (data) => {
  console.log(data);

  let query = db
    .collection("asesoria")
    .doc(dataUserLogin.User)
    .collection("Registro")
    .doc();

  let setInfo = {
    Nombre: data[0] + " " + data[1] + " " + data[2],
    NC: data[3],
    Message: data[4],
    DateSet: new Date(),
    revisada: false,
    idDocUser: query.id
  };

  let year = new Date().getFullYear() + "";
  console.log(year);

  query
    .set(setInfo)
    .then(() => {
      $("#load-modal").modal("hide");

      tata.success("Sistema Estratégico", "Registro completado", {
        position: "tm",
        closeBtn: false,
      });
    })
    .catch((error) => {
      tata.error("Sistema Estratégico", "Intentar de nuevo", {
        position: "tm",
        closeBtn: false,
      });
    });
};
