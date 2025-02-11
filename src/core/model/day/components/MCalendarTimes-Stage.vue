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
import { computed } from 'vue';

const props = defineProps<{
  timeGroup: CalendarTime[],
}>();

const timeGroupComputed = computed(() => {
  return [
    { hour: 0, minute: 0 },
    ...props.timeGroup,
    { hour: 24, minute: 0 },
  ];
});

// 时间补0
const formatTime = (time: number) => {
  return time < 10 ? `0${time}` : time;
};

const TIME_HEIGHT = 6; // rem
const getTimeList = (index: number) => {

  if(index === timeGroupComputed.value.length - 1) {
    return [];
  }

  const start = timeGroupComputed.value[index];
  const end = timeGroupComputed.value[index + 1];
  const list = [start];
  let hour = start.hour;
  while (hour < end.hour) {
    list.push({ hour: hour + 1, minute: 0 });
    hour++;
  }

  if(hour===end.hour&&end.minute>0){
    list[list.length-1].height = TIME_HEIGHT * end.minute / 60;
  }

  return list;
};

const getTitle = ( index: number) => {
  if (index !== timeGroupComputed.value.length - 1 && index !== 0) {
    const time = timeGroupComputed.value[index];
    return `${formatTime(time.hour)}:${formatTime(time.minute)}`;
  }
  return '';
};

</script>

<template>
  <div class="m-calendar-times">
    <div class="m-calendar-times-group" v-for="(_,index) in timeGroupComputed">
      <div class="m-calendar-times-title">{{ getTitle(index) }}</div>
      <div class="m-calendar-times-list">
        <div class="m-calendar-times-item" v-for="item in getTimeList(index)"
             :style="{height: item.height ? `${item.height}rem` : `${TIME_HEIGHT}rem`}">
          <div class="m-calendar-times-item-main">
            <div>{{ formatTime(item.hour) }}:{{ formatTime(item.minute) }}</div>
          </div>
          <m-divider/>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

.m-calendar-times-title {
  font-size: 1.8rem;
  width: 2rem;
  margin-right: 2rem;
}

.m-calendar-times-group {
  display: flex;
  align-items: start;
}

.m-calendar-times-list {
  width: calc(100% - 4rem);
}

.m-calendar-times-item {
  height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;


}

.m-calendar-times-item-main {

}

</style>
