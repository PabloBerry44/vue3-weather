<script setup lang="ts">
import { useWeatherStore } from '../src/stores/weatherStore'
import NavigationBar from './components/NavigationBar.vue'

const storeWeather = useWeatherStore()
</script>

<template>
    <NavigationBar />
</template>

<style scoped></style>
