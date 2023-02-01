import router from '@/router'
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
    dt_txt: string
    weather: SubWeatherItem[]
}

interface Forecast {
    city: City
    list: ForecastListItem[]
}

export const useWeatherStore = defineStore('weather', {
    state: () => {
        return {
            loaded: false,
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
                        dt_txt: '',
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
            groupedDays: [
                {
                    id: 0,
                    hours: [
                        {
                            main: {
                                temp: 20,
                            },
                            dt: 1674745200,
                            dt_txt: '',
                            weather: [
                                {
                                    icon: '02d',
                                },
                            ],
                        },
                    ] as unknown as ForecastListItem,
                },
            ],
        }
    },
    actions: {
        async fetchData(city: string) {
            this.loaded = false
            city = city.replace(/-/g, ' ')

            //starte here

            const response = await fetch(`/.netlify/functions/callAPI?city=${city}`)
            const data = await response.json()
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
