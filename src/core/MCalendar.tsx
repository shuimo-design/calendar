/**
 * @description
 * @author 阿怪
 * @date 2025/1/5 23:41
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Component, computed, defineComponent, onMounted, ref, watch } from 'vue';
import useCalendar from './composables/useCalendar.ts';
import MCalendarCell from './components/MCalendarCell.tsx';

type MCalendarProps = {
  modelValue?: string | Date;
}

export default defineComponent<MCalendarProps>((_props, { slots }) => {
  const props = _props as Required<MCalendarProps>;

  const { getCalendar, dateArrRef, unshift,push } = useCalendar({ props });

  const weekInfo = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];


  // ---------------------

  const scrollTimer = ref<number | null>(null);
  const SCROLL_TIME = 300;
  const scrollDistance = ref(0);
  const moveDistance = ref(0);
  const translateY = computed(() => scrollDistance.value + moveDistance.value);

  const scrollTimeout = () => {
    if (scrollTimer.value) {
      clearTimeout(scrollTimer.value);
    }
    // scrollTimer.value = setTimeout(() => {
    //   console.log('clear');
    //   scrollDistance.value = 0;
    // }, SCROLL_TIME);
  };

  const onWheel = (e: WheelEvent) => {
    // console.log(scrollDistance.value);
    const { deltaY } = e;
    if (deltaY < 0) {
      scrollDistance.value += deltaY;
      // 向上滚动
    } else {
      scrollDistance.value += deltaY;
    }
    scrollTimeout();
  };

  const viewWrapperRef = ref<HTMLElement | null>(null);
  let firstObserver: IntersectionObserver | null = null;
  let lastObserver: IntersectionObserver | null = null;

  const scrollToZero = () => {
    scrollDistance.value = 0;
  }

  watch(viewWrapperRef,()=>{
    console.log(viewWrapperRef.value);
    firstObserver = new IntersectionObserver(entries => {
      const isVisible = entries[0].isIntersecting;
      const intersectionRatio = entries[0].intersectionRatio;
      if(intersectionRatio<0.1){
        return;
      }
      if (isVisible) {
        unshift();
        scrollToZero();
        if (scrollTimer.value) {
          clearTimeout(scrollTimer.value);
        }
      }
    }, {
      root: viewWrapperRef.value,
      threshold: [0.4],
    });


    lastObserver = new IntersectionObserver(entries => {
      const isVisible = entries[0].isIntersecting;
      const intersectionRatio = entries[0].intersectionRatio;
      if(intersectionRatio<0.1){
        return;
      }
      if (isVisible) {
        push();
        scrollToZero();
        if (scrollTimer.value) {
          clearTimeout(scrollTimer.value);
        }
      }
    },{
      root: viewWrapperRef.value,
      threshold: [0.4],
    });
  })

  const initObserver = (node: Element | Component<typeof MCalendarCell> | null, index: number) => {
    if (index === 0) {
      const el = (node as unknown as any)?.$el; // fix this type error
      firstObserver?.observe(el as Element);
    }else if(index === dateArrRef.value.length - 1){
      const el = (node as unknown as any)?.$el; // fix this type error
      lastObserver?.observe(el as Element);
    }
  };


  // ---------------------


  return () => {

    // console.log(calendarDateInfo.value);
    // todo 发布lunar 支持农历日期

    return <m-border class="m-calendar">
      <div class="m-calendar-header m-calendar-row">
        {
          weekInfo.map((info, i) => (
            <div>{info}</div>
          ))
        }
      </div>
      <m-divider/>
      <div class="m-calendar-view-wrapper" onWheel={onWheel} ref={viewWrapperRef}>
        <div class="m-calendar-view" style={{ '--transform-y': `${translateY.value}px` }}>
          {dateArrRef.value.map((cell, i) => {
            const dom = <MCalendarCell date={cell} ref={el => initObserver(el, i)}>
              {{
                default: () => slots.cell?.(cell),
              }}
            </MCalendarCell>;
            return dom;
          })}
        </div>
      </div>
    </m-border>;

  };
}, {
  props: {
    modelValue: { type: [String, Date], default: '' },
  },
});
