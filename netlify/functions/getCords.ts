import axios from 'axios'
require('dotenv').config()

exports.handler = async function (event, context, callback) {
    const city = event.queryStringParameters.city
    const apiKey = process.env.weatherKEY

    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`

    try {
        const { data } = await axios.get(apiUrl)

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
