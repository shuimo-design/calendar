/**
 * @description
 * @author 阿怪
 * @date 2025/1/7 16:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed, defineComponent } from 'vue';
import { lunar } from '@shuimo-design/lunar';
import { CalendarDay } from '../composables/useCalendar.ts';

export default defineComponent<{
  date: CalendarDay
}>((props,{slots}) => {

  const { date } = props;

  const fullDate = computed(() => `${date.year}-${date.month}-${date.day}`);
  const lunarDay = computed(() => lunar(fullDate.value));


  return () => {


    return <m-border class="m-calendar-cell" top={false} >
      {slots.default?.()}
    </m-border>;

  };

}, {
  name: 'MCalendarCell',
  props: {
    date: { type: Object },
  },
});
