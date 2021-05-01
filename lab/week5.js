

window.addEventListener('DOMContentLoaded', async function() {
  // Get a reference to the "get weather" button

    let getWeather = document.querySelector(`.get-weather`)

  // When the "get weather" button is clicked:

    getWeather.addEventListener(`click`, async function(event){

    // - Ignore the default behavior of the button

    event.preventDefault()

    // - Get a reference to the element containing the user-entered location

    let locationInput = document.querySelector(`#location`)

    // - Get the user-entered location from the element's value

    let location = locationInput.value

    //  Get a reference to the element containing the user-entered forecast days desired

    let daysInput = document.querySelector(`#days`)

    //  Get the user-entered forecast days desired from the element's value

    let days = daysInput.value

    // - Check to see if the user entered a location; if so:

    if(location.length > 0){

      // - Construct a URL to call the WeatherAPI.com API

      let url = `https://api.weatherapi.com/v1/forecast.json?key=6039be8c0d4c4cd9be412027213004&q=${location}&days=${days}`

      // - Fetch the url, wait for a response, store the response in memory
     
      let response = await fetch(url)
     
      // - Ask for the json-formatted data from the response, wait for the data, store it in memory

      let json = await response.json()

      // - Write the json-formatted data to the JavaScript console

      // - Store the interpreted location, current weather conditions, the forecast as three separate variables
      let APILocation = json.location
      let APICurrent = json.current
      let APIForecast = json.forecast


      // Display the interpreted location and current temp+weather conditions on the website

      let SiteLocation = document.querySelector(`.current`)

      SiteLocation.innerHTML = `
      <div class="mt-8">
      <div class="text-center space-y-2">
        <div class="location font-bold text-3xl">Current Weather for ${APILocation.name}, ${APILocation.region}, ${APILocation.country}</div>
        <div class="font-bold">
          <img src="https:${APICurrent.condition.icon}" class="inline-block">
          <span class="temperature">${APICurrent.temp_f}</span>° 
          and
          <span class="conditions">${APICurrent.condition.text}</span>
        </div>
      </div>
      </div>
      `
      
      // Create forecast display if user enters days

      if(days > 0){

      // Clear the forecast display

          let forecastTitle = document.querySelector(`.forecast`)

          forecastTitle.innerHTML = `
          <div class="space-y-4">
            <div class="text-center space-y-8">
              <div></div>
              <div></div>
              <div class="font-bold text-3xl">${days} Day Forecast</div>
            </div>
            <div></div>
            <div></div>
          </div>        
          `


          // Create a loop to sift through the API forecast data
          
                for(let i = 0; i < days; i++){

                    //Create variables for the desired data

                    let forecastDate = APIForecast.forecastday[i].date
                    let forecastMax = APIForecast.forecastday[i].day.maxtemp_f
                    let forecastMin = APIForecast.forecastday[i].day.mintemp_f
                    let forecastCondition = APIForecast.forecastday[i].day.condition.text
                    let forecastIcon = APIForecast.forecastday[i].day.condition.icon

                    // Check to make sure the data you need is pulled 
                    // console.log(forecastDate,forecastMax, forecastMin,forecastCondition,forecastIcon)

                    // Add forecast data to the website under the forecast

                    let SiteForecast = document.querySelector(`.forecast`)
                  
                    SiteForecast.insertAdjacentHTML(`beforeend`,`
                    <div class="text-center space-y-8 border-purple">
                        <img src="https:${forecastIcon}" class="mx-auto">
                        <h1 class="text-2xl text-bold text-purple-700">${forecastDate}</h1>
                        <h2 class="text-xl">High ${forecastMax} – Low ${forecastMin}</h2>
                        <p class="text-blue-500">${forecastCondition}</h1>
                        <div></div>
                        <div></div>
                    </div>
                    `)
                  }

                //
        }else{
            let forecastTitle = document.querySelector(`.forecast`)

            forecastTitle.innerHTML = `
              <div class="space-y-4">
                  <div class="text-center space-y-8">
                    <div></div>
                    <div></div>
                    <div class="text-2xl">No forecast requested.  If you would like
                    forecast data, please enter the numbers of days forecast you would like in the entry box above.</div>
                  </div>
              </div>        
            `
        }





    }
  })
})