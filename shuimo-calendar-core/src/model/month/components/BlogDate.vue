<script setup lang="ts">
/**
 * @description blog date
 * @author 阿怪
 * @date 2024/1/7 20:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed } from 'vue';
import { CalendarDay } from '../composables/useMonthCalendar.ts';
import { LunarType } from '@shuimo-design/lunar';
import { DiZhiColor, TianGanColor } from '../../../composables/constant.ts';

const props = defineProps<{
  date: CalendarDay
}>();




const getColor = (str: string) => {
  const [tian, di] = str.split('');
  return {
    '--m-blog-date-from': TianGanColor[tian],
    '--m-blog-date-to': DiZhiColor[di],
  };
};

const lunarDate = computed<Partial<LunarType>>(() => props.date?.lunar ?? {});

</script>

<template>

  <p class="blog-date write-vertical-left">
    <!--    <span class="blog-date-month" :style="getColor(lunarDate.month)">-->
    <!--      {{ lunarDate.month }}月-->
    <!--    </span>-->
    <span :class="['blog-date-day',{'is-current':date.isCurrent}]" :style="getColor(lunarDate.day??'')">
      {{ lunarDate.day }}日
    </span>
  </p>

</template>

<style scoped>

.blog-date {
  color: white;
  height: 100px;
}

.blog-date span {
  display: inline-block;
  margin-bottom: 1rem;
}

.blog-date-month, .blog-date-day {
  --m-blog-date-from: var(--m-color-main);
  --m-blog-date-to: var(--m-color-warn);
  mask-image: url(../../../assets/img/seal.png);
  mask-size: 100% 100%;
  background: linear-gradient(to bottom, var(--m-blog-date-from), var(--m-blog-date-to));
  padding: 0.8rem 0.4rem;
  border-radius: 0.4rem;

  opacity: 0.4;

  &.is-current {
    opacity: 1;
  }
}

</style>
