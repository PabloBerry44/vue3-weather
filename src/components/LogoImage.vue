<script setup lang="ts"></script>
<template>
    <div class="logo">
        <span>Pogoda</span>
        <div class="circle">7</div>
    </div>
</template>
<style lang="scss" scoped>
.logo {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    font-size: 24px;
    color: var(--secondary-text-color);
    grid-area: 1 / 1;
    .circle {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgb(255, 68, 0);
        background: linear-gradient(45deg, rgba(255, 68, 0, 1) 0%, rgb(255, 174, 0) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #000000;
    }
}
</style>
