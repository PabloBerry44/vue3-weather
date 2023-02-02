<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue'
import { useWeatherStore } from './stores/weatherStore'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
const storeWeather = useWeatherStore()

const route = useRoute()

async function getCity() {
    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
    }
    if (route.params.city) {
        storeWeather.fetchData(String(route.params.city))
    } else {
        const response = await fetch('https://ipwho.is/')
        const data = await response.json()

        storeWeather.fetchData(data.city)
    }
}

getCity()

watch(
    () => route.fullPath,
    async () => {
        getCity()
    },
)
</script>

<template>
    <div class="loading" v-if="!storeWeather.loaded">
        <div class="circle"></div>
        <span>Loading data</span>
    </div>
    <NavigationBar @search="(value) => storeWeather.fetchData(value)" />
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
