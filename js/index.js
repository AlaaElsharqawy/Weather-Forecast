let searchInp = document.getElementById("searchInput");
let weatherArea = document.getElementById("card-area");
let allData = [];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeather, showError);
  } else {
    alert(" Not Supported by this browser.");
  }
}
function showWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getCityLocation(lat, lon);
}

function showError(error) {
  if (error.code === error.PERMISSION_DENIED) {
    getWeather("cairo");
  } else {
    alert("Not location.");
  }
}

async function getCityLocation(lat, lon) {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=8fc59076eb5d45cfa3063235241312&q=${lat},${lon}&days=3`
    );

    

    let data = await response.json();
    allData = data;
    console.log(allData);

    displayWeather(allData);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getWeather(country) {
  try {
    let response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=8fc59076eb5d45cfa3063235241312&q=${country}&days=3`
    );

   

    let data = await response.json();
    allData = data;
    displayWeather(allData);
  } catch (error) {
    console.error("Error :", error);
  }
}



const today = new Date();
console.log(days[today.getDay() + 3] );


function displayWeather(allData) {
  let cartona = `


   <div class="col">
            <div class="card h-100 border-0">
              <div
                class="card-header d-flex justify-content-between align-items-center"
              >
                <h5 class="today">${days[today.getDay()]}</h5>
                <h5 class="date">${[today.getDate()]}${months[today.getMonth()]}</h5>
    

              </div>

              <div class="card-body">
                <h2 class="city mt-5 fs-4">${allData.location.name}</h2>
                <div class="d-flex align-items-center justify-content-between">
                  <p class="display-2 fw-bold">${
                    allData.current.temp_c
                  }<sup>o</sup>C</p>
                  <img
                    src="https:${allData.current.condition.icon}"
                    alt="status weather"
                    width="100px"
                  />
                </div>
                <p class="statu mt-3 fs-6 text-info">${
                  allData.current.condition.text
                }</p>

                <div class="wind px-4 mt-5 mb-3 ">
                  <span class="me-4"
                    ><i class="fa-solid fa-umbrella me-2 "></i>
                     ${allData.current.feelslike_c}%</span
                  >
                  <span class="me-4"
                    ><i class="fa-solid fa-wind me-2 "></i>  ${
                      allData.current.feelslike_f
                    }km/h</span>
                  <span 
                    ><i class="fa-solid fa-compass me-2 "> ${
                      allData.current.wind_dir
                    }</i>
                    </span
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="myCard card h-100 text-center border-0">
              <div
                class="card-header d-flex justify-content-center align-items-center"
              >
                <h5 class="tomorrow">${days[(today.getDay()+1)%7]}</h5>
              </div>

              <div class="card-body px-4">
                <img   src="https:${
                  allData.forecast.forecastday[1].day.condition.icon
                }" alt="status weather" width="100px" />
                <p class="fs-2 fw-bold mb-0 mt-4"> ${
                  allData.forecast.forecastday[1].day.maxtemp_c
                }  <sup>o</sup>C</p>
                <small class="fs-5 opacity-75"> ${
                  allData.forecast.forecastday[1].day.mintemp_c
                } <sup>o</sup></small>
                <p class="statu mt-4 fs-6 text-info">${
                  allData.forecast.forecastday[1].day.condition.text
                }</p>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 text-center border-0">
              <div
                class="card-header d-flex justify-content-center align-items-center"
              >
                 
                <h5 class="afterTomorrow">${days[(today.getDay() + 2) % 7]}</h5>
              </div>

              <div class="card-body px-4">
                <img src="https:${
                  allData.forecast.forecastday[2].day.condition.icon
                }" alt="status weather" width="100px" />
                <p class="fs-2 fw-bold mb-0 mt-4">${
                  allData.forecast.forecastday[2].day.maxtemp_c
                }<sup>o</sup>C</p>
                <small class="fs-5 opacity-75">${
                  allData.forecast.forecastday[2].day.mintemp_c
                }<sup>o</sup></small>
                <p class="statu mt-4 fs-6 text-info">${
                  allData.forecast.forecastday[2].day.condition.text
                }</p>
              </div>
            </div>
          </div>



`;

  weatherArea.innerHTML = cartona;
}
getLocation();

searchInput.addEventListener("input", function () {
  getWeather(searchInput.value);
});
