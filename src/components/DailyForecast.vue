<script setup lang="ts">
import { useWeatherStore } from '../stores/weatherStore'
const storeWeather = useWeatherStore()

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const computedDay = (unix: number) => {
    const day = new Date(unix * 1000).getDay() - 1
    return weekdays[day]
}
</script>

<template>
    <section class="forecast">
        <div class="day" v-for="(day, index) in storeWeather.data.daily" :key="index">
            <span class="weekDay">{{ computedDay(day.dt) }}</span>
            <img :src="'/weatherIcons/' + day.weather[0].icon + '.webp'" alt="asd" />
            <span class="temp">{{ day.temp.min }}° - {{ day.temp.max }}°</span>
        </div>
    </section>
</template>

<style scoped lang="scss">
.forecast {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 300px;
    width: 100%;
    max-width: 480px;
    background: rgb(255, 255, 255);
    padding: 10px;
    justify-content: space-evenly;
    border-radius: 20px;
    box-shadow: 0px 0px 1.3px rgba(0, 0, 0, 0.02), 0px 0px 4.5px rgba(0, 0, 0, 0.025), 0px 0px 20px rgba(0, 0, 0, 0.04);

    .day {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        background-color: #f3f4f5;
        padding: 10px 20px;
        border-radius: 20px;
        width: 100%;

        img {
            width: 32px;
        }
    }
}
</style>
