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
import { groupAgendaInfo } from '../composables/agenda/gruopAgendaInfo.ts';

const props = defineProps<{
  agenda: MCalendarAgenda[];
  firstDay: dayjs.Dayjs;
}>();

type AgendaInfo = MCalendarAgendaType & { groupInfo: [number, number, number] };




const getWeek = (agendaClass: AgendaClass) => {
  const agendas = agendaClass.getOneWeekAndGoNext();
  const agendaInfos: AgendaInfo[] = agendas.map(a => ({
    ...a,
    groupInfo: [
      Math.max(a.startDay ?? 0, 0), // 第几天开始
      a.days ?? 0,  // 持续几天
      Math.max(0 - (a.endDay ?? 0), 0), // 还剩几天
    ],
  }));
  const group =  groupAgendaInfo(agendaInfos)
  // console.log(group);
  return group;
};

const agendasList = computed(() => {
  const agenda = new AgendaClass(props.agenda, props.firstDay.toDate());

  const list = [];
  list.push(getWeek(agenda));
  list.push(getWeek(agenda));
  list.push(getWeek(agenda));
  list.push(getWeek(agenda));
  list.push(getWeek(agenda));
  list.push(getWeek(agenda));
  list.push(getWeek(agenda));
  list.push(getWeek(agenda));


  return list;
});

</script>

<template>


  <div class="m-calendar-agenda-row" v-for="groups in agendasList">
    <div v-for="agendas in groups">
      <Agenda :agenda="agenda" v-for="agenda in agendas"/>
    </div>
  </div>

</template>

<style scoped>

</style>
