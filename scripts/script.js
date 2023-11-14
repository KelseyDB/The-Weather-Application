
const cityInput = document.querySelector("#cityName");
const button = document.querySelector(".cityButton");

const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const container = document.querySelector(".card-container")

const newDate = new Date('2023-11-14')
// to get today

const dayOfTheWeek = newDate.getDay()

console.log(dayOfTheWeek)
//the output here would be 2
//it is calculated with sunday === 0 and saturday === 6


//get geo data from api with function to usein start weather
async function getGeoData(city){
  const response = await fetch("https://geocoding-api.open-meteo.com/v1/search?name="+city);
  const data = await response.json();
  return data.results[0];
  
}
//get weather data based on lat, long from geo data,
async function getWeatherData(location){
  const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude="+location.latitude +"&longitude="+location.longitude+"&hourly=is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=GMT")
  const data = await response.json();
  return data;
}

//function to start the weather app process, get geo location data from input data
// then get weather data based on geolocation data
async function startWeather(){
  const cityName = document.querySelector("#cityName").value;
  const geoData = await getGeoData(cityName)
  const weatherData = await getWeatherData(geoData);
  console.log(weatherData.daily);

  //for loop to create cards with info from weatherData
  for (let i = 0; i <= 6; i++) {
    const card = document.createElement('div');
    container.appendChild(card)

    const weekday = document.createElement('p');
    const day = new Date(weatherData.daily.time[i])
    weekday.textContent = daysOfTheWeek[day.getDay()]
    weekday.className = "date"
    card.append(weekday)

    const image = document.createElement('img');
    const weatherCode = weatherData.daily.weather_code[i]
      {if (weatherCode == 0) {
        image.src = "./images/WeatherCode/day-code-0.png"
      }
      if (weatherCode == 1 || weatherCode == 2){
        image.src = "./images/WeatherCode/day-code-1-2.png"
      }
      if (weatherCode == 3) {
        image.src = "./images/WeatherCode/code-3.png"
      }
      if (51 <= weatherCode && weatherCode <= 67) {
        image.src = "./images/WeatherCode/day-code-51-67.png"        
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
    console.log(weatherCode);
    card.append(image)

    const temperature = document.createElement('div');
    const tempMax = document.createElement('p');
    const tempMin = document.createElement('p');
    tempMax.textContent = weatherData.daily.temperature_2m_max[i];
    tempMin.textContent = weatherData.daily.temperature_2m_min[i];
    temperature.appendChild(tempMax);
    temperature.appendChild(tempMin);
    card.appendChild(temperature);
  }
}
//add eventlistener for enter and click on button
cityInput.addEventListener('keypress', (event)=>{
  if (event.code === "Enter") {
    event.preventDefault();
    startWeather();
  }
});

button.addEventListener('click',function(){
  startWeather();
} )
