<script setup lang="ts">
import { ref } from 'vue'
import LogoImage from '../components/LogoImage.vue'

const searchValue = ref('')
const formInput = ref(HTMLInputElement)
</script>
<template>
    <header>
        <LogoImage class="logo" />
        <form @submit.prevent="$emit('search', searchValue), (searchValue = '')" action=".">
            <input ref="formInput" type="search" v-model="searchValue" placeholder="Search for city" />
        </form>
    </header>
</template>
<style scoped lang="scss">
header {
    display: grid;
    width: 100%;
    padding: 10px;
    background: white;
    border-radius: 20px;
    position: relative;
    background-color: var(--component-background);
    justify-items: center;
    gap: 40px;

    @media (min-width: 800px) {
        grid-template-columns: 1fr 1fr;

        .logo {
            display: flex;
        }
    }

    button {
        cursor: pointer;
        width: 38px;
        display: grid;
        img {
            width: 100%;
            grid-area: 1 / 1;
        }
    }

    form {
        display: flex;
        align-items: center;
        max-width: 460px;
        width: 100%;
        border-radius: 10px;
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
</style>
