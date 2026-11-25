let loc = document.querySelector('input');
let btn = document.querySelector('.search');
let temp = document.querySelector('.weather-celsius');

const veryColdAdvice = [
  "Wear warm jacket",
  "Drink hot beverages",
  "Layer your clothing",
  "Protect your ears",
  "Limit outdoor exposure"
];

const coolAdvice = [
  "Carry light jacket",
  "Enjoy outdoor walk",
  "Wear full sleeves",
  "Stay comfortably active",
  "Drink warm water",
];

const pleasantAdvice = [
  "Perfect outdoor weather",
  "Go for cycling",
  "Stay lightly hydrated",
  "Wear comfortable clothes",
  "Enjoy fresh air",
];

const hotAdvice = [
    "Drink plenty water",
    "Wear light cotton",
    "Avoid afternoon sun",
    "Use sunscreen regularly",
    "Carry sunglasses outside",
];

const veryHotAdvice = [
    "Stay indoors mostly",
    "Drink electrolyte fluids",
    "Avoid direct sunlight",
    "Wear loose clothing",
    "Take frequent breaks",
];


function updateAdvice(adviceArray) {
    let advices = document.querySelectorAll(".advice");

    for (let i = 0; i < advices.length; i++) {
    advices[i].textContent = adviceArray[i];
    }
}


async function fetchWeather(place){
    let logo = document.querySelector(".weather-logo");
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=66533fca0151f020b48af5390aca1cbd&units=metric`
    
    let response = await fetch(url);
    let data = await response.json();
    
    if (data.cod !== 200) {
        alert("City not found!");
        return;
    }

    document.querySelector('.location-name').textContent = place;
    
    let temperature = Math.ceil(data.main.temp);
    temp.textContent = temperature + "°C";

    if(temperature < 10){
        logo.innerHTML = '<i class="fa-solid fa-snowflake"></i>';
        updateAdvice(veryColdAdvice);
        logo.style.color = "#4FC3F7";
    }
    else if(temperature >=10 && temperature <20){
        logo.innerHTML = '<i class="fa-solid fa-cloud"></i>';
        updateAdvice(coolAdvice);
        logo.style.color = "#90A4AE";
    }
    else if(temperature >=20 && temperature <30){
        logo.innerHTML = '<i class="fa-solid fa-cloud-sun"></i>';
        updateAdvice(pleasantAdvice);
        logo.style.color = "#42A5F5";
    }
    else if(temperature >=30 && temperature <=38){
        logo.innerHTML = '<i class="fa-solid fa-sun"></i>';
        updateAdvice(hotAdvice);
        logo.style.color = "#FFA726";
    }
    else{
        logo.innerHTML = '<i class="fa-solid fa-temperature-high"></i>';
        updateAdvice(veryHotAdvice);
        logo.style.color = "#EF5350";
    }


    let weatherType = data.weather[0].description;

    weatherType = weatherType.charAt(0).toUpperCase() + weatherType.slice(1);

    document.querySelector(".weather-type").textContent = weatherType + "......";
}

btn.addEventListener('click', function(){

    let place = loc.value;
    place = place.charAt(0).toUpperCase() + place.slice(1);
    
    fetchWeather(place);
})

loc.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        btn.click();
    }
})

window.onload = function () {
  fetchWeather("Hyderabad");
};
