var searchButton = $(".searchButton");
var buttonEl = document.getElementById("search");
var searchEl = document.getElementById("searchInput");
var apiKey = "6b8f50aecb21ce8758870ec389382c01";
var keyCount = 0;
var cityName;

buttonEl.addEventListener("click",function(){
    searchFunction();
});

function searchFunction() {
    var searchInput = $(".searchInput").val();
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
    if (searchInput == "") {
        console.log(searchInput);
    } else {
        fetch(urlCurrent)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
             console.log(data.name);
             cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + data.name + "</li>");
            localStorage.setItem(keyCount, data.name);
            keyCount = keyCount + 1;
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            currentCard.append(currentName);
            var timeUTC = new Date(data.dt * 1000);
            currentName.append(data.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`);
            var currentTemp = currentName.append("<p>");
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + data.main.temp + "</p>");
            currentTemp.append("<p>" + "Humidity: " + data.main.humidity + "%" + "</p>");
            currentTemp.append("<p>" + "Wind Speed: " + data.wind.speed + "</p>");
            var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${data.coord.lat}&lon=${data.coord.lon}`;
         fetch(urlUV)
        .then(function (response){
            return response.json();
         })
        .then(function (data) {
            var currentUV = currentTemp.append("<div id=uvScale>"+"<p>" + "UV Index: " + data.value + "</p>"+"</div>").addClass("card-text");
            currentUV.addClass("UV");
            currentTemp.append(currentUV);
            var uvEl =document.getElementById("uvScale");
            if(data.value <= 4 ){
                uvEl.classList.add("text-success")
            }
            else if (data.value >= 4 && data.value<= 8){
                uvEl.classList.add("text-warning")
            }
            else if(data.value >= 8 ){
                uvEl.classList.add("text-danger")
            }
            });
        });
            fetch(urlFiveDay)
            .then(function (response){
                return response.json();
            })
            .then(function (data) {
            var day = [0, 8, 16, 24, 32];
            var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
            fiveDayDiv.empty();
            day.forEach(function (i) {
                var FiveDayTimeUTC1 = new Date(data.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");
                fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + data.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + data.list[i].main.humidity + "%" + "</p>" + "</div>");
            })
        });
    }
};
for (var i = 0; i < localStorage.length; i++) {
    var city = localStorage.getItem(i);
    cityName = $(".list-group").addClass("list-group-item");
    cityName.append("<li>" + city + "</li>");
}