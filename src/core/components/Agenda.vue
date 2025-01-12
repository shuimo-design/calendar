<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2025/1/10 17:35
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { computed } from 'vue';

const props = defineProps<{
  agenda: MCalendarAgenda & { groupInfo: [number, number, number] };
}>();

const startDay = computed(() => props.agenda.startDay ?? 0);
const endDay = computed(() => props.agenda.endDay ?? 0);
const start = computed(() => startDay.value >= 0);
const end = computed(() => endDay.value <= 0);


const style = computed(() => ({
  '--m-calendar-agenda-color': props.agenda.color,
  width: `${(props.agenda.days ?? 7) / 7 * 100}%`,
  marginLeft: `${props.agenda.groupInfo[0]/ 7 * 100}%`,
}));

</script>

<template>
  <div class="m-calendar-agenda" :style="style">
    <div v-if="start" class="m-calendar-agenda-left"></div>
    <div class="m-calendar-agenda-main">
      <span class="calendar-span">{{ agenda.info?.msg }} {{ agenda.level }}</span>
    </div>
    <div v-if="end" class="m-calendar-agenda-right m-cursor-pointer" ref="rightRef"></div>
  </div>
</template>

<style scoped>

.m-calendar-agenda {
  width: 100%;
  height: 20px;
  display: inline-flex;
  --m-calendar-agenda-color: var(--m-color-main);
  --m-calendar-agenda-w: 0px;
}

.m-calendar-agenda-left, .m-calendar-agenda-right {
  height: 20px;
  background-color: var(--m-calendar-agenda-color);
}

.m-calendar-agenda-main {
  flex: 1;
  height: 20px;
  mask-image: url('../assets/svg/main.svg');
  background-color: var(--m-calendar-agenda-color);
  mask-repeat: repeat-x;

  position: relative;
}

.m-calendar-agenda-left {
  aspect-ratio: 330/121;
  mask-image: url('../assets/svg/left.svg');
  background-repeat: no-repeat;
}

.m-calendar-agenda-right {
  aspect-ratio: 129/119;
  mask-image: url('../assets/svg/right.svg');
  background-repeat: no-repeat;
}

.calendar-span {
  position: absolute;
  color: white;
  line-height: 20px;
}

</style>
