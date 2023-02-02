import axios from 'axios'
require('dotenv').config()

exports.handler = async function (event) {
    const city = event.queryStringParameters.city
    const apiKey = process.env.weatherKEY

    const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`

    try {
        const geoResponse = await axios.get(geoURL)

        const { data } = await axios.get(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${geoResponse.data[0].lat}&lon=${geoResponse.data[0].lon}&units=metric&appid=${apiKey}`,
        )

        // const response = {
        //     ...data,
        //     ...geoResponse.data,
        // }

        JSON.stringify(data)

        console.log(data)

        return {
            statusCode: 200,
            body: data,
        }
    } catch (error) {
        const { status, statusText, headers, data } = error.response
        return {
            statusCode: status,
            body: JSON.stringify({ status, statusText, headers, data }),
        }
    }
}
