<script setup lang="ts">
import { useWeatherStore } from '../src/stores/weatherStore'
import NavigationBar from './components/NavigationBar.vue'
// import { computed } from 'vue'

const computedHour = (unix: number) => {
    const hour = (new Date(unix * 1000).getHours() - 1).toString()
    return hour.length == 1 ? '0' + hour : hour
}

const storeWeather = useWeatherStore()
</script>

<template>
    <NavigationBar />
    <main>
        <div class="main-content">
            <span class="location"
                >{{ storeWeather.forecast.city.name }}, {{ storeWeather.forecast.city.country }}
            </span>

            <div class="container">
                <img :src="'/weatherIcons/' + storeWeather.weather.weather[0].icon + '.webp'" alt="asd" />
                <span class="temp">{{ Math.round(storeWeather.weather.main.temp) }}</span>
            </div>
            <span class="description">{{ storeWeather.weather.weather[0].description }}</span>
        </div>
        <div class="conditions">
            <div class="condition">
                <div class="title--wrapper">
                    <img src="./assets/icons/humidity_percentage_FILL0_wght200_GRAD0_opsz48.svg" alt="" />
                    <span class="title">Humidity</span>
                </div>
                <span class="value">{{ storeWeather.weather.main.humidity }}%</span>
            </div>
            <div class="condition">
                <div class="title--wrapper">
                    <img src="./assets/icons/compress_FILL0_wght200_GRAD0_opsz48.svg" alt="" />
                    <span class="title">Pressure</span>
                </div>
                <span class="value">{{ storeWeather.weather.main.pressure }} hPa</span>
            </div>
            <div class="condition">
                <div class="title--wrapper">
                    <img src="./assets/icons/thermometer_FILL0_wght200_GRAD0_opsz48.svg" alt="" />
                    <span class="title">Feels Like</span>
                </div>
                <span class="value">{{ storeWeather.weather.main.feels_like }}°</span>
            </div>
            <div class="condition">
                <div class="title--wrapper">
                    <img src="./assets/icons/air_FILL0_wght200_GRAD0_opsz48.svg" alt="" />
                    <span class="title">Wind Speed</span>
                </div>
                <span class="value">{{ Math.round(storeWeather.weather.wind.speed) }} km/h</span>
            </div>
            <div class="condition">
                <div class="title--wrapper">
                    <img src="./assets/icons/thermostat_FILL0_wght200_GRAD0_opsz48.svg" alt="" />
                    <span class="title">Min / Max</span>
                </div>
                <span class="value"
                    >{{ Math.round(storeWeather.weather.main.temp_min) }}°/{{
                        Math.round(storeWeather.weather.main.temp_max)
                    }}°</span
                >
            </div>
            <div class="condition">
                <div class="title--wrapper">
                    <img src="./assets/icons/visibility_FILL0_wght200_GRAD0_opsz48.svg" alt="" />
                    <span class="title">Visibility</span>
                </div>
                <span class="value">{{ storeWeather.weather.visibility / 1000 }} km</span>
            </div>
        </div>
        <div class="forecast">
            <div class="hour--details" v-for="(detail, index) in storeWeather.forecast.list.slice(0, 10)" :key="index">
                {{ computedHour(detail.dt) }}
                <!-- <img :src="`./assets/weatherIcons/${detail.weather[0].icon}.webp`" alt="asd" /> -->
                {{ Math.round(detail.main.temp) }}°
            </div>
        </div>
    </main>
    <!-- <img src="@/assets/weatherIcons/02d.webp" alt="" /> -->
</template>

<style scoped lang="scss">
main {
    display: flex;
    padding: 10px;
    min-width: 320px;
    justify-content: space-between;
    flex-flow: row wrap;
    gap: 20px;

    .main-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 300px;
        width: 100%;
        max-width: 480px;
        background: white;
        padding: 20px 0;
        justify-content: space-evenly;
        border-radius: 5px;

        .container {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 20px;
            width: 100%;
            height: 120px;

            .temp {
                font-size: 100px;
                font-weight: 300;
                text-shadow: 4px 4px 6px rgba(66, 68, 90, 0.2);

                &::after {
                    content: '°';
                    // position: absolute;
                }
            }
            img {
                width: 80px;
            }
        }

        .description {
            text-transform: capitalize;
            font-size: 20px;
            text-shadow: 4px 4px 6px rgba(66, 68, 90, 0.26);
        }
    }

    .conditions {
        display: grid;
        grid-template-columns: 1fr;
        gap: 15px;
        width: 100%;
        max-width: 480px;
        background: white;
        padding: 20px;
        border-radius: 5px;

        .condition {
            display: flex;
            flex-direction: row;
            gap: 40px;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgb(219, 219, 219);

            .title--wrapper {
                display: flex;
                align-items: center;
                gap: 10px;

                img {
                    width: 30px;
                }
                .title {
                    font-size: 15px;
                    color: rgb(112, 112, 112);
                }
            }

            .value {
                font-size: 18px;
            }
        }
    }

    .forecast {
        width: 100%;
        max-width: 480px;
        background: white;
        border-radius: 5px;
        display: flex;
        flex-flow: row nowrap;
        gap: 30px;
        padding: 20px;
        overflow-x: scroll;

        .hour--details {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            img {
                width: 32px;
            }
        }
    }
}
</style>
