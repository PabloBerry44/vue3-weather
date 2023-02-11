import { defineStore } from 'pinia'

interface WeatherArrayItem {
    description: string
    icon: string
    main: string
}

interface Temp {
    min: number
    max: number
}

interface Geo {
    country: string
    name: string
}

interface Current {
    dt: number
    feels_like: number
    humidity: number
    pressure: number
    sunrise: number
    sunset: number
    temp: number
    uvi: number
    visibility: number
    weather: WeatherArrayItem[]
    wind_speed: number
    wind_deg: number
}

interface Daily {
    dt: number
    pop: number
    rain: number
    temp: Temp
    weather: WeatherArrayItem[]
}

interface Data {
    geo: Geo
    current: Current
    daily: Daily[]
    hourly: Current[]
    timezone_offset: number
}

interface City {
    country: string
    lat: number
    lon: number
    name: string
    state: string
}

export const useWeatherStore = defineStore('weather', {
    state: () => {
        return {
            cityList: [] as City[],
            showList: false,
            loaded: false,
            error: false,
            geo: {} as Geo,
            data: {} as Data,
        }
    },
    actions: {
        async fetchData(lat: string, lon: string) {
            this.loaded = false
            const response = await fetch(`/.netlify/functions/fetchApi?lat=${lat}&lon=${lon}`)

            if (response.ok) {
                const data = await response.json()
                this.data = data
                this.error = false
            } else {
                console.log('error')
                this.error = true
            }
            this.loaded = true
        },
        async getCityList(city: string) {
            const response = await fetch(`/.netlify/functions/getCityList?city=${city}`)
            const data = await response.json()
            // this.cityList = [
            //     ...new Map(
            //         data.map((city: { country: string; lat: number; lon: number; name: string; state: string }) => [
            //             JSON.stringify([city.name, city.state, city.country]),
            //             city,
            //         ]),
            //     ).values(),
            // ]
            this.cityList = data
            this.showList = true
        },
    },
})
