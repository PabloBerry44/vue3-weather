<script setup lang="ts">
import { useWeatherStore } from '../stores/weatherStore'
const storeWeather = useWeatherStore()
</script>

<template>
    <section class="conditions component-container">
        <div class="condition">
            <div class="title--wrapper">
                <img
                    src="../assets/icons/humidity_percentage_FILL0_wght200_GRAD0_opsz48.svg"
                    width="30"
                    height="30"
                    alt=""
                />
                <span class="title">Humidity</span>
            </div>
            <span class="value">{{ storeWeather.data.current.humidity }}%</span>
        </div>
        <div class="condition">
            <div class="title--wrapper">
                <img src="../assets/icons/compress_FILL0_wght200_GRAD0_opsz48.svg" width="30" height="30" alt="" />
                <span class="title">Pressure</span>
            </div>
            <span class="value">{{ storeWeather.data.current.pressure }} hPa</span>
        </div>
        <div class="condition">
            <div class="title--wrapper">
                <img src="../assets/icons/thermometer_FILL0_wght200_GRAD0_opsz48.svg" width="30" height="30" alt="" />
                <span class="title">Feels Like</span>
            </div>
            <span class="value">{{ Math.round(storeWeather.data.current.feels_like) }}°</span>
        </div>
        <div class="condition">
            <div class="title--wrapper">
                <img src="../assets/icons/air_FILL0_wght200_GRAD0_opsz48.svg" width="30" height="30" alt="" />
                <span class="title">Wind Speed</span>
            </div>
            <span class="value">{{ Math.round(storeWeather.data.current.wind_speed) }} km/h</span>
        </div>
        <div class="condition">
            <div class="title--wrapper">
                <img src="../assets/icons/thermostat_FILL0_wght200_GRAD0_opsz48.svg" width="30" height="30" alt="" />
                <span class="title">Min / Max</span>
            </div>
            <span class="value"
                >{{ Math.round(storeWeather.data.daily[0].temp.min) }}°/
                {{ Math.round(storeWeather.data.daily[0].temp.max) }}°
            </span>
        </div>
        <div class="condition">
            <div class="title--wrapper">
                <img src="../assets/icons/visibility_FILL0_wght200_GRAD0_opsz48.svg" width="30" height="30" alt="" />
                <span class="title">Visibility</span>
            </div>
            <span class="value">{{ storeWeather.data.current.visibility / 1000 }} km</span>
        </div>
    </section>
</template>

<style scoped lang="scss">
.conditions {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 20px;

    .condition {
        display: flex;
        flex-direction: row;
        gap: 40px;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--light-accent);
        color: var(--p-text);

        .title--wrapper {
            display: flex;
            align-items: center;
            gap: 10px;

            img {
                width: 30px;
            }
            .title {
                font-size: 15px;
                color: var(--s-text);
            }
        }
    }
}
</style>
