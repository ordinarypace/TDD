const WeatherService = {fetchCurrentTemperature : fetchCurrentTemperature};

const fetchCurrentTemperature = () => {
    return fetch('someweatherapi.com').then((res) => {
        return response.json();
    }).then((data) => {
        return data.temperature;
    });
}
