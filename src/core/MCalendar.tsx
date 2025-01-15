/**
 * @description
 * @author 阿怪
 * @date 2025/1/5 23:41
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed, defineComponent, withMemo } from 'vue';
import useCalendar from './composables/useCalendar.ts';
import MCalendarCell from './components/MCalendarCell.tsx';
import MCalendarAgenda from './components/MCalendarAgenda.vue';
import useCalendarScroll from './composables/calendar/useCalendarScroll.ts';

export default defineComponent<MCalendarProps>((_props, { slots }) => {
  const props = _props as Required<MCalendarProps>;

  const calendarHandler = useCalendar({ props });
  const {
    getCalendar, dateArrRef,
    firstDayjsRef,
  } = calendarHandler;

  const weekInfo = ['日', '壹', '贰', '叁', '肆', '伍', '陆'];

  const {
    onWheel,
    viewWrapperRef,
    translateY,
    initObserver,
  } = useCalendarScroll(calendarHandler);

  const wrapperStyle = computed(() => ({ '--transform-y': `${translateY.value}px` }));

  const memoCache: any[] = [];
  return () => {

    return <m-border class="m-calendar">
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
                  const dom = <MCalendarCell date={cell} ref={el => initObserver(el, i)}>
                    {{ default: () => slots.cell?.(cell) }}
                  </MCalendarCell>;
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
    </m-border>;

  };
}, {
  props: {
    modelValue: { type: [String, Date], default: '' },
    agenda: { type: Array, default: () => [] },
  },
});
