const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentweatherE1 = document.getElementById('current-weather');
const timezone = document.getElementById('time-zone');
const countryE1 = document.getElementById('country');
const futureforecastE1 = document.getElementById('weather-forecast');
const currenttempE1 = document.getElementById('current-temp');
const currtempE1 = document.getElementById('cont');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const API_KEY = 'd35f21b8a0950f428b557bfb3cf15526';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const format12hr = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeE1.innerHTML = (format12hr < 10 ? '0' + format12hr : format12hr) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`
    dateE1.innerHTML = days[day] + ', ' + date + ' ' + months[month]
}, 1000);

getweatherdata()
function getweatherdata() {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
            weatherdata(data);
        })
    })
}

function weatherdata(data) {
    let { sunrise, sunset, humidity, wind_speed, pressure, dew_point, temp } = data.current;

    timezone.innerHTML = data.timezone;
    countryE1.innerHTML = data.lat + 'N ' + data.lon+'E'

    currtempE1.innerHTML = 
    `<img src="http://openweathermap.org/img/wn/10d@4x.png" alt="Weather" class="weather-icon">
    <div class="curr-temp"> ${temp}&#176; C</div>`


    currentweatherE1.innerHTML =
    `<div class="Weather-items">
      <div>Sunrise</div>
      <div>${window.moment(sunrise * 1000).format('HH:mm ')}</div>
    </div>
    <div class="Weather-items">
      <div>Sunset</div>
      <div>${window.moment(sunset * 1000).format('HH:mm ')}</div>
    </div>
    <div class="Weather-items">
      <div>Humidity</div>
      <div>${humidity}%</div>
    </div>
    <div class="Weather-items">
      <div>Wind Speed</div>
      <div>${wind_speed}KM/h</div>
    </div>
    <div class="Weather-items">
      <div>Pressure</div>
      <div>${pressure}mbar</div>
    </div>
    <div class="Weather-items">
      <div>Dew Point</div>
      <div>${dew_point}&#176;</div>
    </div>`;
    
    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
          currenttempE1.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
            </div>
            
            `
        }
    })


    

}


