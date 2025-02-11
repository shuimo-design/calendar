/**
 * @description
 * @author 阿怪
 * @date 2025/1/20 22:26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { weekInfo } from '../../../composables/constant.ts';
import { MPropType } from '../../../types/props';
import { CalendarMonth } from '../../month/composables/useMonthCalendar.ts';


const monthMap = ['', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾', '拾壹', '拾贰'];

export default defineComponent((props, { slots }) => {


  const isLessToday = (day: number, month: number, year: number) => {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();
    if (year < todayYear) {
      return true;
    } else if (year === todayYear) {
      if (month < todayMonth) {
        return true;
      } else if (month === todayMonth) {
        if (day < todayDay) {
          return true;
        }
      }
    }
    return false;
  };

  return () => {
    const { monthInfo } = props;
    const { month } = monthInfo;
    return <div class="m-calendar-year-cell">
      <div class="m-calendar-year-cell-month-info">
        {monthInfo.month === 1 ? `${monthInfo.year}年` : ''} {monthMap[month]}月
      </div>
      <div class="m-calendar-year-cells">
        {weekInfo.map((info, i) => (<div class="m-calendar-year-week-info">{info}</div>))}
        {monthInfo.days.map((cell, i) => {
          return <div class={['m-calendar-year-day', { 'm-calendar-not-in-month': cell.month !== month }, { 'less-today': isLessToday(cell.day, cell.month, cell.years) }]}>{cell.day}</div>;
        })}
      </div>
    </div>;
  };

}, {
  name: 'MCalendarYearCell',
  props: {
    monthInfo: { type: Object as MPropType<CalendarMonth> },
  },
});
