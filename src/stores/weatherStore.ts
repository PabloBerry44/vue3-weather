import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weather', {
    state: () => {
        return {
            forecast: {
                city: {
                    name: 'Prague',
                    country: 'CZ',
                },
            },
            weather: {
                main: {
                    temp: 20,
                },
                weather: [
                    {
                        icon: '01d',
                    },
                ],
            },
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
