function getCurrent() {
  var cityName = "San+Francisco";
  var queryURL = "api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=40e2dec5462a7caaff123f43a6aa58d6";
  
  $.ajax({
    url: queryURL,
    method: "GET",
  });
}

console.log(getCurrent());
