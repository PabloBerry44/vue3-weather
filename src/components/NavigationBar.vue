<script setup lang="ts">
import { useWeatherStore } from '../stores/weatherStore'
import { ref } from 'vue'
const storeWeather = useWeatherStore()

const searchValue = ref('krakow')
</script>
<template>
    <header>
        <form @submit.prevent="storeWeather.fetchData(searchValue)">
            <input type="text" v-model="searchValue" placeholder="Search for city" />
            <button type="submit">submit</button>
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
        background: rgb(255, 255, 255);
        border-radius: 10px;
        width: 100%;
        max-width: 400px;
        border: 1px solid #5a5a5a;
    }

    form {
        display: flex;
        align-items: center;
        width: 100%;
        box-shadow: 0.7px 0.7px 0.9px rgba(0, 0, 0, 0.028), 2.2px 2.2px 3.1px rgba(0, 0, 0, 0.042),
            10px 10px 14px rgba(0, 0, 0, 0.07);
        border-radius: 10px;
        background: white;
    }
}
</style>
