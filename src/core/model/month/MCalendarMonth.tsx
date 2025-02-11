/**
 * @description calendar month type
 * @author 阿怪
 * @date 2025/1/20 19:17
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, withMemo } from 'vue';
import useMonthCalendar, { CalendarDay } from './composables/useMonthCalendar.ts';
import useCalendarScroll from './composables/calendar/useCalendarScroll.ts';
import MCalendarMonthCell from './components/MCalendarMonthCell.tsx';
import MCalendarAgenda from './components/MCalendarAgenda.vue';
import { props } from '../../props.ts';
import { weekInfo } from '../../composables/constant.ts';

export default defineComponent<MCalendarProps, {
  updateType: (type: string) => void,
  selectDay: (day: CalendarDay) => void,
}>((_props, { slots, emit }) => {
  const props = _props as Required<MCalendarProps>;

  const calendarHandler = useMonthCalendar({ props });
  const {
    getCalendar, dateArrRef,
    firstDayjsRef,
  } = calendarHandler;


  const {
    onWheel,
    viewWrapperRef,
    wrapperStyle,
    initObserver,
  } = useCalendarScroll(calendarHandler);

  const onCalendarWheel = (e: WheelEvent) => {
    // 如果ctrl键按下，滚动时切换年份
    if (e.ctrlKey || e.metaKey) {
      // 向上滚动
      if (e.deltaY < 0) {
        emit('updateType', 'year');
      }else {
        emit('updateType', 'day');
      }
      return;
    }
    onWheel(e);
  };

  const selectDay = (day: CalendarDay) => {
    emit('selectDay', day);
  }

  const memoCache: any[] = [];
  return () => {

    return <>
      <div class="m-calendar-header m-calendar-row">
        {
          weekInfo.map((info, i) => (
            <div class="text-end">{info}</div>
          ))
        }
      </div>
      <m-divider/>
      <div class="m-calendar-view-wrapper" onWheel={onCalendarWheel} ref={viewWrapperRef}>
        <div class="m-calendar-view-scroll-wrapper" style={wrapperStyle.value}>
          <div class="m-calendar-view">
            {withMemo(dateArrRef.value, () => {
              return <>{
                dateArrRef.value.map((cell, i) => {
                  const dom = <MCalendarMonthCell
                    onDblclick={()=>selectDay(cell)} ref={el => initObserver(el, i)}>
                    {{ default: () => slots.cell?.(cell) }}
                  </MCalendarMonthCell>;
                  return dom;
                })
              }</>;
            }, memoCache, 0)}
          </div>
          <div class="m-calendar-agendas">
            <MCalendarAgenda agenda={props.agenda} firstDay={firstDayjsRef.value!}/>
          </div>
        </div>
      </div>
    </>;

  };
}, {
  name: 'MCalendarMonth',
  props,
  emits: ['updateType','selectDay'],
});
