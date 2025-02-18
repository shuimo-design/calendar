/**
 * @description calendar year type
 * @author 阿怪
 * @date 2025/1/20 19:39
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, withMemo } from 'vue';
import { props, typedProps } from '../../props.ts';
import useYearCalendar from './composables/useYearCalendar.ts';
import MCalendarYearCell from './components/MCalendarYearCell.tsx';
import useCalendarScroll from '../month/composables/calendar/useCalendarScroll.ts';


export default defineComponent<MCalendarProps, {
  updateType: (type: string) => void,
}>((_props, { slots,emit }) => {

  const props = _props as Required<MCalendarProps>;

  const calendarHandler = useYearCalendar({ props });
  const { currentRef, dateArrRef } = calendarHandler;

  const {
    onWheel,
    viewWrapperRef,
    wrapperStyle,
    initObserver,
  } = useCalendarScroll(calendarHandler);

  const memoCache: any[] = [];

  const updateType = (type: string) => {
    emit('updateType', type);
  }

  const onCalendarWheel = (e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      emit('updateType', 'month');
    }
    onWheel(e);
  }

  return () => {
    return <>
      {/*<div class="m-calendar-header m-calendar-row">*/}
      {/*  <span class="year-info">{currentRef.value.year()}年</span>*/}
      {/*</div>*/}
      <div class="m-calendar-view-wrapper" onWheel={onCalendarWheel} ref={viewWrapperRef}>
        <div class="m-calendar-view-scroll-wrapper m-calendar-year-view" style={wrapperStyle.value}>
          {withMemo(dateArrRef.value, () => {
            return <>{
              dateArrRef.value.map((cell, i) => {
                return <MCalendarYearCell monthInfo={cell} ref={el => initObserver(el, i)}>

                </MCalendarYearCell>;
              })
            }</>;
          }, memoCache, 0)}
        </div>

      </div>
    </>;
  };


}, {
  name: 'MCalendarYear',
  props,
  emits: ['updateType'],
});

