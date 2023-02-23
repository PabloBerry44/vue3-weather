<script setup lang="ts">
import { ref } from 'vue'
import LogoImage from '../components/LogoImage.vue'
import { useStateStore } from '../stores/stateStore'
const storeState = useStateStore()

const searchValue = ref('')

function handleClick() {
   storeState.cityList = []
   searchValue.value = ''
}
</script>
<template>
   <div class="wrapper">
      <header>
         <LogoImage class="logo" />
         <form action="." @submit.prevent="$emit('search', searchValue), (searchValue = '')">
            <input type="search" v-model="searchValue" placeholder="Search for city" />
            <section class="component list">
               <router-link
                  tabindex="0"
                  class="city"
                  v-for="(city, index) in storeState.cityList"
                  :key="index"
                  :to="storeState.computedURL(city.lat, city.lon, city.name, city.country)"
                  @click="handleClick()">
                  {{ city.name }}, {{ city.state }} {{ city.country }}
               </router-link>
               <span v-if="storeState.cityList.length == 0 && storeState.listLoaded">No results</span>
               <div class="circle" v-if="!storeState.listLoaded"></div>
            </section>
         </form>
      </header>
      <div class="overlay"></div>
   </div>
</template>

<style scoped lang="scss">
.wrapper {
   isolation: isolate;
   z-index: 2;
   position: sticky;
   width: 100%;
   max-width: 1000px;
   inset: 0;
   margin-inline: auto;
   top: 10px;
}
.wrapper:focus-within .overlay {
   display: block;
}

header {
   display: grid;
   width: 100%;
   border-radius: 20px;
   background-color: var(--component-bg);
   justify-items: center;
   gap: 40px;
   box-shadow: 0px 0px 1.3px rgba(0, 0, 0, 0.02), 0px 0px 4.5px rgba(0, 0, 0, 0.025), 0px 0px 20px rgba(0, 0, 0, 0.04);
   position: relative;
   z-index: 5;
   padding: 10px;

   :focus-within .list {
      display: flex;
   }

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
      background-color: var(--input-bg);
      position: relative;

      &:focus-within {
         box-shadow: 0 0 0 2px #1b66c9; //
         -webkit-box-shadow: 0 0 0 2px #1b66c9; //
         -moz-box-shadow: 0 0 0 2px #1b66c9;
      }

      input {
         font-size: 18px;
         padding: 15px 20px;
         border-radius: 10px;
         width: 100%;
         top: 0;
         left: 0;
         color: initial;
         color: var(--s-text);
      }

      .list {
         position: absolute;
         width: calc(100% + 20px);
         padding: 10px;
         display: flex;
         gap: 10px;
         flex-direction: column;
         top: 68px;
         left: -10px;
         display: none;
         background-color: var(--input-bg);

         span {
            font-size: 20px;
            padding: 10px;
            text-align: center;
            color: var(--s-text);
         }

         .circle {
            width: 30px;
            height: 30px;
            border: 3px solid rgb(0, 89, 223);
            border-bottom: 5px solid var(--body-bg);
            border-radius: 50%;
            animation-name: rotate;
            animation-duration: 1s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            margin-inline: auto;
            padding: 10px;
         }

         @keyframes rotate {
            from {
               transform: rotateZ(0deg);
            }
            to {
               transform: rotateZ(359deg);
            }
         }

         &:focus {
            display: flex;
         }

         .city {
            padding: 15px 10px;
            border-radius: 20px;
            text-decoration: none;
            color: var(--p-text);

            &:hover {
               background-color: var(--hover-bg);
            }
         }
      }
   }
}

.overlay {
   width: 100%;
   height: 100dvh;
   background-color: #00000027;
   position: fixed;
   top: 0;
   left: 0;
   display: none;
   backdrop-filter: blur(5px);
}
</style>
