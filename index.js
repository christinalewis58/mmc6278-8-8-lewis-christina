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
    fetch(newURL)
    .then(function(res){ 
        if (res.status !== 200) throw new Error('Location Not Found') //Handle incorrect input/location not found
        return res.json()
    })
    .catch(function(err){
        weatherSection.innerHTML = err.message
        weatherSearch.value = ""
    })
}

