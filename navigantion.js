// Estudiantes
$("#logo-reg").click(function () {
  $(".main-view").css("display", "none");
  $(".container-registro").css("display", "block");
});

$(".back-user").click(function () {
  $(".container-registro").css("display", "none");
  $(".main-view").css("display", "block");
  // Quita invalid
  $(".validad-estudiante").removeClass("is-invalid");
});

$("#getData").click(function () {
  $("#load-modal").modal("show");
  ValidaData();
});

$(".back-user-1").click(function () {
  $(".materias-loads").css("display", "none");
  $(".container-registro").css("display", "block");
});


$("#logo-aser").click(function () {
  $(".main-view").css("display", "none");
  $(".container-asesoria").css("display", "block");
});


$(".back-aser").click(function () {
  $(".container-asesoria").css("display", "none");
  $(".main-view").css("display", "block");
});