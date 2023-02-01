<script setup lang="ts">
import { useWeatherStore } from '../stores/weatherStore'
import { ref } from 'vue'
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

const searchValue = ref('')
</script>
<template>
    <header>
        <form @submit.prevent="storeWeather.fetchData(searchValue), (searchValue = '')">
            <input type="text" v-model="searchValue" placeholder="Search for city" />
        </form>
    </header>
</template>
<style scoped lang="scss">
header {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    padding: 10px;

    input {
        font-size: 18px;
        padding: 15px;
        background: white;
        border-radius: 10px;
        width: 100%;
        top: 0;
        left: 0;
        color: initial;
        background: rgb(255, 255, 255);
        box-shadow: 0px 0px 1.3px rgba(0, 0, 0, 0.02), 0px 0px 4.5px rgba(0, 0, 0, 0.025),
            0px 0px 20px rgba(0, 0, 0, 0.04);
    }

    form {
        display: flex;
        align-items: center;
        max-width: 480px;
        width: 100%;
        border-radius: 10px;
        background: white;
        position: relative;
        max-height: 52px;

        &:focus-within {
            box-shadow: 0 0 0 2px #1b66c9; //
            -webkit-box-shadow: 0 0 0 2px #1b66c9; //
            -moz-box-shadow: 0 0 0 2px #1b66c9;
        }
    }
}
</style>
