const api_key = '' //Paste your api Key here!

const fetchWeatherData = async (api_key, city) => {
  try {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`)
    const data = await response.json()

    if(data.message === "city not found") {
      alert("City couldnt be found!")
    }

    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const cityName = data.name
    const weather = data.weather[0].main;

    updateWeahterUI(temperature, cityName, humidity, windSpeed, weather)
    

  } catch {
    console.log("Something went wrong...");
    console.error(error)
  }
  

}

const updateWeahterUI = (temp, cityName, humidity, windSpeed, weather) => {

  document.getElementById('main-info').style.display = 'block';
  document.getElementById('description').style.display = 'flex';
  document.getElementById('p_temp').innerHTML = Math.round(temp)+ '°C'
  document.getElementById('p_name').innerHTML = cityName
  document.getElementById('p_humi').innerHTML = humidity + "%"
  document.getElementById('p_wspeed').innerHTML = windSpeed.toFixed(1) + ' km/h'
  document.getElementById('weatherCondition').innerHTML = weather
 
}

document.addEventListener('DOMContentLoaded', () => {
  const cityForm = document.getElementById('cityForm')
  
  cityForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const cityInput = document.getElementById('cityInput').value.trim()
    if(cityInput != "") {
      fetchWeatherData(api_key, cityInput)
    } else {
      alert("Please, type something in the form! ")
    }


  })
})