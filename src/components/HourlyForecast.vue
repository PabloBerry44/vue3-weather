<script setup lang="ts">
import { useWeatherStore } from '../stores/weatherStore'

const computedHour = (unix: number) => {
    const hour = new Date((unix + storeWeather.data.timezone_offset) * 1000).getHours().toString()
    return hour.length == 1 ? '0' + hour : hour
}

const storeWeather = useWeatherStore()
</script>

<template>
    <section class="forecast">
        <div class="hour--details" v-for="(detail, index) in storeWeather.data.hourly.slice(0, 24)" :key="index">
            <span class="hour"> {{ computedHour(detail.dt) }}</span>
            <img :src="'/weatherIcons/' + detail.weather[0].icon + '.webp'" alt="asd" />
            <span class="temp"> {{ Math.round(detail.temp) }} </span>
        </div>
    </section>
</template>

<style scoped lang="scss">
.forecast {
    width: 100%;
    max-width: 480px;
    background: rgb(255, 255, 255);
    border-radius: 20px;
    display: flex;
    flex-flow: row nowrap;
    gap: 30px;
    padding: 20px;
    overflow-x: scroll;
    position: relative;
    box-shadow: 0px 0px 1.3px rgba(0, 0, 0, 0.02), 0px 0px 4.5px rgba(0, 0, 0, 0.025), 0px 0px 20px rgba(0, 0, 0, 0.04);

    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
    }

    .hour--details {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        gap: 10px;

        img {
            width: 32px;
        }

        .temp::after {
            content: '°';
            position: absolute;
        }
    }
}
</style>
