const cityInput = document.querySelector('#city-input');
const search = document.querySelector('#search');
const weatherIcon = document.querySelector('#icon');

search.addEventListener('click', () => {
	const cityName = cityInput.value;
	callWeatherAPI(cityName)
		.then((data) => {
			console.log(data);
			displayForecast(data);
		})
		.catch((error) => {
			console.log('Button error: ' + error);
			document.querySelector('#app').style.display = 'none';
			document.querySelector('#placeholder').style.display = 'none';
			document.querySelector('#no-result').style.display = 'flex';
		});
});

function displayForecast(data) {
	document.querySelector('#app').style.display = 'block';
	document.querySelector('#placeholder').style.display = 'none';
	document.querySelector('#no-result').style.display = 'none';

	document.querySelector('main .temp span').textContent = Math.round(data.main.temp);
	document.querySelector('main .condition').textContent = data.weather[0].main;
	document.querySelector('main .city-country').textContent = `${data.name}, ${data.sys.country}`;

	document.querySelector('.weather-info .feels span').innerHTML = `<span class="tmp">${Math.round(data.main.feels_like)}</span> <small class="sm">c</small>`;
	document.querySelector('.weather-info .wind span').innerHTML = `${Math.round(data.wind.speed)} <small class="sm">km/h</small>`;
	document.querySelector('.weather-info .humidity span').innerHTML = `${data.main.humidity} <small class="sm">%</small>`;
}

function kelvinToCelsius(temp) {
	const celsius = temp - 273.15;
	return Math.round(celsius);
}

async function callWeatherAPI(city) {
	const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={api_key}&units=metric`;

	try {
		const res = await fetch(api);

		const data = await res.json();
		return data;
	} catch (error) {
		console.error('API error: ' + error);
	}
}
