<script setup lang="ts">
import { useStateStore } from '../stores/stateStore'
const storeState = useStateStore()

const UVdesc = () => {
   const uvi = storeState.data.current.uvi
   switch (true) {
      case uvi >= 11:
         return 'Extremely high'
      case uvi >= 8:
         return 'Very high'
      case uvi >= 6:
         return 'High'
      case uvi >= 3:
         return 'Medium'
      case uvi >= 1:
         return 'Low'
      default:
         return 'Very low'
   }
}

const computedHour = (unix: number) => {
   const hour = new Date((unix + storeState.data.timezone_offset) * 1000).getHours().toString()
   const minutes = new Date((unix + storeState.data.timezone_offset) * 1000).getMinutes().toString()
   return (
      (hour.length == 1 ? '0' + String(hour) : String(hour)) +
      ':' +
      (minutes.length == 1 ? '0' + String(minutes) : String(minutes))
   )
}
</script>
<template>
   <section class="squares-grid component">
      <div class="square">
         <span class="title">UV Index</span>
         <span class="value">{{ Math.round(storeState.data.current.uvi) }}</span>
         <span class="descr">{{ UVdesc() }}</span>
      </div>
      <div class="square">
         <span class="title">Sunset</span>
         <span class="value">{{ computedHour(storeState.data.current.sunset) }}</span>
         <span class="descr">Sunrise: {{ computedHour(storeState.data.current.sunrise) }}</span>
      </div>
      <div class="square">
         <span class="title">Precipitation</span>
         <span class="value">{{ Math.round(storeState.data.daily[0].pop * 10) * 10 }}%</span>
         <span v-if="storeState.data.daily[0].rain" class="descr">
            Volume: {{ Math.round(storeState.data.daily[0].rain) }}mm
         </span>
         <span v-else class="descr"> Volume: N/A </span>
      </div>
      <div class="square wind">
         <div class="wind-circle">
            <span class="N">N</span>
            <span class="S">S</span>
            <span class="E">E</span>
            <span class="W">W</span>
            <div class="arrow">
               <div class="circle"></div>
            </div>
         </div>
      </div>
   </section>
</template>
<style scoped lang="scss">
.squares-grid {
   display: grid;
   grid-template-columns: 1fr 1fr;
   padding: 10px;
   gap: 10px;
   grid-column: 1 / -1;
   max-width: 480px;

   @media (min-width: 800px) {
      max-width: 980px;
      grid-template-columns: 1fr 1fr 1fr 1fr;
   }

   .square {
      width: 100%;
      aspect-ratio: 1 / 1;
      background-color: var(--inner-bg);
      padding: 20px;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .title {
         font-size: 16px;
         color: var(--s-text);
      }

      .value {
         font-size: 35px;
         color: var(--p-text);
      }

      .descr {
         color: var(--s-text);
      }

      .wind-circle {
         width: 90%;
         max-width: 128px;
         aspect-ratio: 1 / 1;
         border: 3px var(--light-accent) dotted;
         border-radius: 50%;
         position: relative;
         align-self: center;
         justify-self: center;

         span {
            background-color: var(--inner-bg);
            position: absolute;
            color: var(--s-text);

            &.N {
               left: 50%;
               transform: translate(-50%, -50%);
            }
            &.S {
               left: 50%;
               bottom: 0;
               transform: translate(-50%, 50%);
            }
            &.E {
               right: 0;
               top: 50%;
               transform: translate(50%, -50%);
            }
            &.W {
               top: 50%;
               transform: translate(-50%, -50%);
            }
         }
         .arrow {
            width: 2px;
            height: 70%;
            background-color: var(--s-text);
            border-radius: 2px;
            position: absolute;
            transform: translate(-50%, -50%) v-bind("'rotate('+(storeState.data.current.wind_deg)+'deg)'");
            left: 50%;
            top: 50%;

            &::after,
            &::before {
               position: absolute;
               content: '';
               width: 2px;
               height: 10px;
               bottom: 0;
               transform: rotate(20deg) translate(2px, 1px);
               background-color: var(--s-text);
               border-radius: 2px;
            }
            &::before {
               transform: rotate(-20deg) translate(-2px, 1px);
            }

            .circle {
               width: 6px;
               height: 6px;
               background-color: var(--s-text);
               border-radius: 50%;
               position: absolute;
               transform: translate(-2px, -50%);
               top: 50%;
            }
         }
      }
   }
}
</style>
