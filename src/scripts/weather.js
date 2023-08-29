import { fourteeners } from "../../assets/14er";

class Weather {
    constructor(container, coordinates) {
        this.container = container
        this.lat = coordinates.lat
        this.long = coordinates.long

        this.getWeather = this.getWeather.bind(this);
        this.addWeather = this.addWeather.bind(this);
        this.addForecast = this.addForecast.bind(this);
        this.getWeather();
    }

    async getWeather() {
        let weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${this.lat},${this.long}&days=3&aqi=no&alerts=no`);

        let data = await weather.json();
        this.addWeather(data);
        this.addForecast(data.forecast);
        // console.log(data)
    }

    addWeather(weatherData) {
        let town = document.createElement('p')
        let temp = document.createElement('p')
        let condition = document.createElement('p')
        let windSpeed = document.createElement('p')
        let windDirection = document.createElement('p')
        let gusts = document.createElement('p')
        let humidity = document.createElement('p')
        let precipitation = document.createElement('p')
        let pressure = document.createElement('p')
        let uv = document.createElement('p')

        town.innerText = `Peak/Nearest Town: ${weatherData.location.name}`
        temp.innerText = `Temperature: ${weatherData.current.temp_f}℉, ${weatherData.current.temp_c}℃`;
        condition.innerText = `Conditions: ${weatherData.current.condition.text}`;
        windSpeed.innerText = `Wind Speed: ${weatherData.current.wind_mph} mph, ${weatherData.current.wind_kph} kph`;
        windDirection.innerText = `Wind Direction: ${weatherData.current.wind_dir}`;
        gusts.innerText = `Gusts up to: ${weatherData.current.gust_mph} mph, ${weatherData.current.gust_kph} kph`;
        humidity.innerText = `Humidity: ${weatherData.current.humidity}`;
        precipitation.innerText = `Precipitation: ${weatherData.current.precip_in} in, ${weatherData.current.precip_mm} mm`;
        pressure.innerText = `Atmospheric Pressure: ${weatherData.current.pressure_in} in, ${weatherData.current.pressure_mb} mb`
        uv.innerText = `UV Index: ${weatherData.current.uv}`

        let weatherPoints = [
            town,
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

    weatherCard() {
        let card = document.createElement('div')
    }

    addForecast(weatherData) {
        console.log(weatherData.forecastday)
        let forecast = document.querySelector('.weather-forecast')
        let day1 = document.createElement('div')
        let day2 = document.createElement('div')
        let day3 = document.createElement('div')
        let days = [day1, day2, day3]

        weatherData.forecastday.forEach((dayData, i) => {

            let highTemp = document.createElement('p')
            let lowTemp = document.createElement('p')
            let avgHumidity = document.createElement('p')
            let chanceOfRain = document.createElement('p')
            let chanceOfSnow = document.createElement('p')
            let wind = document.createElement('p')
            let uv = document.createElement('p')
            
            highTemp.innerText = `High: ${dayData.day.maxtemp_f}℉, ${dayData.day.maxtemp_c}℃. Low: ${dayData.day.mintemp_f}℉, ${dayData.day.mintemp_c}℃.`
            
            let dayPoints = [highTemp]

            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

            let dayNum = new Date(dayData.date).getUTCDay()
            let dayName = document.createElement('p')
            dayName.innerText = `${dayNames[dayNum]}`

            days[i].appendChild(dayName);

            dayPoints.forEach(point => {
                
                days[i].appendChild(point)
            })
        })
        forecast.innerHTML = ''
        days.forEach(day => {
            forecast.appendChild(day)
        })
    }

}

export default Weather;