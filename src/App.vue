<script setup lang="ts">
import { useWeatherStore } from '../src/stores/weatherStore'

const storeWeather = useWeatherStore()
</script>

<template>
    <p>hello world!</p>
    <button @click="storeWeather.getForecast">get forecast for prague</button>
</template>

<style scoped></style>
