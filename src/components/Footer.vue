<script setup lang="ts"></script>
<template>
    <footer>
        <span>
            This is an open source project stored on
            <a href="https://github.com/PabloBerry44/vue3-weather">Github</a>
            and created by PabloBerry44. Weather data provided by
            <a href="https://openweathermap.org/">OpenWeather</a>.
        </span>
    </footer>
</template>
<style scoped lang="scss">
footer {
    padding: 20px;
    display: flex;
    flex-flow: column;
    color: var(--secondary-text-color);
    gap: 10px;
    text-align: center;
    font-size: 14px;

    a {
        color: inherit;
    }
}
</style>
