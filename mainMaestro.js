// const moment = require("moment");

var dataUserLogin = JSON.parse(localStorage.getItem("DataUserLocal"));
moment.locale("es");

// LoadData
const LoadData = () => {
  $("#title-teacher").empty().text(dataUserLogin.Carrera);

  $("#dateNow").empty().text(moment(new Date()).format("LLLL"));

  db.collection("registro")
    .doc(dataUserLogin.userCarrera)
    .collection("Periodo")
    .where("Status", "==", false)
    .where("idCarrera", "==", dataUserLogin.ID)
    .get()
    .then((querySnapshot) => {
      $("#idTBody").empty();
      querySnapshot.forEach((doc) => {
        $("#idTBody").append(`
          <tr>
            <td style="font-size: 12px;">${doc.data().Nombre}</td>
            <td style="font-size: 12px;">${doc.data().NC}</td>
            <td style="font-size: 12px;">${doc.data().Periodo}</td>
            <td style="font-size: 12px;">${doc.data().Year}</td>
            <td style="font-size: 12px;"><button type="button" onclick="getMaterias('${
              doc.id
            }')" class="btn btn-info btn-sm">Ver materias</button></td>
          </tr>`);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  setTimeout(() => {
    db.collection("asesoria")
      .doc(dataUserLogin.userCarrera)
      .collection("Registro")
      .where("revisada", "==", false)
      .get()
      .then((querySnapshot) => {
        $("#bodyAsesoria").empty();
        querySnapshot.forEach((doc) => {
          $("#bodyAsesoria").append(`
          <div class="border rounded border-black mb-2 p-1">
            <h6 class="text-center text-dark"><strong>${doc.data().Nombre} ${
            doc.data().NC
          }</strong></h6>
            <div class="text-center">
              <small class="text-secondary">${moment(
                new Date(doc.data().DateSet.seconds * 1000)
              ).format("LLL")}</small>
            </div>
            <label class="px-5 mt-2 mb-4" style="font-size: 12px;">${doc.data().Message}</label>
            <div class="d-flex justify-content-center mb-2">
              <button type="button" class="btn btn-info btn-sm" onclick="setStatusAS('${
                doc.data().idDocUser
              }')">Revisada</button>
            </div>
          </div>
          `);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, 3000);
};

const getMaterias = (id) => {
  $("#sectionModalGet").css("display", "none");
  $("#sectionModalLoad").css("display", "block");

  $("#modalGetMaterias").modal("show");
  let headModal = ``,
    bodyModal = ``;
  // headModalID

  db.collection("registro")
    .doc(dataUserLogin.userCarrera)
    .collection("Periodo")
    .doc(id)
    .get()
    .then((doc) => {
      headModal = ``;
      setTimeout(() => {
        $("#titleName").empty().text(doc.data().Nombre);
        $("#titleSistema").empty().text("Sistema Estrategico ITC Cuautla");

        headModal = `
        <div class="col-4">
          <div>
            <h5 class="text-center"><strong>Periodo:</strong></h5>
          </div>
          <div>
            <h6 class="text-center text-secondary">${doc.data().Periodo}</h6>
          </div>
        </div>
        <!--  -->
        <div class="col-4">
          <div>
            <h5 class="text-center"><strong>Año:</strong></h5>
          </div>
          <div>
            <h6 class="text-center text-secondary">${doc.data().Year}</h6>
          </div>
        </div>
        <!--  -->
        <div class="col-4">
          <div>
            <h5 class="text-center"><strong>Número de control:</strong></h5>
          </div>
          <div>
            <h6 class="text-secondary text-center">${doc.data().NC}</h6>
          </div>
        </div>
        `;

        $("#headModalID").empty().append(headModal);
        let borderColor = "",
          numeroM = doc.data().Materias.length,
          suma = 0;

        doc.data().Materias.forEach((element) => {
          suma += parseInt(element.Calificacion);

          if (parseInt(element.Calificacion) <= 70) {
            borderColor = "border-danger";
          } else if (
            parseInt(element.Calificacion) > 70 &&
            parseInt(element.Calificacion) < 79
          ) {
            borderColor = "border-warning";
          } else {
            borderColor = "border-success";
          }

          bodyModal += `
          <div class="col-5 ms-5 mb-2 border rounded ${borderColor}">
            <div class="text-center"><small style="font-size: 13px"><strong>${element.Nombre}</strong></small></div>
            <div class="text-center text-secondary" style="font-size: 12px"><small><strong>${element.Calificacion}</strong></small></div>
          </div>
          `;

          $("#bodyModalID").empty().append(bodyModal);
        });

        let promG = suma / numeroM,
          textColor = "",
          textBorder = "";

        if (parseInt(promG) <= 70) {
          textColor = "text-danger";
          textBorder = "border-danger";
        } else if (parseInt(promG) > 70 && parseInt(promG) < 79) {
          textColor = "text-warning";
          textBorder = "border-warning";
        } else {
          textColor = "text-success";
          textBorder = "border-success";
        }

        $("#idPromedio")
          .empty()
          .append(
            `<h6 class="border rounded w-50 ${textBorder} ${textColor} text-center mt-2"><strong>Promedio: </strong>${promG}</h6>`
          );

        $("#sugerenciaText").empty().append(`
        <hr>
        <small><strong>Mensaje:</strong></small>
        <small class="text-center">${doc.data().Message}</small>`);

        $("#containerButtons").empty().append(`
          <button type="button" class="btn btn-info btn-sm" onclick="setStatus('${
            doc.data().idDocUser
          }')" >Revisada</button>
        `);

        $("#sectionModalLoad").css("display", "none");
        $("#sectionModalGet").css("display", "block");
      }, 3000);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

const setStatus = (idDoc) => {
  console.log("Hugo");
  $("#sectionModalGet").css("display", "none");
  $("#sectionModalLoad").css("display", "block");

  setTimeout(() => {
    db.collection("registro")
      .doc(dataUserLogin.userCarrera)
      .collection("Periodo")
      .doc(idDoc)
      .update({ Status: true })
      .then(() => {
        LoadData();

        $("#modalGetMaterias").modal("hide");

        tata.success("Sistema Estratégico", "Materias registradas", {
          position: "tm",
          closeBtn: false,
        });
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, 5000);
};

const setStatusAS = (idDoc) => {
  db.collection("asesoria")
    .doc(dataUserLogin.userCarrera)
    .collection("Registro")
    .doc(idDoc)
    .update({ revisada: true })
    .then(() => {
      setTimeout(() => {
        LoadData();

        tata.success("Sistema Estratégico", "Materias registradas", {
          position: "tm",
          closeBtn: false,
        });

      }, 500);
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};

LoadData();
