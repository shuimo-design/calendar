/**
 * @description monty calendar hook
 * @author 阿怪
 * @date 2025/1/6 00:37
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import dayjs from 'dayjs';
import { ref, watch } from 'vue';
import { Options } from '../../../composables/common/defineCore.ts';
import { lunar, LunarType } from '@shuimo-design/lunar';
import { AgendaClass } from './agenda/Agenda.class.ts';
import useCommonCalendar, { getCommonCalendar } from '../../../composables/useCommonCalendar.ts';

export interface CalendarDay {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isCurrent?: boolean;
  lunar?: LunarType;
}

export interface CalendarMonth {
  days:CalendarDay[];
  month:number;
  year:number;
}

export interface CalendarAgenda<Info = any> {
  isStart: boolean;
  isEnd: boolean;
  info?: Info;
  color?: string;
  level?: number;
  days?: number;
}

export const toDayjs = (value: string | Date) => {return dayjs(value);};




export default function useMonthCalendar<AgendaInfo = any>(options: Options<{
  props: MCalendarProps<AgendaInfo>
}>) {
  const { currentRef } = useCommonCalendar(options);

  const calendarCore = useMonthCalendarCore({ date: currentRef.value, agenda: options.props.agenda });

  return {
    ...calendarCore,
    currentRef,
  };
}


export function useMonthCalendarCore<AgendaInfo = any>(
  options?: {
    date?: string | Date | dayjs.Dayjs,
    scrollable?: boolean,
    agenda?: MCalendarAgenda<AgendaInfo>[];
  },
) {
  const { scrollable = true, agenda = [] } = options ?? {};
  const CALENDAR_LENGTH = scrollable ? 56 : 42;
  const needLunar: boolean = true;

  let currentDayjs: dayjs.Dayjs;
  let firstDayjsRef = ref<dayjs.Dayjs>();
  const dateArrRef = ref<CalendarDay[]>([]);

  const getCalendar = () => {
    dateArrRef.value =  getCommonCalendar({
      firstDayjsRef,
      currentDayjs,
      CALENDAR_LENGTH,
      needLunar,
    })
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

    firstDayjsRef.value = dateMonthFirstDayWeekSunday.subtract(subValue, 'week');

    getCalendar();
  };
  init(options?.date);


  const unshift = () => {
    firstDayjsRef.value = firstDayjsRef.value!.subtract(1, 'week');
    getCalendar();
  };

  const push = () => {
    firstDayjsRef.value = firstDayjsRef.value!.add(1, 'week');
    getCalendar();
  };


  return {
    init,
    getCalendar,
    dateArrRef,
    unshift,
    push,
    firstDayjsRef,
  };
}
