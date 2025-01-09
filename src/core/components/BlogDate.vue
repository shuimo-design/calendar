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
import { CalendarDay } from '../composables/useCalendar.ts';
import { LunarType } from '@shuimo-design/lunar';

const props = defineProps<{
  date: CalendarDay
}>();


// 亥子属水，寅卯属木，巳午属火，申酉属金，辰戌丑未属土。

const DiZhiColor: Record<string, string> = {
  '子': 'var(--m-color-blue)',
  '丑': 'var(--m-color-warn)',
  '寅': 'var(--m-color-green)',
  '卯': 'var(--m-color-green)',
  '辰': 'var(--m-color-warn)',
  '巳': 'var(--m-color-main)',
  '午': 'var(--m-color-main)',
  '未': 'var(--m-color-warn)',
  '申': 'var(--m-color-orange)',
  '酉': 'var(--m-color-orange)',
  '戌': 'var(--m-color-warn)',
  '亥': 'var(--m-color-blue)',
};

/**
 * 甲木、乙木、丙火、丁火、戊土、己土、庚金、辛金、壬水、癸水，
 * 甲丙戊庚壬为阳性，
 * 乙丁己辛癸为阴性。
 */
const TianGanColor: Record<string, string> = {
  '甲': 'var(--m-color-mu-yang)',
  '乙': 'var(--m-color-mu-yin)',
  '丙': 'var(--m-color-huo-yang)',
  '丁': 'var(--m-color-huo-yin)',
  '戊': 'var(--m-color-tu-yang)',
  '己': 'var(--m-color-tu-yin)',
  '庚': 'var(--m-color-jin-yang)',
  '辛': 'var(--m-color-jin-yin)',
  '壬': 'var(--m-color-shui-yang)',
  '癸': 'var(--m-color-shui-yin)',
};

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
}

.blog-date span {
  display: inline-block;
  margin-bottom: 1rem;
}

.blog-date-month, .blog-date-day {
  --m-blog-date-from: var(--m-color-main);
  --m-blog-date-to: var(--m-color-warn);
  mask-image: url(../assets/img/seal.png);
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
