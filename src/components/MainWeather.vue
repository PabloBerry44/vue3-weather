<script setup lang="ts">
import { useStateStore } from '../stores/stateStore'

const storeState = useStateStore()
</script>

<template>
   <section class="main-content component">
      <span v-if="storeState.geo.name && storeState.geo.country" class="location"
         >{{ storeState.geo.name.replace(/-/g, ' ') }}, {{ storeState.geo.country }}
      </span>

      <div class="container">
         <img
            :src="'/weatherIcons/' + storeState.data.current.weather[0].icon + '.webp'"
            :alt="storeState.data.current.weather[0].main"
            width="80" />
         <span class="temp">{{ Math.round(storeState.data.current.temp) }}</span>
      </div>
      <span class="description">{{ storeState.data.current.weather[0].description }}</span>
   </section>
</template>

<style scoped lang="scss">
.main-content {
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 20px;
   justify-content: space-evenly;

   .container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 20px;
      width: 100%;
      height: 120px;

      .temp {
         font-size: 80px;
         font-weight: 200;

         &::after {
            content: '°';
         }
      }
      img {
         width: 80px;
      }
   }

   .description {
      text-transform: capitalize;
      font-size: 20px;
   }
}
</style>
