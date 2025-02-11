/**
 * @description
 * @author 阿怪
 * @date 2025/1/5 23:41
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { props } from './props.ts';
import MCalendarMonth from './model/month/MCalendarMonth.tsx';
import MCalendarYear from './model/year/MCalendarYear.tsx';
import MCalendarDay from './model/day/MCalendarDay.tsx';
import { CalendarDay } from './model/month/composables/useMonthCalendar.ts';

export default defineComponent<MCalendarProps>((_props, { slots,emit }) => {
  const props = _props as Required<MCalendarProps>;

  const updateType = (type: string) => {
    emit('update:type', type);
  }

  const selectDay = (date: CalendarDay) => {
    emit('selectDay', date);
  }

  return () => {
    return <m-border border={props.border} class={['m-calendar',`m-calendar-${props.type}`]}>
      {
        () => {

          if (_props.type === 'day') {
            return <MCalendarDay {...props}>
              {{ cell: slots['day-cell'] }}
            </MCalendarDay>;
          }

          if (_props.type === 'month') {
            return <MCalendarMonth {...props} onUpdateType={updateType} onSelectDay={selectDay}>
              {{ cell: slots['month-cell'] }}
            </MCalendarMonth>;
          }

          if (_props.type === 'year') {
            return <MCalendarYear {...props}>
              {{ cell: slots['year-cell'] }}
            </MCalendarYear>;
          }
        }
      }
    </m-border>;


  };
}, {
  name: 'MCalendar',
  props,
  emits: ['update:type','selectDay'],
});
