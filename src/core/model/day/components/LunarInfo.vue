<script setup lang="ts">/**
 * @description 用于显示农历的信息，提供一个渐变色
 * @author 阿怪
 * @date 2025/2/12 00:10
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { DiZhiColor, TianGanColor } from '../../../composables/constant.ts';

const props = defineProps<{text:string}>();

const getColor = (str: string) => {
  const [tian, di] = str.split('');
  return {
    '--m-lunar-date-from': TianGanColor[tian],
    '--m-lunar-date-to': DiZhiColor[di],
  };
};

</script>

<template>
  <span class="lunar-info" :style="getColor(text??'')">
    {{ text }}
  </span>
</template>

<style scoped>

.lunar-info{
  --m-lunar-date-from: var(--m-color-main);
  --m-lunar-date-to: var(--m-color-warn);
  background-image: linear-gradient(to right, var(--m-lunar-date-from), var(--m-lunar-date-to));
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

</style>
