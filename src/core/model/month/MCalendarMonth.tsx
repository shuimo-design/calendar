/**
 * @description calendar month type
 * @author 阿怪
 * @date 2025/1/20 19:17
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed, defineComponent, withMemo } from 'vue';
import useMonthCalendar from './composables/useMonthCalendar.ts';
import useCalendarScroll from './composables/calendar/useCalendarScroll.ts';
import MCalendarMonthCell from './components/MCalendarMonthCell.tsx';
import MCalendarAgenda from './components/MCalendarAgenda.vue';
import { props, typedProps } from '../../props.ts';
import { weekInfo } from '../../composables/constant.ts';

export default defineComponent<MCalendarProps>((_props, { slots }) => {
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
      <div class="m-calendar-view-wrapper" onWheel={onWheel} ref={viewWrapperRef}>
        <div class="m-calendar-view-scroll-wrapper" style={wrapperStyle.value}>
          <div class="m-calendar-view">
            {withMemo(dateArrRef.value, () => {
              return <>{
                dateArrRef.value.map((cell, i) => {
                  const dom = <MCalendarMonthCell ref={el => initObserver(el, i)}>
                    {{ default: () => slots.cell?.(cell) }}
                  </MCalendarMonthCell>;
                  return dom;
                })
              }</>;
            }, memoCache, 0)}
          </div>
          <div class="m-calendar-agenda">
            <MCalendarAgenda agenda={props.agenda} firstDay={firstDayjsRef.value!}/>
          </div>
        </div>
      </div>
    </>;

  };
}, {
  name: 'MCalendarMonth',
  props,
});
