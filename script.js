// defining our unique luxon var to obtain date/time
var DateTime = luxon.DateTime;
var time = DateTime.local();

// this function overwrites the HTML in the index to fill the current weather div
//also calls on the other functions to prepare them with info they will need in their arguments
function getCurrent() {
  var cityName = "San+Francisco";
  //   var cityName = "";
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&appid=40e2dec5462a7caaff123f43a6aa58d6";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (data) {
    console.log(data);
    // setting the variable to convert unix timestamp to a different date format unique to the luxon api
    var time = DateTime.fromSeconds(data.dt).toLocaleString(
      DateTime.DATE_SHORT
    );
    
    $("h2").text(data.name + " " + time);
    $("#currentIcon").attr("src", "http://openweathermap.org/img/w/" +
    data.weather[0].icon +
    ".png");
    $("#tempNow").text("Temperature: " + data.main.temp + " °F");
    $("#hum").text("Humidity: " + data.main.humidity + "%");
    $("#wind").text("Wind Speed: " + data.wind.speed + " MPH");

    // calling this function with these specific arguments pulls the lat and lon data from the queried city
    // allows us to obtain lat and lon and pass it on to other functions where they are required in the api url
    getfiveDay(data.coord.lat, data.coord.lon);
    getUV(data.coord.lat, data.coord.lon);
  });
}

console.log(getCurrent());

// this function appends a for looped set of cards for a five day forecast in daiv below or current weather div
// the arguments lat, lon can obtain their value from the api request/function call above
function getfiveDay(lat, lon) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=40e2dec5462a7caaff123f43a6aa58d6";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (data) {
    console.log(data);
    // having i=1 gives us tomorrows forecast and i < 6 iterates through 4 more days
    for (i = 1; i < 6; i++) {
      // using `...` allows up to add multiple lines which can be hard coded within simply by using a regular jQuery notation
      // this is ideal since we are going to for loop a bootstrap card component which has multiple lines of html
      // look closely where jQuery notation is used to manipulate the elements for each loop
      var date5 = DateTime.fromSeconds(data.daily[i].dt).toLocaleString(
        DateTime.DATE_SHORT
      );
      var html = `
          <div class="card">
          <div class="card-body">
              <h6 class="card-title">${date5}</h6>
              <img src=${
                "http://openweathermap.org/img/w/" +
                data.daily[i].weather[0].icon +
                ".png"
              } />
              <p>${data.daily[i].temp.day + " °F"}</p>
              <p>${data.daily[i].humidity + "%"}</p>
          </div>
          </div>
      `;
      $("#fiveDayFore").append(html);
    }
  });
}

// this function fetches the UV index
  // albeit from a different endpoint in the api, since our fuctions are separate, it makes no diff
    // lat and lon is passed on through the argument, so it is simple to get the data we need even with a different endpoint
function getUV(lat, lon) {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/uvi?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=40e2dec5462a7caaff123f43a6aa58d6";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (data) {
    console.log(data);
    $("#uv").text(data.value)
  });
}
