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
            <section class="component list" v-if="storeState.cityList.length >= 1">
               <router-link
                  tabindex="0"
                  class="city"
                  v-for="(city, index) in storeState.cityList"
                  :key="index"
                  :to="storeState.computedURL(city.lat, city.lon, city.name, city.country)"
                  @click="handleClick()">
                  {{ city.name }}, {{ city.state }} {{ city.country }}
               </router-link>
            </section>
         </form>
      </header>
      <div class="overlay"></div>
   </div>
</template>

<style scoped lang="scss">
.wrapper:focus-within .overlay {
   display: block;
}

header {
   display: grid;
   width: 100%;
   padding: 10px;
   background: white;
   border-radius: 20px;
   background-color: var(--component-bg);
   justify-items: center;
   gap: 40px;
   box-shadow: 0px 0px 1.3px rgba(0, 0, 0, 0.02), 0px 0px 4.5px rgba(0, 0, 0, 0.025), 0px 0px 20px rgba(0, 0, 0, 0.04);

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
      z-index: 3;

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
         z-index: 3;
         position: absolute;
         width: calc(100%);
         padding: 10px;
         display: flex;
         gap: 10px;
         flex-direction: column;
         top: 68px;
         left: 0;
         display: none;
         background-color: var(--input-bg);

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
   z-index: 2;
   display: none;
   backdrop-filter: blur(5px);
}
</style>
