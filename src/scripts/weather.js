import { fourteeners } from "../../assets/14er";

class Weather {
    constructor(container, coordinates) {
        this.container = container
        this.lat = coordinates.lat
        this.long = coordinates.long

        this.getWeather = this.getWeather.bind(this);
        this.addWeather = this.addWeather.bind(this);
        this.getWeather();
    }

    async getWeather() {
        let weather = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${this.lat},${this.long}&aqi=no`);

        let data = await weather.json();
        // this.location = data.location
        this.currentWeatherData = data.current;
        this.addWeather(this.currentWeatherData);
        console.log(this.currentWeatherData);
        console.log(data.location)
    }

    addWeather(weatherData) {
        let temp = document.createElement('p')
        let condition = document.createElement('p')
        let windSpeed = document.createElement('p')
        let windDirection = document.createElement('p')
        let gusts = document.createElement('p')
        let humidity = document.createElement('p')
        let precipitation = document.createElement('p')
        let pressure = document.createElement('p')
        let uv = document.createElement('p')

        temp.innerText = `Temperature: ${weatherData.temp_f}℉, ${weatherData.temp_c}℃`;
        condition.innerText = `Conditions: ${weatherData.condition.text}`;
        windSpeed.innerText = `Wind Speed: ${weatherData.wind_mph} mph, ${weatherData.wind_kph} kph`;
        windDirection.innerText = `Wind Direction: ${weatherData.wind_dir}`;
        gusts.innerText = `Gusts up to: ${weatherData.gust_mph} mph, ${weatherData.gust_kph} kph`;
        humidity.innerText = `Humidity: ${weatherData.humidity}`;
        precipitation.innerText = `Precipitation: ${weatherData.precip_in} in, ${weatherData.precip_mm} mm`;
        pressure.innerText = `Atmospheric Pressure: ${weatherData.pressure_in} in, ${weatherData.pressure_mb} mb`
        uv.innerText = `UV Index: ${weatherData.uv}`

        let weatherPoints = [
            temp,
            condition,
            windSpeed,
            windDirection,
            gusts,
            humidity,
            precipitation,
            pressure,
            uv
        ]

        this.container.innerHTML = ""
        
        weatherPoints.forEach(point => {
            this.container.appendChild(point)
        })

    }

}

export default Weather;