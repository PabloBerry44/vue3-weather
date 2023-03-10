import axios from 'axios'
require('dotenv').config()

exports.handler = async function (event) {
    const lat = event.queryStringParameters.lat
    const lon = event.queryStringParameters.lon
    const apiKey = process.env.API_KEY

    try {
        const { data } = await axios.get(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
        )

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
