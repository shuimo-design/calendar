<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2025/1/13 00:39
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import dayjs from 'dayjs';
import { ref, watchEffect } from 'vue';
import { AgendaClass } from '../composables/agenda/Agenda.class.ts';
import Agenda from './Agenda.vue';
import { groupAgendaInfo } from '../composables/agenda/groupAgendaInfo.ts';

const props = defineProps<{
  agenda: MCalendarAgenda[];
  firstDay: dayjs.Dayjs;
}>();

const getWeek = (agendaClass: AgendaClass): AgendaInfoType[][] => {
  const agendas = agendaClass.getOneWeekAndGoNext();
  const group = groupAgendaInfo(agendas);
  // console.log(group);
  return group;
};

const agendasList = ref<AgendaInfoType[][][]>([]);

watchEffect(() => {
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
  agendasList.value = list;
});

const toToggleActive = (indexInfo: { gIndex: number, aListIndex: number, aIndex: number }, isActive: boolean) => {
  const { gIndex, aListIndex, aIndex } = indexInfo;
  const item = agendasList.value[gIndex][aListIndex][aIndex];
  item.parent.children.forEach(a=>{
    a.isActive = isActive;
  })
};

</script>

<template>
  <div class="m-calendar-agenda-row" v-for="(groups,gIndex) in agendasList">
    <div v-for="(agendas,aListIndex) in groups">
      <Agenda :agenda="agenda" v-for="(agenda,aIndex) in agendas" @toggleActive="isActive=>toToggleActive({gIndex,aListIndex,aIndex},isActive)"/>
    </div>
  </div>
</template>

<style scoped>

</style>
