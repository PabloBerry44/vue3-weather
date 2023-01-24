import { defineStore } from 'pinia'

interface Product {
    id: number
    name: string
    price: number
    image: string
    quantity: number
}

interface CartDetails {
    searchValue: string
    products: Product[]
    shipmentDetails: {
        company: boolean
        companyName: string
        nipNumber: string
        email: string
        firstName: string
        lastName: string
        voiv: string
        address: string
        post: string
        city: string
        phone: string
        payment: string
        payWithCard: boolean
        cardNumber: number
        cardFullName: string
        cardMM: number
        cardYY: number
        CVV: number
        promoCode: string
        shipmentFilled: boolean
    }
}

export const useWeatherStore = defineStore('weather', {
    state: () => {
        return {
            searchValue: '',
            products: [],
            shipmentDetails: {},
        } as unknown as CartDetails
    },
    actions: {
        async getForecast(city: string) {
            const response = await fetch(`/.netlify/functions/forecast?city=${city}`)
            const data = await response.json()
            console.log(data)
        },
    },
})
