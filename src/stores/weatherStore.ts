import { defineStore } from 'pinia'

interface Wind {
    deg: number
    speed: number
}

interface SubWeatherItem {
    icon: string
    description: string
}

interface Weather {
    main: Main
    weather: SubWeatherItem[]
    visibility: number
    wind: Wind
}

interface City {
    name: string
    country: string
}

interface Main {
    temp: number
    humidity: number
    pressure: number
    feels_like: number
    temp_max: number
    temp_min: number
}

interface ForecastListItem {
    main: Main
    dt: number
    weather: SubWeatherItem[]
}

interface Forecast {
    city: City
    list: ForecastListItem[]
}

export const useWeatherStore = defineStore('weather', {
    state: () => {
        return {
            forecast: {
                city: {
                    name: 'Prague',
                    country: 'CZ',
                },
                list: [
                    {
                        main: {
                            temp: 20,
                        },
                        dt: 1674745200,
                        weather: [
                            {
                                icon: '02d',
                            },
                        ],
                    },
                ],
            } as unknown as Forecast,
            weather: {
                main: {
                    temp: 20,
                    humidity: 50,
                    pressure: 1025,
                    feels_like: 18,
                    temp_max: 23,
                    temp_min: 17,
                },
                weather: [
                    {
                        icon: '04d',
                        description: 'Clear Sky',
                    },
                ],
                wind: {
                    deg: 120,
                    speed: 5,
                },
                visibility: 10500,
            } as unknown as Weather,
        }
    },
    actions: {
        async fetchData(city: string) {
            const forecastResponse = await fetch(`/.netlify/functions/forecast?city=${city}`)
            const forecast = await forecastResponse.json()
            this.forecast = forecast
            console.log(forecast)

            const weatherResponse = await fetch(`/.netlify/functions/weather?city=${city}`)
            const weather = await weatherResponse.json()
            this.weather = weather
            console.log(weather)
        },
    },
})
