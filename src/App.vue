<script setup lang="ts">
import MCalendar from './core/MCalendar.tsx';
import LunarInfo from './components/LunarInfo.vue';
import { ref } from 'vue';
import { useAgendaStore } from './core/store/agenda.store.ts';
import { storeToRefs } from 'pinia';
import SubscribeMenu from './core/plugins/subscribe/components/SubscribeMenu.vue';

const dateRef=  ref(new Date());
const showLunarDateRef = ref(true);

const agendaStore = useAgendaStore();
const { agendaList } = storeToRefs(agendaStore);

enum CALENDAR_TYPE {
  YEAR = 'year',
  MONTH = 'month',
  WEEK = 'week',
  DAY = 'day',
}
const calendarType = ref<CALENDAR_TYPE>(CALENDAR_TYPE.MONTH)
</script>

<template>

  <m-rice-paper layout="full-screen">
    <div class="flex flex-col justify-center flex-items-center w-100vw h-100vh">

      <div>
        <m-switch active-info="干支纪日法" inactive-info="公历纪日法" v-model="showLunarDateRef" />
        <m-radio-group v-model="calendarType">
          <m-radio value="year">年</m-radio>
          <m-radio value="month">月</m-radio>
        </m-radio-group>
      </div>

      <div class="flex">
        <SubscribeMenu/>
        <div class="wrapper">
          <MCalendar v-model="dateRef" :agenda="agendaList" :type="calendarType">
            <template #month-cell="data">
              <LunarInfo :show-lunar-date="showLunarDateRef" :data="data"/>
            </template>
          </MCalendar>
        </div>
      </div>




    </div>
  </m-rice-paper>


</template>

<style scoped>

.wrapper{
  height: 80vh;
  width: 80vw;
}

</style>
