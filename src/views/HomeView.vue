<script setup lang="ts">
import { useWeatherStore } from '../stores/weatherStore'
import NavigationBar from '../components/NavigationBar.vue'
import MainWeather from '@/components/MainWeather.vue'
import ConditionsWeather from '@/components/ConditionsWeather.vue'
import HourlyForecast from '@/components/HourlyForecast.vue'
import DailyForecast from '@/components/DailyForecast.vue'

const storeWeather = useWeatherStore()
</script>

<template>
    <NavigationBar />
    <main v-if="storeWeather.loaded">
        <!-- <main> -->
        <MainWeather />
        <HourlyForecast />
        <ConditionsWeather />
        <DailyForecast />
    </main>
</template>

<style scoped lang="scss">
main {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    padding: 10px;
    min-width: 320px;
    width: 100%;
    gap: 20px;

    @media (min-width: 800px) {
        grid-template-columns: 1fr 1fr;
    }
}
</style>
