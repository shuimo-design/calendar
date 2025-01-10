<script setup lang="ts">
import MCalendar from './core/MCalendar.tsx';
import LunarInfo from './components/LunarInfo.vue';
import { ref } from 'vue';


const dateRef=  ref(new Date());
const showLunarDateRef = ref(true);
</script>

<template>

  <m-rice-paper layout="full-screen">
    <div class="flex flex-col justify-center flex-items-center w-100vw h-100vh">

      <m-switch active-info="干支纪日法" inactive-info="公历纪日法" v-model="showLunarDateRef" />


      <div class="wrapper">
        <MCalendar v-model="dateRef">
          <template #cell="data">
            <LunarInfo :show-lunar-date="showLunarDateRef" :data="data"/>
          </template>
        </MCalendar>
      </div>


    </div>
  </m-rice-paper>


</template>

<style scoped>

.wrapper{
  height: 80%;
  width: 80%;
}

</style>
