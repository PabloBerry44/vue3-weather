<script setup lang="ts">
import { useWeatherStore } from '../stores/weatherStore'

const storeWeather = useWeatherStore()
</script>

<template>
    <section class="main-content component-container">
        <span class="location">{{ storeWeather.data[0].name }}, {{ storeWeather.data[0].country }} </span>

        <div class="container">
            <img
                :src="'/weatherIcons/' + storeWeather.data.current.weather[0].icon + '.webp'"
                :alt="storeWeather.data.current.weather[0].main"
                width="80"
            />
            <span class="temp">{{ Math.round(storeWeather.data.current.temp) }}</span>
        </div>
        <span class="description">{{ storeWeather.data.current.weather[0].description }}</span>
    </section>
</template>

<style scoped lang="scss">
.main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    justify-content: space-evenly;

    .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 20px;
        width: 100%;
        height: 120px;

        .temp {
            font-size: 80px;
            font-weight: 200;

            &::after {
                content: '°';
            }
        }
        img {
            width: 80px;
        }
    }

    .description {
        text-transform: capitalize;
        font-size: 20px;
    }
}
</style>
