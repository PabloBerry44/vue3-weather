<script setup lang="ts">
import { ref } from 'vue'

const searchValue = ref('')
</script>
<template>
    <header>
        <form @submit.prevent="$emit('search', searchValue), (searchValue = '')">
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
