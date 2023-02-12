<script setup lang="ts">
import { useWeatherStore } from '../stores/weatherStore'
const storeWeather = useWeatherStore()

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const computedDay = (unix: number) => {
    const day = new Date((unix + storeWeather.data.timezone_offset) * 1000).getDay()
    return weekdays[day]
}
</script>

<template>
    <section class="daily component-container">
        <div class="day" v-for="(day, index) in storeWeather.data.daily.slice(0, 7)" :key="index">
            <div class="wrapper">
                <span v-if="index == 0" class="weekDay">Today</span>
                <span v-else class="weekDay">{{ computedDay(day.dt) }}</span>
                <img width="32" :src="'/weatherIcons/' + day.weather[0].icon + '.webp'" :alt="day.weather[0].main" />
            </div>

            <div class="temp-wrapper">
                <span class="temp-min">{{ Math.round(day.temp.min) }}°</span>
                <span class="temp-max">{{ Math.round(day.temp.max) }}°</span>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.daily {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--p-text);
    padding: 10px;
    justify-content: space-evenly;
    gap: 5px;

    .day {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        background-color: var(--inner-bg);
        padding: 10px 20px;
        width: 100%;

        &:first-child {
            border-top-right-radius: 20px;
            border-top-left-radius: 20px;
        }

        &:last-child {
            border-bottom-right-radius: 20px;
            border-bottom-left-radius: 20px;
        }

        .wrapper {
            display: flex;
            width: 60%;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: space-between;

            .weekDay {
                width: 90px;
            }
        }

        .temp-wrapper {
            font-weight: 500;
            display: flex;
            gap: 20px;
            align-items: flex-end;

            .temp-min {
                color: var(--s-text);
            }
            .temp-max {
                font-size: 24px;
                line-height: 24px;
                width: 35px;
                text-align: center;
            }
        }

        img {
            width: 32px;
        }
    }
}
</style>
