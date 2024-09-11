let apiKey = `0cda9cb1578e4196b3400347240809`;
let dateObj = new Date();

let getDayName = (dayType, dateVal = dateObj) => dateVal
    .toLocaleDateString('en-US', { weekday: dayType });

let currentTemp = document.getElementById("nowTempDetails");
let currentHumidity = document.getElementById("humidityValue");
let currentWindSpeed = document.getElementById("windValue");
let currentDate = document.getElementById("nowDate");
let textDay = document.getElementById("currentDay");
let nowName = document.getElementById("nowLocation");
let nowDay = document.getElementById("now").textContent = getDayName('long');
//let nowDescription = document.getElementById("description");
let discriptionCard = document.getElementById("description");
let forecastDetails = document.getElementById("forecst5Days");


function fetchWeatherData(location) {
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=5`;

    fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data);
        console.log(getDayName('long'))

        currentTemp.innerHTML = `
                    <h3>${nowDay}</h3>
                    <h2 id ="nowTemp"><img src = "${data.current.condition.icon}">${data.current.temp_c}&deg;C</h2>`;
        currentHumidity.innerText = data.current.humidity + "%";
        currentWindSpeed.innerText = data.current.wind_kph + "kph";
        currentDate.innerText = data.location.localtime.split(" ")[0];
        nowName.innerText = data.location.country + "," + data.location.name
        //nowDescription.innerText = data.current.condition.text
        discriptionCard.innerHTML = `
                
                <p>Local Time <strong>${data.location.localtime.split(" ")[1]}</strong></p>
               
                <p><strong>${data.current.condition.text}</strong></p>
                <p>Sun Rise <strong>${data.forecast.forecastday[0].astro.sunrise}</strong></p>
                <p>Sun set <strong>${data.forecast.forecastday[0].astro.sunset}</strong></p>
                `;

        let forecast;
        for (let i = 0; i < 5; i++) {

            forecast +=
                `<div id="day1" class="nextDetails">
                                 <span class="date">${data.forecast.forecastday[i].date}</span><hr>
                                 <span class="forecastTemp"><img src ="${data.forecast.forecastday[i].day.condition.icon}"><br>${data.forecast.forecastday[i].day.avgtemp_c}&deg;C </span><hr>
                                 <span class="other"><hr>Humidity<br>${data.forecast.forecastday[i].day.avghumidity}%<hr>Wind Speed<br>${data.forecast.forecastday[0].day.maxwind_kph}kph<hr></span>
                                 </div>`;
        }
        forecastDetails.innerHTML = forecast;

    });
}

navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const location = `${latitude},${longitude}`;

    fetchWeatherData(location);
}, error => {
    console.log(`Error getting location`, error);
});

function search() {
    let inputByUser = document.getElementById("search_field").value;

    fetchWeatherData(inputByUser);
}
let current_location = document.getElementById("current");
function current_Area() {
    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const location = `${latitude},${longitude}`;

        fetchWeatherData(location);
    }, error => {
        console.log(`Error getting location`, error);
    });
}
current_location.addEventListener('click', current_Area);

