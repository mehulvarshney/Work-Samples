let key = "ff01c8204b3986ff7efa4a4be55a5a5c";
let container = document.getElementById("container")
let erroricon = document.getElementById("erroricon");
let message = document.getElementById("message");
let citypara = document.getElementById("city");
let icon = document.getElementById("icon");
let datepara = document.getElementById("date");
let temppara = document.getElementById("temperature");
let weatherpara = document.getElementById("weather");
let minmax = document.getElementById("max-min");
let humidity = document.getElementById("humidity");
let windspeed = document.getElementById("windspeed");
const input = document.getElementById("input");


input.addEventListener("keypress", function (evt) {//function call at every keypress;
    if (evt.keyCode == 13) {
        getResult(input.value);
    }
})


//Function to get weather from api
async function getResult(cityname) {
    try {
        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}`);
        let data = await response.json();

        if (response.ok) {
            displayResult(data);
        }
        else {
            throw new Error("Please enter a valid input");
        }

    }
    catch (error) {
        erroricon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
        erroricon.style.paddingTop = "12%"
        message.innerHTML = ` "${cityname}" is not a correct input "</br>  ${error}`;
        displayNone();

    }
}


//function to display weather
function displayResult(weather) {
    backgroundchange(weather)
    erroricon.style.paddingTop = "0%"
    message.innerText = "";
    erroricon.innerText = "";

    citypara.innerText = `${weather.name},${weather.sys.country}`;

    datepara.innerText = displayDate();

    icon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    icon.style.display = "inline";

    temppara.innerHTML = `${Math.round(weather.main.temp - 273.15)}<span>°<span id="celcius">C</span></span>`

    weatherpara.innerText = weather.weather[0].main;

    minmax.innerText = `${Math.round(weather.main.temp_min - 273.15)}°C-${Math.round(weather.main.temp_max - 273.15)}°C`;
    humidity.innerText = `Humidity: ${weather.main.humidity}%`;
    windspeed.innerText = `Windspeed: ${weather.wind.speed}Km/h`;

}

//function call only  to display Error/message.
function displayNone() {
    citypara.innerText = '';
    datepara.innerText = '';
    temppara.innerHTML = ''
    weatherpara.innerText = ''
    minmax.innerText = '';
    icon.src = "#";
    icon.style.display = "none";
    humidity.innerText = "";
    windspeed.innerText = "";
    container.style.backgroundImage = "url('images/night.png')"
}


//function to display date
function displayDate() {
    let date = new Date();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const days = ["Sunday", "Monday", "Tuesday", "Wedsday", "Thursday", "Friday", "Saturday"];

    let today_day = days[date.getDay()];

    let today_month = months[date.getMonth()];

    return `${today_day} ${date.getDate()} ${today_month} ${date.getFullYear()}`;
}


//function chnage background-image according to icon last index
function backgroundchange(data) {
    let iconidarray = data.weather[0].icon.split('');//get icon id contains last character d and n
    shift = iconidarray.slice(-1).pop()//get last character
    if (shift == "d") {
        container.style.backgroundImage = 'url("images/day.png")'
    }
    else{
        container.style.backgroundImage = 'url("images/night.png")'
    }
}
displayNone();