<script setup lang="ts">
import { ref } from 'vue'
import { useWeatherStore } from '../stores/weatherStore'
import LogoImage from '../components/LogoImage.vue'
const storeWeather = useWeatherStore()

const searchValue = ref('')
const search = ref(false)
const emit = defineEmits(['search'])

function handleSearch() {
    if (!search.value) {
        search.value = true
    } else {
        emit('search', searchValue.value)
    }
}

function handleTheme() {
    storeWeather.theme = storeWeather.theme == 'light' ? 'dark' : 'light'
    document.body.classList.toggle('dark')
    storeWeather.saveLocally()
}
</script>
<template>
    <header>
        <button @click="handleTheme()">
            <img :src="'/themeIcons/' + storeWeather.theme + '.svg'" alt="asd" />
        </button>

        <div class="logo-input-wrapper">
            <transition name="slide-up">
                <LogoImage v-if="!search" />
                <form v-else-if="search" @submit.prevent="$emit('search', searchValue), (searchValue = '')">
                    <input type="text" v-model="searchValue" placeholder="Search for city" />
                </form>
            </transition>
        </div>
        <button @click="handleSearch()"><img src="../assets/icons/icon-search.svg" alt="search" /></button>
    </header>
</template>
<style scoped lang="scss">
header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: row nowrap;
    padding: 10px;
    background: white;
    border-radius: 20px;
    position: relative;
    background-color: var(--component-background);

    button {
        cursor: pointer;
        width: 38px;
        display: flex;
        img {
            width: 100%;
        }
    }

    .logo-input-wrapper {
        display: grid;
        justify-items: center;
        width: 70%;
        align-items: center;
        height: 52px;

        form {
            display: flex;
            align-items: center;
            max-width: 480px;
            width: 100%;
            border-radius: 10px;
            grid-area: 1 / 1;
            height: 44px;
            background-color: var(--input-background);

            &:focus-within {
                box-shadow: 0 0 0 2px #1b66c9; //
                -webkit-box-shadow: 0 0 0 2px #1b66c9; //
                -moz-box-shadow: 0 0 0 2px #1b66c9;
            }

            input {
                font-size: 18px;
                padding: 15px;
                border-radius: 10px;
                width: 100%;
                top: 0;
                left: 0;
                color: initial;
                color: var(--secondary-text-color);
            }
        }
    }

    .slide-up-enter-active,
    .slide-up-leave-active {
        transition: all 0.25s ease-out;
    }

    .slide-up-enter-from {
        opacity: 0;
        transform: translateX(30px);
    }

    .slide-up-leave-to {
        opacity: 0;
        transform: translateX(-30px);
    }
}
</style>
