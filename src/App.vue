<script setup lang="ts">
import { useWeatherStore } from './stores/weatherStore'
const storeWeather = useWeatherStore()
</script>

<template>
    <!-- <div class="loading" v-if="!storeWeather.loaded">
        <div class="circle"></div>
        <span>Loading data</span>
    </div> -->
    <router-view></router-view>
</template>
<style>
.loading {
    width: 100%;
    height: 100dvh;
    background: white;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    flex-direction: column;
    gap: 20px;
}

.circle {
    width: 50px;
    height: 50px;
    border: 5px solid rgb(0, 89, 223);
    border-bottom: 4px solid white;
    border-radius: 50%;
    animation-name: rotate;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

@keyframes rotate {
    from {
        transform: rotateZ(0deg);
    }
    to {
        transform: rotateZ(359deg);
    }
}
</style>
