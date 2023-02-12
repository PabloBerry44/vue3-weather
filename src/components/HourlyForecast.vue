<script setup lang="ts">
import { useWeatherStore } from '../stores/weatherStore'

const computedHour = (unix: number) => {
    const hour = new Date((unix + storeWeather.data.timezone_offset) * 1000).getHours().toString()
    return hour.length == 1 ? '0' + hour : hour
}

const storeWeather = useWeatherStore()
</script>

<template>
    <section class="forecast component-container">
        <div class="hour--details" v-for="(detail, index) in storeWeather.data.hourly.slice(0, 24)" :key="index">
            <span class="hour"> {{ computedHour(detail.dt) }}</span>
            <img width="32" :src="'/weatherIcons/' + detail.weather[0].icon + '.webp'" :alt="detail.weather[0].main" />
            <span class="temp"> {{ Math.round(detail.temp) }} </span>
        </div>
    </section>
</template>

<style scoped lang="scss">
.forecast {
    display: flex;
    flex-flow: row nowrap;
    gap: 30px;
    padding: 20px;
    overflow: scroll;
    position: relative;
    z-index: 1;
    overflow: scroll;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
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
