<script setup lang="ts">
import { useWeatherStore } from './stores/weatherStore'
const storeWeather = useWeatherStore()
</script>

<template>
    <div class="loading" v-if="!storeWeather.loaded">loading</div>
    <router-view></router-view>
</template>
<style>
.loading {
    width: 100%;
    height: 100vh;
    background: white;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
}
</style>
