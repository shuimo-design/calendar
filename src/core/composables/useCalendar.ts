/**
 * @description
 * @author 阿怪
 * @date 2025/1/6 00:37
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import dayjs from 'dayjs';
import { ref, watch } from 'vue';
import { Options } from './common/defineCore.ts';
import { lunar, LunarType } from '@shuimo-design/lunar';

export interface CalendarDay {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isCurrent?: boolean;
  lunar?: LunarType;
}

export const toDayjs = (value: string | Date) => {return dayjs(value);};

// todo 这里的isEmpty可以优化掉
const isEmpty = (value: string | Date | undefined) => {return value === '' || value === undefined;};

const generateCalendarDate = (options: {
  year: number, month: number, day: number,
  isCurrentMonth?: boolean, isCurrent?: boolean, needLunar?: boolean
}): CalendarDay => {
  const {
    year, month, day,
    isCurrentMonth = false, isCurrent = false, needLunar = true,
  } = options;
  return {
    year, month, day,
    isCurrentMonth: isCurrentMonth,
    isCurrent: isCurrent,
    lunar: needLunar ? lunar(`${year}-${month}-${day}`) : undefined,
  };
};

export default function useCalendar(options: Options<{
  props: {
    modelValue?: string | Date | undefined,
  }
}>) {
  const currentRef = ref<dayjs.Dayjs>(isEmpty(options.props.modelValue) ? dayjs() : toDayjs(options.props.modelValue));

  const calendarCore = useCalendarCore({ date: currentRef.value });

  watch(() => options.props.modelValue, (value) => {
    currentRef.value = dayjs(value);
    // init(currentRef.value);

    /**
     * 初始化完了，修改的时候，要看是哪种模式
     * 如果是日历模式的话，应该用滚动逻辑，滚动逻辑还要看日期是否太远了，太远了就重新渲染
     * 如果是日期选择器模式的话，直接重新渲染即可
     */


  });

  return {
    ...calendarCore,
    currentRef,
  };
}


function useCalendarCore(
  options?: {
    date?: string | Date | dayjs.Dayjs,
    scrollable?: boolean
  },
) {
  const { scrollable = true } = options ?? {};
  const CALENDAR_LENGTH = scrollable ? 56 : 42;
  const needLunar: boolean = true;

  let currentDayjs: dayjs.Dayjs;
  let firstDayjs: dayjs.Dayjs;
  const dateArrRef = ref<CalendarDay[]>([]);

  const getCalendar = () => {
    const result: CalendarDay[] = [];
    let calendarDay = firstDayjs;

    const isCurrent = (cDay: dayjs.Dayjs) => {
      return cDay.year() === currentDayjs.year() &&
        cDay.month() === currentDayjs.month() &&
        cDay.date() === currentDayjs.date();
    };

    for (let i = 0; i < CALENDAR_LENGTH; i++) {
      result.push(generateCalendarDate({
        year: calendarDay.year(),
        month: calendarDay.month() + 1,
        day: calendarDay.date(),
        isCurrentMonth: calendarDay.month() === currentDayjs.month(),
        isCurrent: isCurrent(calendarDay),
        needLunar,
      }));
      calendarDay = calendarDay.add(1, 'day');
    }
    dateArrRef.value = result;
  };

  const init = (date?: string | Date | dayjs.Dayjs) => {
    currentDayjs = dayjs(date || new Date());
    // 初始化日历的第一天
    let day: number = currentDayjs.day();
    // 日期所在的周的第一天
    const dateWeekFirstDay = currentDayjs.subtract(day, 'day');
    // 月份过去的周数
    const monthPastWeeks = Math.floor(currentDayjs.date() / 7);
    // 逻辑：这个月第一天的那一周的周日
    const dateMonthFirstDayWeekSunday = dateWeekFirstDay.subtract(monthPastWeeks, 'week');
    /**
     * 这个周日会有两种情况：
     * 1. 与当前月份相同
     *    月份相同意味着这个月的周日是1号，为了图标好看一些，那么往前再补一个星期
     * 2. 与当前月份不同
     *    月份不同意味着已经跳到上一个月了，不需要额外逻辑
     */

    let subValue = dateMonthFirstDayWeekSunday.month() === currentDayjs.month() ? 1 : 0;
    if (scrollable) {
      subValue++;
    }

    firstDayjs = dateMonthFirstDayWeekSunday.subtract(subValue, 'week');

    getCalendar();
  };
  init(options?.date);


  const unshift = () => {
    firstDayjs = firstDayjs.subtract(1, 'week');
    getCalendar();
  }

  const push = () => {
    firstDayjs = firstDayjs.add(1, 'week');
    getCalendar();
  }


  return {
    init,
    getCalendar,
    dateArrRef,
    unshift,
    push
  };
}
