<script setup lang="ts">
import { useWeatherStore } from '../stores/weatherStore'
const storeWeather = useWeatherStore()

const UVdesc = () => {
    const uvi = storeWeather.data.current.uvi
    switch (true) {
        case uvi >= 11:
            return 'Extremely high'
        case uvi >= 8:
            return 'Very high'
        case uvi >= 6:
            return 'High'
        case uvi >= 3:
            return 'Medium'
        case uvi >= 1:
            return 'Low'
        default:
            return 'Very low'
    }
}

const computedHour = (unix: number) => {
    const hour = new Date((unix + storeWeather.data.timezone_offset) * 1000).getHours().toString()
    const minutes = new Date((unix + storeWeather.data.timezone_offset) * 1000).getMinutes().toString()
    return (
        (hour.length == 1 ? '0' + String(hour) : String(hour)) +
        ':' +
        (minutes.length == 1 ? '0' + String(minutes) : String(minutes))
    )
}
</script>
<template>
    <section class="squares-grid component-container">
        <div class="square">
            <span class="title">UV Index</span>
            <span class="value">{{ Math.round(storeWeather.data.current.uvi) }}</span>
            <span class="descr">{{ UVdesc() }}</span>
        </div>
        <div class="square">
            <span class="title">Sunset</span>
            <span class="value">{{ computedHour(storeWeather.data.current.sunset) }}</span>
            <span class="descr">Sunrise: {{ computedHour(storeWeather.data.current.sunrise) }}</span>
        </div>
        <div class="square">
            <span class="title">Precipitation</span>
            <span class="value">{{ Math.round(storeWeather.data.daily[0].pop * 10) * 10 }}%</span>
            <span v-if="storeWeather.data.daily[0].rain" class="descr">
                Volume: {{ Math.round(storeWeather.data.daily[0].rain) }}mm
            </span>
            <span v-else class="descr"> Volume: N/A </span>
        </div>
        <div class="square wind">
            <div class="wind-circle">
                <span class="N">N</span>
                <span class="S">S</span>
                <span class="E">E</span>
                <span class="W">W</span>
                <div class="arrow">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped lang="scss">
.squares-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 10px;
    gap: 10px;
    grid-column: 1 / -1;
    max-width: 480px;

    @media (min-width: 800px) {
        max-width: 980px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .square {
        width: 100%;
        aspect-ratio: 1 / 1;
        background-color: var(--day-details-background);
        padding: 20px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        .title {
            font-size: 16px;
            color: var(--secondary-text-color);
        }

        .value {
            font-size: 35px;
            color: var(--primary-text-color);
        }

        .descr {
            color: var(--secondary-text-color);
        }

        .wind-circle {
            width: 90%;
            max-width: 128px;
            aspect-ratio: 1 / 1;
            border: 3px var(--light-accent) dotted;
            border-radius: 50%;
            position: relative;
            align-self: center;
            justify-self: center;

            span {
                background: var(--day-details-background);
                position: absolute;
                color: var(--secondary-text-color);

                &.N {
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                &.S {
                    left: 50%;
                    bottom: 0;
                    transform: translate(-50%, 50%);
                }
                &.E {
                    right: 0;
                    top: 50%;
                    transform: translate(50%, -50%);
                }
                &.W {
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
            }
            .arrow {
                width: 2px;
                height: 70%;
                background-color: var(--secondary-text-color);
                border-radius: 2px;
                position: absolute;
                transform: translate(-50%, -50%) v-bind("'rotate('+(storeWeather.data.current.wind_deg)+'deg)'");
                left: 50%;
                top: 50%;

                &::after,
                &::before {
                    position: absolute;
                    content: '';
                    width: 2px;
                    height: 10px;
                    bottom: 0;
                    transform: rotate(20deg) translate(2px, 1px);
                    background-color: var(--secondary-text-color);
                    border-radius: 2px;
                }
                &::before {
                    transform: rotate(-20deg) translate(-2px, 1px);
                }

                .circle {
                    width: 6px;
                    height: 6px;
                    background-color: var(--secondary-text-color);
                    border-radius: 50%;
                    position: absolute;
                    transform: translate(-2px, -80%);
                    top: 50%;
                }
            }
        }
    }
}
</style>
