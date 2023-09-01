import { fourteeners } from "../../assets/14er";
import Clock from "./clock";

class Weather {
    constructor(container, coordinates) {
        this.container = container
        this.lat = coordinates.lat
        this.long = coordinates.long

        this.getWeather = this.getWeather.bind(this);
        this.getTime = this.getTime.bind(this);
        this.addWeatherCard = this.addWeatherCard.bind(this);
        this.addForecast = this.addForecast.bind(this);
        this.getWeather();
    }

    async getWeather() {
        let weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${this.lat},${this.long}&days=3&aqi=no&alerts=no`);

        let data = await weather.json();
        this.addWeatherCard(data)
        this.addForecast(data.forecast);
        // console.log(data)
    }

    addWeatherCard(weatherCardData) {
        console.log(weatherCardData)
        let card = document.createElement('div')
        card.classList.add('weather-card')
        let city = document.createElement('h2')

        let ul = document.createElement('ul')

        let temp = document.createElement('li')
        let wind = document.createElement('li')
        let humidity = document.createElement('li')
        let precipitation = document.createElement('li')
        let uvIndex = document.createElement('li')

        let time = document.createElement('div')
        time.classList.add('time')
        let timeLabel = document.createElement('span')
        timeLabel.innerText = 'Local Time: ';
        time.appendChild(timeLabel)
        let timeSlot = document.createElement('span')
        time.appendChild(timeSlot)

        new Clock(weatherCardData.location.tz_id, timeSlot)

        city.innerText = weatherCardData.location.name


        temp.innerHTML = `<span>Temperature:</span> ${weatherCardData.current.temp_f}℉ and ${weatherCardData.current.condition.text}`;
        wind.innerHTML = `<span>Wind:</span> ${weatherCardData.current.wind_mph} mph ${weatherCardData.current.wind_dir}`
        humidity.innerHTML = `<span>Humidity:</span> ${weatherCardData.current.humidity}`
        precipitation.innerHTML = `<span>Precipitation:</span> ${weatherCardData.current.precip_in} in`
        uvIndex.innerHTML = `<span>UV Index:</span> ${weatherCardData.current.uv}`

        let weatherLis = [temp, wind, humidity, precipitation, uvIndex]
        
        weatherLis.forEach(weatehrLi => {
            ul.appendChild(weatehrLi)
        })

        card.appendChild(city)
        card.appendChild(ul)
        card.appendChild(time)

        this.container.innerHTML = ""
        this.container.appendChild(card)
    }

    getTime(timeString) {
        let date = new Date(timeString)
        let hour = date.getHours()
        let mins = date.getMinutes()

        return `${hour}:${mins}`
    }

    forcastCard(weatherData) {

    }

    addForecast(weatherData) {
        // console.log(weatherData.forecastday)
        let forecast = document.querySelector('.weather-forecast')
        let day1 = document.createElement('div')
        let day2 = document.createElement('div')
        let day3 = document.createElement('div')
        let days = [day1, day2, day3]

        weatherData.forecastday.forEach((dayData, i) => {

            let temp = document.createElement('p')
            let lowTemp = document.createElement('p')
            let avgHumidity = document.createElement('p')
            let precipitation = document.createElement('p')
            let chanceOfSnow = document.createElement('p')
            let wind = document.createElement('p')
            let uv = document.createElement('p')
            
            temp.innerText = `High: ${dayData.day.maxtemp_f}℉, Low: ${dayData.day.mintemp_f}℉`
            wind.innerText = `Wind speeds up to: ${dayData.day.maxwind_mph} mph`
            avgHumidity.innerText = `Avg Humidity: ${dayData.day.avghumidity}`
            precipitation.innerText = `Chance of Rain: ${dayData.day.daily_chance_of_rain}%`
            
            let dayPoints = [temp, wind, avgHumidity, precipitation]

            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

            let dayNum = new Date(dayData.date).getUTCDay()
            let dayName = document.createElement('h2')
            dayName.innerText = `${dayNames[dayNum]}`

            days[i].appendChild(dayName);

            dayPoints.forEach(point => {
                
                days[i].appendChild(point)
            })
        })

        forecast.innerHTML = ''
        days.forEach(day => {
            day.classList.add('forecast-card')
            forecast.appendChild(day)
        })
    }

}

export default Weather;