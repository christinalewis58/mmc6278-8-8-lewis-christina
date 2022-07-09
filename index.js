//Declare global variables
var URL = "https://api.openweathermap.org/data/2.5/weather"
var weatherSection = document.getElementById('weather')
var weatherSearch = document.getElementById('weather-search')
var form = document.querySelector('form')

//After submitting the form, the app should make a call to the Open Weather API's current weather endpoint using the JavaScript fetch API to obtain current weather data based on the location entered by the user.
form.onsubmit = function(e) {
    e.preventDefault() //prevent form submission
    var userInput = weatherSearch.value
    var queryString = "?units=imperial&appid=a40cc918123a2696b673b052486363a6=" + userInput
    var newURL = URL + queryString //concatenate url
    
    if (!userInput) return
    /*fetch(newURL)
    .then(function(res){ 
        if (res.status !== 200) throw new Error('Location Not Found') //Handle incorrect input/location not found
        return res.json()
    })
    .catch(function(err){
        weatherSection.innerHTML = err.message
        weatherSearch.value = ""
    })*/
    var res = {
        "coord": {
          "lon": -122.08,
          "lat": 37.39
        },
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
          }
        ],
        "base": "stations",
        "main": {
          "temp": 80.03,
          "feels_like": 86.07,
          "temp_min": 280.37,
          "temp_max": 284.26,
          "pressure": 1023,
          "humidity": 100
        },
        "visibility": 10000,
        "wind": {
          "speed": 1.5,
          "deg": 350
        },
        "clouds": {
          "all": 1
        },
        "dt": 1560350645,
        "sys": {
          "type": 1,
          "id": 5122,
          "message": 0.0139,
          "country": "US",
          "sunrise": 1560343627,
          "sunset": 1560396563
        },
        "timezone": -25200,
        "id": 420006353,
        "name": "Mountain View",
        "cod": 200
        }
        displayData(res)
}

//Display the fetched data in the weather section
function displayData(res) {

weatherSection.innerHTML = ""
  //1.The city and country code
var city = document.createElement('h2')
city.textContent = res.name + ", " + res.sys.country
weatherSection.appendChild(city)

//2.A Google Maps link to the location

var map = document.createElement('a')
map.textContent = "Click to view map"
map.href = 'https://www.google.com/maps/search/?api=1&query=' + res.coord.lat + "," + res.coord.lon
map.target = '_blank'
weatherSection.appendChild(map)

//3.A weather icon representing the current weather 

var icon = document.createElement('img')
icon.src = 'https://openweathermap.org/img/wn/' + res.weather[0].icon + '@2x.png'
weatherSection.appendChild(icon)
//4.A description of the current weather condition

var weatherDescription = document.createElement('p')
weatherDescription.textContent = res.weather[0].description
weatherSection.appendChild(weatherDescription)
//5.The actual temperature

var currentTemp = document.createElement('p')
currentTemp.innerHTML = 'Current: ' + res.main.temp + '&deg;' + ' F'
weatherSection.appendChild(currentTemp) 
//6.The Perceived Temperature

//7. The time the weather information was last updated

var lastUpdated = document.createElement('p')
var date = new Date(res.dt * 1000)
var timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  })
lastUpdated.textContent = timeString
weatherSection.appendChild(lastUpdated)
console.log(date)

}

//create function display error message