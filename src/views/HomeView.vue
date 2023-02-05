<script setup lang="ts">
import { useWeatherStore } from '../stores/weatherStore'
import MainWeather from '@/components/MainWeather.vue'
import ConditionsWeather from '@/components/ConditionsWeather.vue'
import HourlyForecast from '@/components/HourlyForecast.vue'
import DailyForecast from '@/components/DailyForecast.vue'
import SquaresView from '@/components/SquaresView.vue'

const storeWeather = useWeatherStore()
</script>

<template>
    <main v-if="storeWeather.loaded">
        <MainWeather />
        <HourlyForecast />
        <ConditionsWeather />
        <DailyForecast />
        <SquaresView />
    </main>
</template>

<style scoped lang="scss">
main {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    min-width: 320px;
    width: 100%;
    gap: 20px;
    margin-top: 20px;

    @media (min-width: 800px) {
        grid-template-columns: 1fr 1fr;
    }
}
</style>
