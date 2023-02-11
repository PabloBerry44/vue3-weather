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
    console.log('es')
    await router.isReady()

    if (!route.params.lat && !route.params.lon) {
        const response = await fetch('https://ipwho.is/')
        const data = await response.json()

        router.push(
            `${String(data.latitude).replace('.', ',')}/${String(data.longitude).replace('.', ',')}/${data.city.replace(
                /-/g,
                ' ',
            )}/${data.country_code}`,
        )
    }
})

watch(
    () => route.fullPath,
    async () => {
        await router.isReady()
        storeWeather.geo.country = String(route.params.country)
        storeWeather.geo.name = String(route.params.name)
        document.title = 'Weather in ' + String(route.params.name).replace(/-/g, ' ')
        storeWeather.fetchData(String(route.params.lat), String(route.params.lon))
    },
)

function handleSearch(city: string) {
    if (city) {
        storeWeather.getCityList(city)
    } else {
        storeWeather.cityList = []
    }
}
</script>

<template>
    <div class="loading" v-if="!storeWeather.loaded">
        <div class="circle"></div>
        <span>Loading data</span>
    </div>
    <div class="wrapper" v-if="storeWeather.loaded">
        <NavigationBar @search="(value) => handleSearch(value)" />
        <router-view></router-view>
    </div>
    <div class="error" v-if="storeWeather.error">
        <span>404</span>
        <span>page not found :(</span>
    </div>
    <FooterVue />
</template>
<style scoped lang="scss">
.loading {
    width: 100%;
    height: 100dvh;
    background: var(--body-background);
    color: var(--secondary-text-color);
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    flex-direction: column;
    gap: 20px;
}

.circle {
    width: 50px;
    height: 50px;
    border: 5px solid rgb(0, 89, 223);
    border-bottom: 4px solid var(--body-background);
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

.error {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 4;

    span {
        color: var(--light-accent);

        &:first-child {
            font-size: 70px;
        }
    }
}
</style>

<style lang="scss"></style>
