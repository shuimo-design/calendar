<script setup lang="ts">/**
 * @description
 * @author 阿怪
 * @date 2025/1/13 00:39
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import dayjs from 'dayjs';
import { computed } from 'vue';
import { AgendaClass } from '../composables/agenda/Agenda.class.ts';
import Agenda from './Agenda.vue';

const props = defineProps<{
  agenda: MCalendarAgenda[];
  firstDay: dayjs.Dayjs;
}>();

const agendasList = computed(() => {
  const agenda = new AgendaClass(props.agenda, props.firstDay.toDate());

  const list = [];
  list.push(agenda.getOneWeekAndGoNext());
  list.push(agenda.getOneWeekAndGoNext());
  list.push(agenda.getOneWeekAndGoNext());
  list.push(agenda.getOneWeekAndGoNext());
  list.push(agenda.getOneWeekAndGoNext());
  list.push(agenda.getOneWeekAndGoNext());
  list.push(agenda.getOneWeekAndGoNext());
  list.push(agenda.getOneWeekAndGoNext());

  return list;
});

</script>

<template>


  <div class="m-calendar-agenda-row" v-for="agendas in agendasList">
    <Agenda :agenda="agenda" v-for="agenda in agendas" />

  </div>

</template>

<style scoped>

</style>
