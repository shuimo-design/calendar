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

export default defineComponent<MCalendarProps>((_props, { slots }) => {
  const props = _props as Required<MCalendarProps>;

  return () => {

    if (_props.type === 'month') {
      return <MCalendarMonth {...props}>
        {{ cell: slots['month-cell'] }}
      </MCalendarMonth>;
    }

    if(_props.type === 'year') {
      return <MCalendarYear {...props}>
        {{ cell: slots['year-cell'] }}
      </MCalendarYear>;
    }

  };
}, {
  name: 'MCalendar',
  props,
});
