import { fourteeners } from "../../assets/14er";
import Clock from "./clock";
import weatherConditions from '../../assets/weather_conditions'

class Weather {
    constructor(container, coordinates) {
        this.container = container
        this.lat = coordinates.lat
        this.long = coordinates.long

        this.getWeather = this.getWeather.bind(this);
        this.getTime = this.getTime.bind(this);
        this.addWeatherCard = this.addWeatherCard.bind(this);
        this.addForecast = this.addForecast.bind(this);
        this.setCondition = this.setCondition.bind(this);
        this.getWeather();
    }

    async getWeather() {
        let weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${this.lat},${this.long}&days=5&aqi=no&alerts=no`);

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

    setCondition(conditionCode, day) {
        let icon = `${weatherConditions[conditionCode].icon}.png`
        // let dayOrNight = "day"
        // let now = new Date().toLocaleString('en-US', { timeZone: 'America/Denver' }).split(' ') // [ '9/1/2023,', '6:08:12', 'PM' ]
        // let timeNow = now[1]
        // let amPmNow = now[2]
        // let timeSunrise = sunrise.slice(' ')[0]
        // let amPmSunrise = sunrise.slice(' ')[1]
        // let timeSunset = sunset.slice(' ')[0]
        // let amPmSunset = sunset.slice(' ')[1]

        return `./assets/weatherIcons/64x64/${day}/${icon}`
    }

    addForecast(weatherData) {
        // console.log(weatherData.forecastday)
        let forecast = document.querySelector('.weather-forecast')
        let day1 = document.createElement('div')
        let day2 = document.createElement('div')
        let day3 = document.createElement('div')
        let day4 = document.createElement('div')
        let day5 = document.createElement('div')
        let days = [day1, day2, day3, day4, day5]

        weatherData.forecastday.forEach((dayData, i) => {

            let ul = document.createElement('ul')
            let temp = document.createElement('p')
            let avgHumidity = document.createElement('p')
            let precipitation = document.createElement('p')
            let wind = document.createElement('p')
            let uv = document.createElement('p')

            let heading = document.createElement('div')
            heading.classList.add('forecast-heading')
            let iconDay = document.createElement('img')
            let iconNight = document.createElement('img')
            iconDay.classList.add('weather-condition-icon')
            iconNight.classList.add('weather-condition-icon')
            iconDay.src = this.setCondition(dayData.day.condition.code, 'day')
            iconNight.src = this.setCondition(dayData.day.condition.code, 'night')
         



            temp.innerHTML = `<span>High:</span> ${dayData.day.maxtemp_f}℉, Low: ${dayData.day.mintemp_f}℉`
            wind.innerHTML = `<span>Wind speeds up to:</span> ${dayData.day.maxwind_mph} mph`
            avgHumidity.innerHTML = `<span>Avg Humidity:</span> ${dayData.day.avghumidity}`
            precipitation.innerHTML = `<span>Chance of Rain:</span> ${dayData.day.daily_chance_of_rain}%`
            uv.innerHTML = `<span>UV Index:</span> ${dayData.day.uv}%`
            
            
            let dayPoints = [temp, wind, avgHumidity, precipitation, uv]

            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

            let dayNum = new Date(dayData.date).getUTCDay()
            let dayName = document.createElement('h2')
            dayName.innerText = `${dayNames[dayNum]}`

            heading.appendChild(iconDay)
            heading.appendChild(dayName)
            heading.appendChild(iconNight)
            days[i].appendChild(heading);

            dayPoints.forEach(point => {
                
                ul.appendChild(point)
            })

            days[i].appendChild(ul)


        })

        forecast.innerHTML = ''
        days.forEach(day => {
            day.classList.add('forecast-card')
            forecast.appendChild(day)
        })
    }

}

export default Weather;