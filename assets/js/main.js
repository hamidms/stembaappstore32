var dataApp;

$(document).ready(function () {
  //mengambil data dari db/db.json dan dibuat variable dataApp
  $.getJSON("assets/db/db.json", function (data) {
    window.dataApp = data.dataApp;
    getRandomApp();
  });
});

function getRandomApp() {
  for (var i = 1; i <= 6; i++) {

    var idRand = Math.floor(Math.random() * dataApp.length);
    console.log(idRand);
    var idApp = dataApp[idRand].id;

    var html = '\
    <div class="col-lg-4">\
    <div class="thumbnail">\
    <img src="assets/img/'+ dataApp[idApp].nick + '.png" class="img-thumbnail" width=200 alt="' + dataApp[idApp].nick + '" >\
    <h4>'+ dataApp[idApp].name + '</h4>\
    <br><button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#my'+ dataApp[idApp].nick + '">Read More</button>\
    </div>\
    </div>\
    ';

    modalApp(idApp);

    $('#top-application').append(html);
  }
}

function modalApp(id) {

  var html = '<div id="my' + dataApp[id].nick + '" class="modal fade" style="top:50px;" role="dialog"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header">\
  <button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">'+ dataApp[id].name + '</h4> \
  </div><div class="modal-body"><div class="col-md-12"><img class="img-icon" src="assets/img/'+ dataApp[id].nick + '.png" alt="' + dataApp[id].nick + '" width="120" height="120"></div><p class="text-dark" style="color:black;" > ' + dataApp[id].desc + ' </p>\
  <img id="ss1" class="imgss" src="assets/img/'+ dataApp[id].nick + '-ss1.png" alt="SS1"> \
  <img id="ss2" class="imgss" src="assets/img/'+ dataApp[id].nick + '-ss2.png" alt="SS2"></div><div class="modal-footer"><button type="button" onclick="install(\'' + dataApp[id].nick + '\')"  data-dismiss="modal"  class="btn btn-success btn-lg" >Install</button></div></div></div></div>';

  $("#apps_detail").append(html);
}

function appCate(app) {
  document.getElementById("category").style.display = "none";

  var catApp = appCat(app);
  var app = findByKey(dataApp, 'kat', app);

  $('#top-application').html('');
  $('#apps_detail').html('');

  if (app.length == 0) {
    $('#top-application').append('<p class="bg-danger">Belum ada data, akan di perbarui secepatnya :)</p>');
  } else {
    for (var i = 0; i < app.length; i++) {

      var html = '\
      <div class="col-sm-4">\
      <div class="thumbnail">\
      <img src="assets/img/'+ app[i].nick + '.png" class="img-thumbnail" width=200 alt="' + app[i].nick + '" >\
      <h4>'+ app[i].name + '</h4>\
      <br><button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#my'+ app[i].nick + '">Read More</button>\
      </div>\
      </div>\
      ';

      modalApp(app[i].id);
      $('#top-application').append(html);
    }
  }
  $('#head-jurusan').html(catApp[0]);

  $('#low-jurusan').html(catApp[1]);
}

// Application Category
function appCat(cat) {
  var app = new Array();
  switch (cat) {
    case "develop":
      app.push("Develop");
      app.push("Aplikasi Pengembang");
      break;
    case "simulate":
      app.push("Simulate");
      app.push("Aplikasi Pencoba");
      break;
    case "network":
      app.push("Network");
      app.push("Aplikasi Networker");
      break;
    case "design":
      app.push("Design");
      app.push("Aplikasi Desainer");
      break;
    case "play":
      app.push("Play");
      app.push("Aplikasi Gamer");
      break;
    default:
  } return app;
}

//http://stackoverflow.com/questions/43171098/javascript-how-to-get-select-all-object-with-same-keys
function findByKey(object, key, value) {
  var result = [];
  for (i = 0; i < object.length; i++) {
    var element = object[i];

    if (element[key] === value) {
      result.push(element);

    }
  }
  return result;
}


var parsing =
{
  Get: function () {
    return JSON.parse(localStorage.getItem("kat"));
  },
  Set: function (kat) {
    localStorage.setItem("kat", JSON.stringify(kat));
  }
};


function install(nick) {
  const { exec } = require('child_process');

  $("#error").html('');
  var online = navigator.onLine;
  if (online) {

    document.getElementById("loader-wrapper").style.display = "block";

    exec('./assets/bash/' + nick + '.sh', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        $("#error").append(error);

        document.getElementById("loader-wrapper").style.display = "none";
        document.getElementById("error-wrapper").style.display = "block";
        return;
      }
      if (stderr) {
        console.error(`exec error: ${stderr}`);
        $("#error").append(stderr);

        document.getElementById("loader-wrapper").style.display = "none";
        document.getElementById("error-wrapper").style.display = "block";
      }

      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);

    });

    $("#error").append("<br>");

    exec('./assets/bash/rm.sh', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        $("#error").append(error);

        document.getElementById("loader-wrapper").style.display = "none";
        document.getElementById("error-wrapper").style.display = "block";
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });

    setTimeout(function () {
      document.getElementById("loader-wrapper").style.display = "none";
      $("#success-wrapper").show();
    }, 20000);

  } else {
    $("#error").append("Tidak Ada Koneksi Internet");
    document.getElementById("error-wrapper").style.display = "block";
  }

  (function () {
    var old = console.log;
    var logger = document.getElementById('log');
    console.log = function (message) {
      if (typeof message == 'object') {
        logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
      } else {
        logger.innerHTML += message + '<br />';
      }
    }
  })();

}