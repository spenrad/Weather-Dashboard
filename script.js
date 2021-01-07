function getCurrent() {
  var cityName = "San+Francisco";
  //   var cityName = "";
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=40e2dec5462a7caaff123f43a6aa58d6";
  
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(data){
    console.log(data)
  });
}

console.log(getCurrent());