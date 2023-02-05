<script setup lang="ts">
import { useWeatherStore } from '../stores/weatherStore'
const storeWeather = useWeatherStore()

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const computedDay = (unix: number) => {
    const day = new Date((unix + storeWeather.data.timezone_offset) * 1000).getDay()

    const date = new Date()
    const today = date.getDay()

    return day == today ? 'Today' : weekdays[day]
}
</script>

<template>
    <section class="forecast">
        <div class="day" v-for="(day, index) in storeWeather.data.daily.slice(0, 7)" :key="index">
            <div class="wrapper">
                <span class="weekDay">{{ computedDay(day.dt) }}</span>
                <img
                    width="32"
                    height="32"
                    :src="'/weatherIcons/' + day.weather[0].icon + '.webp'"
                    :alt="day.weather[0].main"
                />
            </div>

            <div class="temp-wrapper">
                <span class="temp-min">{{ Math.round(day.temp.min) }}°</span>
                <span class="temp-max">{{ Math.round(day.temp.max) }}°</span>
            </div>
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
    background: var(--component-background);
    color: var(--primary-text-color);
    padding: 10px;
    justify-content: space-evenly;
    border-radius: 20px;
    box-shadow: 0px 0px 1.3px rgba(0, 0, 0, 0.02), 0px 0px 4.5px rgba(0, 0, 0, 0.025), 0px 0px 20px rgba(0, 0, 0, 0.04);
    gap: 5px;

    .day {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        background-color: var(--day-details-background);
        padding: 10px 20px;
        // border-radius: 20px;
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
                color: var(--secondary-text-color);
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
