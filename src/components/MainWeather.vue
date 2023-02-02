<script setup lang="ts">
import { useWeatherStore } from '../stores/weatherStore'

const storeWeather = useWeatherStore()
</script>

<template>
    <section class="main-content">
        <!-- <span class="location">{{ storeWeather.data[0].name }}, {{ storeWeather.data[0].country }} </span> -->

        <div class="container">
            <img :src="'/weatherIcons/' + storeWeather.data.current.weather[0].icon + '.webp'" alt="asd" />
            <span class="temp">{{ Math.round(storeWeather.data.current.temp) }}</span>
        </div>
        <span class="description">{{ storeWeather.data.current.weather[0].main }}</span>
    </section>
</template>

<style scoped lang="scss">
.main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 300px;
    width: 100%;
    max-width: 480px;
    background: rgb(255, 255, 255);
    padding: 20px;
    justify-content: space-evenly;
    border-radius: 20px;
    box-shadow: 0px 0px 1.3px rgba(0, 0, 0, 0.02), 0px 0px 4.5px rgba(0, 0, 0, 0.025), 0px 0px 20px rgba(0, 0, 0, 0.04);

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
