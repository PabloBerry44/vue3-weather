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
    0: Geo
    current: Current
    daily: Daily[]
    hourly: Current[]
    timezone_offset: number
}

export const useWeatherStore = defineStore('weather', {
    state: () => {
        return {
            theme: 'light',
            loaded: false,
            data: {
                0: {
                    country: 'ES',
                    name: 'Seville',
                },
                current: {
                    dt: 1675267200,
                    feels_like: 15,
                    humidity: 80,
                    pressure: 1020,
                    sunrise: 1675586114,
                    sunset: 1675633104,
                    temp: 18,
                    uvi: 3,
                    visibility: 10000,
                    weather: [
                        {
                            description: 'Cloudy',
                            icon: '03d',
                            main: 'Clouds',
                        },
                    ],
                    wind_speed: 13,
                    wind_deg: 50,
                },
                daily: [
                    {
                        dt: 1675368000,
                        pop: 0,
                        rain: 0,
                        temp: {
                            min: 10,
                            max: 15,
                        },
                        weather: [
                            {
                                description: 'Cloudy',
                                icon: '03d',
                                main: 'Clouds',
                            },
                        ],
                    },
                ],
                hourly: [
                    {
                        dt: 1675267200,
                        feels_like: 15,
                        humidity: 80,
                        pressure: 1020,
                        temp: 18,
                        uvi: 3,
                        visibility: 10000,
                        weather: [
                            {
                                description: 'Cloudy',
                                icon: '03d',
                                main: 'Clouds',
                            },
                        ],
                        wind_speed: 13,
                    },
                ],
                timezone_offset: 0,
            } as unknown as Data,
        }
    },
    actions: {
        async fetchData(city: string) {
            this.loaded = false
            city = city.replace(/-/g, ' ')

            const response = await fetch(`/.netlify/functions/fetchApi?city=${city}`)
            const data = await response.json()
            this.data = data
            console.log(data)

            this.loaded = true

            // change document title
            const cityArray = city.split(' ')
            let title = ''
            for (let word of cityArray) {
                word = word[0].toUpperCase() + word.slice(1)
                title += word + ' '
            }
            document.title = title
        },
        saveLocally() {
            window.localStorage.setItem('theme', this.theme)
        },
        getLocalValues() {
            if (window.localStorage.getItem('theme') == null) return

            this.theme = String(window.localStorage.getItem('theme'))
        },
    },
})
