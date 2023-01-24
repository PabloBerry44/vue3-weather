<script setup lang="ts">
import { useWeatherStore } from '../src/stores/weatherStore'
import NavigationBar from './components/NavigationBar.vue'

const storeWeather = useWeatherStore()
</script>

<template>
    <NavigationBar />
    <main>
        <div class="main-content">
            <span class="location"
                >{{ storeWeather.forecast.city.name }}, {{ storeWeather.forecast.city.country }}</span
            >
            <span class="temp">{{ Math.round(storeWeather.weather.main.temp) }}</span>
            <img :src="`./src/assets/weather-icons/${storeWeather.weather.weather[0].icon}.svg`" alt="asd" />
        </div>
    </main>
</template>

<style scoped lang="scss">
main {
    margin-top: 20px;
    .main-content {
        display: flex;
        flex-direction: column;
        align-items: center;

        .temp {
            font-size: 100px;
            font-weight: 300;

            &::after {
                content: '°';
                position: absolute;
            }
        }
        img {
            width: 150px;
        }
    }
}
</style>
