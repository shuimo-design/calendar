<script setup lang="ts">
import MCalendar from './core/MCalendar.tsx';
import LunarInfo from './components/LunarInfo.vue';
import { ref } from 'vue';


const dateRef=  ref(new Date());
const showLunarDateRef = ref(true);


const agendaList = [
  { start: '2025-01-11', end: '2025-01-12', info: { msg: '休息日' } ,color:'#2A6E3F'},
  { start: '2025-01-18', end: '2025-01-19', info: { msg: '休息日' } ,color:'#2A6E3F'},
  { start: '2025-01-27', end: '2025-02-4', info: { msg: '春节（休）' } ,color:'#2A6E3F'},
  { start: '2025-01-20', end: '2025-01-26', info: { msg: '工作日' } ,color:'#3D8E86'},
  { start: '2025-01-06', end: '2025-01-10', info: { msg: '工作日' },color:'#3D8E86' },
  { start: '2025-01-13', end: '2025-01-17', info: { msg: '工作日' } ,color:'#3D8E86'},
  { start: '2024-12-28', end: '2025-01-15', info: { msg: '日历开发周期' },color:'#615EA8' },
  { start: '2025-01-15', end: '2025-01-24', info: { msg: '水墨迭代' },color:'var(--m-color-main)' },
  // { start: '2025-01-12', end: '2025-01-12', info: { msg: '芋头煲仔饭' } ,color:'#FAC03D'},
  // { start: '2025-01-10', end: '2025-01-26', info: { msg: '食谱开发周期' } ,color:'#420B2F'},
];
</script>

<template>

  <m-rice-paper layout="full-screen">
    <div class="flex flex-col justify-center flex-items-center w-100vw h-100vh">

      <m-switch active-info="干支纪日法" inactive-info="公历纪日法" v-model="showLunarDateRef" />

      <div class="wrapper">
        <MCalendar v-model="dateRef" :agenda="agendaList">
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
