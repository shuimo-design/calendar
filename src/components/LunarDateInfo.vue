<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2025/1/10 11:35
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { LunarType } from '@shuimo-design/lunar';
import { computed } from 'vue';

const props = defineProps<{ lunar?: LunarType }>();
const lunarDate = computed(() => props.lunar?.lunarDate);

const monthZh = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
const day10Zh = ['初', '十', '廿'];
const fullDayZh = [
  '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
];




const newYear = computed(()=> lunarDate.value?.day===1&&lunarDate.value?.month===1);
const monthFirstDay = computed(()=> lunarDate.value?.day===1);
</script>

<template>

  <span v-if="newYear" class="year-span">{{lunar?.year}}年</span>
  <div :class="['lunar-date-info m-2',{'month-first-day':monthFirstDay}]" v-if="lunarDate">
    <span v-if="lunarDate.isLeap">闰</span>
    <span v-if="monthFirstDay">{{ monthZh[lunarDate.month - 1] }}月</span>
    <span>{{ fullDayZh[lunarDate.day - 1] }}</span>
  </div>

</template>

<style scoped>

.year-span{
  position: absolute;
  font-size: 2rem;
  top: -1.5rem;
}

.month-first-day{
  color: var(--m-color-main);
}

.lunar-date-info {
  margin-top: 0.6rem;
}

</style>
