import axios from 'axios'
require('dotenv').config()

exports.handler = async function (event) {
    const city = event.queryStringParameters.city
    const apiKey = process.env.API_KEY

    const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`

    try {
        const { data } = await axios.get(geoURL)

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        }
    } catch (error) {
        const { status, statusText, headers, data } = error.response
        return {
            statusCode: status,
            body: JSON.stringify({ status, statusText, headers, data }),
        }
    }
}
