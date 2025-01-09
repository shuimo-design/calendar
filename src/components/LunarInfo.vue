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

const props = defineProps<{
  data:CalendarDay
}>()

// console.log(props.data)

</script>

<template>
  <BlogDate :date="data"/>
  <span class="m-2">{{data.day}}</span>
</template>

<style scoped>

</style>
