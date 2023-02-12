<script setup lang="ts">
import { useStateStore } from '../stores/stateStore'
import { ref, onMounted } from 'vue'

const mobileDevice = ref(false)
function handleDeviceWidth() {
   mobileDevice.value = window.innerWidth > 500 ? false : true
}
onMounted(() => {
   handleDeviceWidth()
   window.addEventListener('resize', handleDeviceWidth)
})

const computedHour = (unix: number) => {
   const hour = new Date((unix + stateStore.data.timezone_offset) * 1000).getHours().toString()
   return hour.length == 1 ? '0' + hour : hour
}

const stateStore = useStateStore()
</script>

<template>
   <section class="forecast component" v-dragscroll="!mobileDevice">
      <div class="hour--details" v-for="(detail, index) in stateStore.data.hourly.slice(0, 24)" :key="index">
         <span class="hour"> {{ computedHour(detail.dt) }}</span>
         <img width="32" :src="'/weatherIcons/' + detail.weather[0].icon + '.webp'" :alt="detail.weather[0].main" />
         <span class="temp"> {{ Math.round(detail.temp) }} </span>
      </div>
   </section>
</template>

<style scoped lang="scss">
.forecast {
   display: flex;
   flex-flow: row nowrap;
   gap: 30px;
   padding: 20px;
   overflow: scroll;
   position: relative;
   z-index: 1;
   overflow-x: scroll;

   -webkit-user-select: none;
   -ms-user-select: none;
   user-select: none;

   -ms-overflow-style: none;
   scrollbar-width: none;
   cursor: grab;

   &:active {
      cursor: grabbing;
   }

   &::-webkit-scrollbar {
      display: none;
   }

   .hour--details {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      gap: 10px;

      img {
         width: 32px;
         pointer-events: none;
      }

      .temp::after {
         content: '°';
         position: absolute;
      }
   }
}
</style>
