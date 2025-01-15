/**
 * @description calendar scroll
 * @author 阿怪
 * @date 2025/1/15 18:01
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Component, computed, nextTick, onUnmounted, ref, watch } from 'vue';
import MCalendarCell from '../../components/MCalendarCell.tsx';
import useCalendar from '../useCalendar.ts';

export default function useCalendarScroll(options: ReturnType<typeof useCalendar>) {

  const { push, unshift, dateArrRef } = options;

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
    //   scrollDistance.value = 0;
    // }, SCROLL_TIME);
  };

  const domSizeRef = ref(0);
  const onWheel = (e: WheelEvent) => {
    requestAnimationFrame(() => {
      let { deltaY } = e;
      if (deltaY < 0) {
        deltaY = Math.max(-domSizeRef.value / 2, deltaY);
        scrollDistance.value += deltaY;
        scrollDistance.value = Math.max(scrollDistance.value,-domSizeRef.value);
        // 向上滚动
      } else {
        deltaY = Math.min(domSizeRef.value / 2, deltaY);
        scrollDistance.value += deltaY;
        scrollDistance.value = Math.min(scrollDistance.value, domSizeRef.value);
      }
      scrollTimeout();
    });
  };

  const viewWrapperRef = ref<HTMLElement | null>(null);
  let firstObserver: IntersectionObserver | null = null;
  let lastObserver: IntersectionObserver | null = null;

  const scrollToZero = () => {
    scrollDistance.value = 0;
  };

  const handleObserver = (entries: IntersectionObserverEntry[], func: () => void) => {

    const isVisible = entries[0].isIntersecting;
    const intersectionRatio = entries[0].intersectionRatio;
    if (intersectionRatio < 0.1) {
      return;
    }
    if (isVisible) {
      func();
      scrollToZero();
      if (scrollTimer.value) {
        clearTimeout(scrollTimer.value);
      }
    }
  };

  const observerElements = ref<Element[]>([]);

  watch(viewWrapperRef, () => {
    scrollToZero();
    firstObserver = new IntersectionObserver(
      entries => handleObserver(entries, unshift),
      {
        root: viewWrapperRef.value,
        threshold: [0.4],
      });
    firstObserver.observe(observerElements.value[0]);

    lastObserver = new IntersectionObserver(
      entries => handleObserver(entries, push),
      {
        root: viewWrapperRef.value,
        threshold: [0.4],
      });
    lastObserver.observe(observerElements.value[1]);
  });

  onUnmounted(() => {
    firstObserver?.disconnect();
    lastObserver?.disconnect();
  });


  const initObserver = (node: Element | Component<typeof MCalendarCell> | null, index: number) => {
    if (index === 0) {
      if (observerElements.value[0]) {
        firstObserver?.unobserve(observerElements.value[0]);
      }
      const el = (node as unknown as any)?.$el; // fix this type error
      if (!el) {return;}
      observerElements.value[0] = el;

      if (viewWrapperRef.value) {
        scrollToZero();
        firstObserver?.observe(observerElements.value[0]);
      }

      // get dom height
      nextTick(() => {
        const height = el?.getBoundingClientRect().height;
        domSizeRef.value = height;
      });

    } else if (index === dateArrRef.value.length - 1) {
      if (observerElements.value[1]) {
        lastObserver?.unobserve(observerElements.value[1]);
      }
      const el = (node as unknown as any)?.$el; // fix this type error
      if (!el) {return;}
      observerElements.value[1] = el;

      if (viewWrapperRef.value) {
        scrollToZero();
        lastObserver?.observe(observerElements.value[1]);
      }
    }
  };

  return {
    onWheel,
    viewWrapperRef,
    translateY,
    initObserver,
  };

}
