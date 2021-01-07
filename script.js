var DateTime = luxon.DateTime;
var time = DateTime.local();

function getCurrent() {
  var cityName = "San+Francisco";
  //   var cityName = "";
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=40e2dec5462a7caaff123f43a6aa58d6";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (data) {
    console.log(data);
    var time = DateTime.fromSeconds(data.dt).toLocaleString(
      DateTime.DATE_SHORT
    );
    $("h2").text(data.name + " " + time);
  });
}

console.log(getCurrent());
