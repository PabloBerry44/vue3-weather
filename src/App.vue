<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue'
import FooterVue from './components/Footer.vue'
import { useWeatherStore } from './stores/weatherStore'
import { useRoute, useRouter } from 'vue-router'
import { watch, onMounted } from 'vue'
const storeWeather = useWeatherStore()

const route = useRoute()
const router = useRouter()

onMounted(async () => {
    await router.isReady()
    if (!route.params.city) {
        const response = await fetch('https://ipwho.is/')
        const data = await response.json()

        changeRoute(data.city)
    }
})

watch(
    () => route.fullPath,
    async () => {
        await router.isReady()
        storeWeather.fetchData(String(route.params.city))
    },
)

function changeRoute(city: string) {
    router.push(city.replace(/ /g, '-'))
}
</script>

<template>
    <div class="loading" v-if="!storeWeather.loaded">
        <div class="circle"></div>
        <span>Loading data</span>
    </div>
    <div class="wrapper" :class="{ darkMode: storeWeather.theme == 'dark' }">
        <NavigationBar @search="(value) => changeRoute(value)" />
        <router-view></router-view>
    </div>

    <FooterVue />
</template>
<style scoped>
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

<style lang="scss"></style>
