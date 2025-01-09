<script setup lang="ts">
import MCalendar from './core/MCalendar.tsx';
import LunarInfo from './components/LunarInfo.vue';
import { ref } from 'vue';


const dateRef=  ref(new Date());

</script>

<template>

  <m-rice-paper layout="full-screen">
    <div class="flex justify-center flex-items-center w-100vw h-100vh">

<!--      <m-date-picker v-model="dateRef"/>-->


      <div class="wrapper">
        <MCalendar v-model="dateRef">
          <template #cell="data">
            <LunarInfo :data="data"/>
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
