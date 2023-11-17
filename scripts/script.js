
const cityInput = document.querySelector("#cityName");
const button = document.querySelector(".cityButton");
const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const container = document.querySelector(".card-container")

// get geo data from api with function to usein start weather
async function getGeoData(city){
  const response = await fetch("https://geocoding-api.open-meteo.com/v1/search?name="+city);
  const data = await response.json();
  return data.results[0];
  
}
//get weather data based on lat, long from geo data,
async function getWeatherData(location){
  const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude="+location.latitude +"&longitude="+location.longitude+"&current=is_day&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=GMT")
  const data = await response.json();
  return data;
}

function nightTime() {
  const bgimg = document.querySelector("body")
  bgimg.style.backgroundImage = "url('./images/3d-cartoon-background-children.jpg')"
}

//function to start the weather app process, get geo location data from input data
// then get weather data based on geolocation data
async function startWeather(){
  const cityName = document.querySelector("#cityName").value;
  const geoData = await getGeoData(cityName)
  const weatherData = await getWeatherData(geoData);
  console.log(weatherData);

  //while loop to remove children
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  //for loop to create cards
  for (let i = 0; i <= 6; i++) {
    const card = document.createElement('div');
    //get day of the week
    const weekday = document.createElement('p');
    const day = new Date(weatherData.daily.time[i])
    weekday.className = "weekday"
    weekday.textContent = daysOfTheWeek[day.getDay()]

    const image = document.createElement('img');
    const temperature = document.createElement('div');
    const tempMax = document.createElement('p');
    const tempMin = document.createElement('p');

    //if statements for weathercodes and images
    const weatherCode = weatherData.daily.weather_code[i];
    const isDay = weatherData.current.is_day;
    const bgimg = document.querySelector("body");

      {if (weatherCode == 0 && isDay == 1) {
          image.src = "./images/WeatherCode/day-code-0.png"
        }if (weatherCode == 0 && isDay == 0) {
          image.src = "./images/WeatherCode/night-code0.png"
        }
        if (weatherCode == 1 || weatherCode == 2 && isDay == 1){
          image.src = "./images/WeatherCode/day-code-1-2.png"
        }if (weatherCode == 1 || weatherCode == 2 && isDay == 0){
          image.src = "./images/WeatherCode/night-code1-2.png"
        }
        if (weatherCode == 3) {
          image.src = "./images/WeatherCode/code-3.png"
        }
        if (45 <= weatherCode && weatherCode <= 48) {
          image.src = "./images/WeatherCode/code-45-48.png"  
        }
        if (51 <= weatherCode && weatherCode <= 67 && isDay == 1) {
          image.src = "./images/WeatherCode/day-code-51-67.png"        
        }if (51 <= weatherCode && weatherCode <= 67 && isDay == 0) {
          image.src = "./images/WeatherCode/night-code-51-67.png"        
        }
        if (71 <= weatherCode && weatherCode <= 77) {
          image.src = "./images/WeatherCode/code-71-77.png"        
        }
        if (80 <= weatherCode && weatherCode <= 82) {
          image.src = "./images/WeatherCode/code-80-82.png"        
        }
        if (85 <= weatherCode && weatherCode <= 86) {
          image.src = "./images/WeatherCode/code-85-86.png"        
        }
        if (95<= weatherCode && weatherCode <= 99) {
          image.src = "./images/WeatherCode/code-95-99.png"        
        }
      }

      //add function for nighttimecolor
      if (isDay == 0) {
          bgimg.style.backgroundImage = "url('./images/3d-cartoon-background-children.jpg')"
        } else {
          bgimg.style.backgroundImage = "url('./images/paper_clouds.jpg')"
        }

    //add class textcontent and append
    card.className = "card" 
    image.className = "weather-image"
    temperature.className = "temperature"
    tempMax.innerHTML = (weatherData.daily.temperature_2m_max[i]+"°");
    tempMin.innerHTML = (weatherData.daily.temperature_2m_min[i]+"°");
    container.appendChild(card)
    card.append(weekday)
    card.append(image)
    card.appendChild(temperature);
    temperature.appendChild(tempMin);
    temperature.appendChild(tempMax);
  }
  //variables for hours
  const hourCard = document.createElement("div");
  hourCard.className = "hour-card"
  container.appendChild(hourCard)
  container.insertBefore(hourCard, container.children[1]);
  const hourHeader = document.createElement("div");
  hourHeader.className ="hour-header";
  hourHeader.innerHTML = "<p>Hour</p><p>Temp</p><p>Chance of Rain</p>";
  hourCard.appendChild(hourHeader);


  //for loop for hours
  for (let i = 0; i < 25; i = i + 4 ) {
    const hours = weatherData.hourly.time[i].split("T");
    // console.log(hours[1]);
    const hourDiv = document.createElement('div');
    hourDiv.className = 'hour';
    hourCard.appendChild(hourDiv);

    const hourTxt = document.createElement("p");
    const hourTemp = document.createElement("p");
    const precipitation = document.createElement("p");

    const weatherCode = weatherData.hourly.weather_code[i];
    const isDay = weatherData.current.is_day;
    const hourImg = document.createElement("img")
    
    {if (weatherCode == 0 && isDay == 1) {
      hourImg.src = "./images/WeatherCode/day-code-0.png"
    }if (weatherCode == 0 && isDay == 0) {
      hourImg.src = "./images/WeatherCode/night-code0.png"
    }
    if (weatherCode == 1 || weatherCode == 2 && isDay == 1){
      hourImg.src = "./images/WeatherCode/day-code-1-2.png"
    }if (weatherCode == 1 || weatherCode == 2 && isDay == 0){
      hourImg.src = "./images/WeatherCode/night-code1-2.png"
    }
    if (weatherCode == 3) {
      hourImg.src = "./images/WeatherCode/code-3.png"
    }
    if (45 <= weatherCode && weatherCode <= 48) {
      hourImg.src = "./images/WeatherCode/code-45-48.png"  
    }
    if (51 <= weatherCode && weatherCode <= 67 && isDay == 1) {
      hourImg.src = "./images/WeatherCode/day-code-51-67.png"        
    }if (51 <= weatherCode && weatherCode <= 67 && isDay == 0) {
      hourImg.src = "./images/WeatherCode/night-code-51-67.png"        
    }
    if (71 <= weatherCode && weatherCode <= 77) {
      hourImg.src = "./images/WeatherCode/code-71-77.png"        
    }
    if (80 <= weatherCode && weatherCode <= 82) {
      hourImg.src = "./images/WeatherCode/code-80-82.png"        
    }
    if (85 <= weatherCode && weatherCode <= 86) {
      hourImg.src = "./images/WeatherCode/code-85-86.png"        
    }
    if (95<= weatherCode && weatherCode <= 99) {
      hourImg.src = "./images/WeatherCode/code-95-99.png"        
    }
  }
  hourImg.classList = "hour-image";
  

  hourTxt.textContent = hours[1];
  hourDiv.appendChild(hourTxt);

  hourTemp.textContent = weatherData.hourly.temperature_2m[i]+"°C"
  hourDiv.appendChild(hourTemp);

  precipitation.textContent = weatherData.hourly.precipitation_probability[i]+"%"
  hourDiv.appendChild(precipitation);

  hourDiv.appendChild(hourImg);
  }
}
//add eventlistener for enter and click on button
cityInput.addEventListener('keypress', (event)=>{
  if (event.code === "Enter") {
    event.preventDefault();
    startWeather();
  }
});

button.addEventListener('click', startWeather);
