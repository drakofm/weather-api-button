let button = document.querySelector('button');
button.addEventListener('click', async () => {
  const divElem = document.querySelector('div');
  divElem.style.opacity = 1;
  divElem.textContent = 'Loading.'
  const loadingInterval = setInterval(() => {divElem.textContent = divElem.textContent + '.'}, 1000);
  const resultObject = await getWeather();
  const div = document.createElement('div');
  clearInterval(loadingInterval);
  divElem.remove();
  const currHour = Math.floor(Date.now() / 1000 / 60 / 60 % 24 + 3);
  const currMinute = Math.floor(Date.now() / 1000 / 60 % 60);
  const currIndex = (currHour * 4) + Math.floor(currMinute / 15);
  div.innerHTML = `
  <i>Now in Moscow (${currHour < 10 ? '0' + currHour : currHour}:${currMinute < 10 ? '0' + currMinute : currMinute}):</i><br>
  Temperature: <b>${resultObject.minutely_15.temperature_2m[currIndex]} °C</b><br>
  Relative humidity: <b>${resultObject.minutely_15.relative_humidity_2m[currIndex]}%</b><br>
  Wind speed: <b>${resultObject.minutely_15.wind_speed_10m[currIndex]} m/s<b/>`;
  document.querySelector('main').append(div);
});

async function getWeather() {
  const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=55.7558&longitude=37.6173&minutely_15=temperature_2m,relative_humidity_2m,wind_speed_10m&wind_speed_unit=ms&forecast_days=1");
  return response.json();
};