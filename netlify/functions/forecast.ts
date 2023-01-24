import axios from 'axios'

const handler = async () => {
    const apiKey = process.env.weatherKEY
    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Prague&appid=' + apiKey

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

module.exports = { handler }
