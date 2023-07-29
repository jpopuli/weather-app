const cityInput = document.querySelector('#city-input');
const search = document.querySelector('#search');
const weatherIcon = document.querySelector('#icon');

search.addEventListener('click', () => {
	const cityName = cityInput.value;
	callWeatherAPI(cityName)
		.then((data) => {
			console.log(data);
			const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
			document.querySelector('#temperature').textContent = kelvinToCelsius(data.main.temp);
			document.querySelector('#city').textContent = cityName;
			document.querySelector('#country').textContent = data.sys.country;
			document.querySelector('#condition').textContent = data.weather[0].main;
		})
		.catch((error) => {
			console.error(error);
		});
});

function kelvinToCelsius(temp) {
	const celsius = temp - 273.15;
	return Math.round(celsius);
}

async function callWeatherAPI(city) {
	const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6de91a508777a5ca54936b8228dee0cc`;

	try {
		const res = await fetch(api);

		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}
