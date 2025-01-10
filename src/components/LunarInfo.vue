<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2025/1/8 02:02
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import BlogDate from '../core/components/BlogDate.vue';
import { CalendarDay } from '../core/composables/useCalendar.ts';
import LunarDateInfo from './LunarDateInfo.vue';

const props = defineProps<{
  data: CalendarDay,
  showLunarDate: boolean
}>();


</script>

<template>
  <div>
    <LunarDateInfo :lunar="data.lunar"/>
    <transition>
      <BlogDate v-if="showLunarDate" class="pos-absolute lunar-date" :date="data"/>
      <span v-else class="m-2 date-span">{{data.month}}-{{ data.day }}</span>
    </transition>
  </div>
</template>

<style scoped>

.lunar-date{
  z-index: 9999;
  /*right: -1.4rem;*/
  right: -0.8rem;
  top: 0.5rem;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


</style>
