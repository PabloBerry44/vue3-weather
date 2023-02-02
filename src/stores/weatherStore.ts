import router from '@/router'
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

interface Current {
    dt: number
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    uvi: number
    visibility: number
    weather: WeatherArrayItem[]
    wind_speed: number
}

interface Geo {
    country: string
    name: string
}

interface Daily {
    dt: number
    temp: Temp
    weather: WeatherArrayItem[]
}

interface Data {
    // 0: Geo
    current: Current
    daily: Daily[]
    hourly: Current[]
}

export const useWeatherStore = defineStore('weather', {
    state: () => {
        return {
            loaded: false,
            data: {
                // 0: {
                //     country: 'ES',
                //     name: 'Seville',
                // },
                current: {
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
                daily: [
                    {
                        dt: 1675368000,
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
            } as unknown as Data,
        }
    },
    actions: {
        async fetchData(city: string) {
            this.loaded = false
            city = city.replace(/-/g, ' ')

            //starte here

            const response = await fetch(`/.netlify/functions/callAPI?city=${city}`)
            console.log(response)
            const data = await response.json()
            this.data = data
            console.log(data)

            // end ther heh hr ehhe he

            router.push(city.replace(/ /g, '-'))
            this.loaded = true

            //change document title
            const cityArray = city.split(' ')
            let title = ''
            for (let word of cityArray) {
                word = word[0].toUpperCase() + word.slice(1)
                title += word + ' '
            }
            document.title = title
        },
    },
})
