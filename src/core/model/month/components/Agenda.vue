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
  agenda: AgendaInfoType;
}>();

const emits = defineEmits(['toggleActive']);

const startDay = computed(() => props.agenda.startDay ?? 0);
const endDay = computed(() => props.agenda.endDay ?? 0);
const start = computed(() => startDay.value >= 0);
const end = computed(() => endDay.value <= 0);


const style = computed(() => ({
  '--m-calendar-agenda-color': props.agenda.color,
  width: `${(props.agenda.days ?? 7) / 7 * 100}%`,
  marginLeft: `${props.agenda.groupInfo[0] / 7 * 100}%`,
}));

const agendaClass = computed(() => [
  'm-calendar-agenda',
  { 'is-active': props.agenda.isActive },
]);

const toggleActive = (isActive: boolean) => {
  emits('toggleActive', isActive);
};

const activeAgenda = () => {toggleActive(true);};
const inactiveAgenda = () => {toggleActive(false);};

</script>

<template>
  <div :class="agendaClass" :style="style"
       @click="activeAgenda"
       @mouseover="activeAgenda"
       @mouseleave="inactiveAgenda">
    <div v-if="start" class="m-calendar-agenda-left"></div>
    <div class="m-calendar-agenda-main">
      <span class="calendar-span">{{ agenda.info?.msg }} {{ agenda.level }}</span>
    </div>
    <div v-if="end" class="m-calendar-agenda-right m-cursor-pointer" ref="rightRef"></div>
  </div>
</template>

<style scoped>

@supports (hanging-punctuation: first) and (font: -apple-system-body) and (-webkit-appearance: none) {
  .m-calendar-agenda-main,.m-calendar-agenda-right {
    margin-left: -1px;
  }
}

.m-calendar-agenda {
  width: 100%;
  height: 20px;
  display: inline-flex;
  opacity: 0.7;
  --m-calendar-agenda-color: var(--m-color-main);
  --m-calendar-agenda-w: 0px;
  pointer-events: auto;

  &.is-active {
    opacity: 1;
  }
}

.m-calendar-agenda-left, .m-calendar-agenda-right {
  height: 20px;
  background-color: var(--m-calendar-agenda-color);
}

.m-calendar-agenda-left, .m-calendar-agenda-right, .m-calendar-agenda-main {
  cursor: var(--m-cursor-pointer);
}

.m-calendar-agenda-main {
  flex: 1;
  height: 20px;
  mask-image: url('../../../assets/svg/main.svg');
  background-color: var(--m-calendar-agenda-color);
  mask-repeat: repeat-x;

  position: relative;
}

.m-calendar-agenda-left {
  aspect-ratio: 330/121;
  mask-image: url('../../../assets/svg/left.svg');
  background-repeat: no-repeat;
}

.m-calendar-agenda-right {
  aspect-ratio: 129/119;
  mask-image: url('../../../assets/svg/right.svg');
  background-repeat: no-repeat;
}

.calendar-span {
  position: absolute;
  color: white;
  line-height: 20px;
  padding-left: 4px;
}

</style>
