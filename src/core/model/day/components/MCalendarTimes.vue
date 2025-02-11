<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2025/2/12 01:12
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 *
 * 暂存这个版本，逻辑有点麻烦，需要重构
 */
import { CalendarTime } from '../MCalendarDay.tsx';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
  timeGroup: CalendarTime[],
}>();


const timeFormat = (time: number) => {
  return time < 10 ? `0${time}` : `${time}`;
};

const getTitle = (hour: number) => {
  return `${timeFormat(hour)}:00`;
};

const currentTime = ref<number>(0);
const wholeTime = 24 * 3600;

const initCurrent = () => {
  // 获取当天过去了多少秒
  const now = new Date();
  currentTime.value = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
}
const timer = ref();
onMounted(()=>{
  initCurrent();
  timer.value = setInterval(initCurrent, 1000 * 60);
})
onBeforeUnmount(()=> {
  clearInterval(timer.value);
});

const getPercent = (time: number) => {
  return `${(time / wholeTime) * 100}%`;
};

</script>

<template>
  <div class="m-calendar-times">
    <div class="m-calendar-current" :style="{ top: getPercent(currentTime) }">
      <div class="red">现在 ----></div>
    </div>
    <div class="m-calendar-times-group" v-for="hour in 24">
      <div class="m-calendar-times-item">
        <div class="m-calendar-times-title">{{ getTitle(hour - 1) }}</div>
        <div class="m-calendar-times-item-main">

        </div>
      </div>
      <m-divider/>
    </div>

  </div>
</template>

<style scoped>

.m-calendar-times {
  position: relative;
}

.m-calendar-current {
  position: absolute;
}

.m-calendar-times-title {
  font-size: 1.8rem;
  margin-right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--m-color-text);
}

.m-calendar-times-group {
  display: flex;
  flex-direction: column;
}

.m-calendar-times-item {
  width: calc(100% - 4rem);
  height: 6rem;
  display: flex;
  justify-content: space-between;
}

.m-calendar-times-item-main {

}


.red {
  color: var(--m-color-main);
  font-weight: bold;
}

</style>
