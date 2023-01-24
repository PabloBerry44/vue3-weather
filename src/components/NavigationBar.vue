<script setup lang="ts">
import { useWeatherStore } from '../stores/weatherStore'
import { ref } from 'vue'
const storeWeather = useWeatherStore()

const searchValue = ref('krakow')
</script>
<template>
    <header>
        <form @submit.prevent="storeWeather.getForecast(searchValue)">
            <input type="text" v-model="searchValue" />
            <button>
                <img src="../assets/icons/icon-search.svg" alt="search" />
            </button>
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
        font-size: 15px;
        padding: 10px;
        border-radius: 5px;
        text-transform: capitalize;
        background: white;
    }

    form {
        display: flex;
        align-items: center;
    }

    button {
        transform: translateX(-120%);
        img {
            width: 25px;
        }
    }
}
</style>
