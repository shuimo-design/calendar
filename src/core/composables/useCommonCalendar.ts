/**
 * @description common calendar hook
 * @author 阿怪
 * @date 2025/1/20 21:05
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Options } from './common/defineCore.ts';
import { Ref, ref, watch } from 'vue';
import dayjs from 'dayjs';
import { CalendarDay, toDayjs } from '../model/month/composables/useMonthCalendar.ts';
import { lunar } from '@shuimo-design/lunar';

// todo 这里的isEmpty可以优化掉
const isEmpty = (value: string | Date | undefined) => {return value === '' || value === undefined;};


export default function useCommonCalendar<AgendaInfo = any>(options: Options<{
  props: MCalendarProps<AgendaInfo>
}>) {

  const currentRef = ref<dayjs.Dayjs>(isEmpty(options.props.modelValue) ? dayjs() : toDayjs(options.props.modelValue));

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
    currentRef,
  };

}


const generateCalendarDate = (options: {
  year: number, month: number, day: number,
  isCurrentMonth?: boolean, isCurrent?: boolean, needLunar?: boolean,
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

export const getCommonCalendar = (options: {
  firstDayjsRef: Ref<dayjs.Dayjs | undefined, dayjs.Dayjs | undefined>,
  currentDayjs: dayjs.Dayjs,
  CALENDAR_LENGTH: number,
  needLunar: boolean
}) => {
  const {
    firstDayjsRef,
    currentDayjs, CALENDAR_LENGTH,
    needLunar,
  } = options;

  let calendarDay = firstDayjsRef.value!;

  const result: CalendarDay[] = [];
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
  return result;


};


export type CalendarHookRes<T = any> = {
  push: () => void;
  unshift: () => void;
  dateArrRef: Ref<T[]>;
}
