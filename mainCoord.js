var dataUserLogin = JSON.parse(localStorage.getItem("DataUserLocal"));
moment.locale("es");


function loadData () {

    console.log("jndjdjb");
    $("#title-teacher").empty().text(dataUserLogin.Carrera);

    $("#dateNow").empty().text(moment(new Date()).format("LLLL")); 
};


$("#getExtras").click(function () {
    $("#modalGetData").modal("show");
});


$("#getAsesor").click(function () {
    $("#modalGetData").modal("show");
});



$("#getUsers").click(function () {
    $("#modalGetData").modal("show");
});



$("#getMaterias").click(function () {
    $("#modalGetData").modal("show");
});

loadData();