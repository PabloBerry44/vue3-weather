<script setup lang="ts">
import { useWeatherStore } from '../stores/weatherStore'
import { ref } from 'vue'
const storeWeather = useWeatherStore()

async function getCity() {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()

    const city = await fetch('http://ip-api.com/json/' + data.ip)
    const dane = await city.json()

    storeWeather.fetchData(dane.city)
}

getCity()

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
        background: rgb(241, 241, 241);
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
