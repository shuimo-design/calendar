/**
 * @description year calendar hook
 * @author 阿怪
 * @date 2025/1/20 21:04
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Options } from '../../../composables/common/defineCore.ts';
import useCommonCalendar, { getCommonCalendar } from '../../../composables/useCommonCalendar.ts';
import dayjs from 'dayjs';
import { ref } from 'vue';
import { CalendarMonth } from '../../month/composables/useMonthCalendar.ts';


export default function useYearCalendar<AgendaInfo = any>(options: Options<{
  props: MCalendarProps<AgendaInfo>
}>) {

  const { currentRef } = useCommonCalendar(options);

  const calendarCore = useYearCalendarCore({ date: currentRef.value, agenda: options.props.agenda });

  return {
    ...calendarCore,
    currentRef,
  };

}

export function useYearCalendarCore<AgendaInfo = any>(
  options: {
    date?: string | Date | dayjs.Dayjs,
    scrollable?: boolean,
    agenda?: MCalendarAgenda<AgendaInfo>[];
  },
) {
  const { scrollable = true, agenda = [] } = options ?? {};

  let currentDayjs: dayjs.Dayjs;
  const dateArrRef = ref<CalendarMonth[]>([]);
  const YEAR_CALENDAR_LENGTH = scrollable ? 20 : 12;
  let firstDayjsRef = ref<dayjs.Dayjs>();

  const getCalendar = ()=>{
    dateArrRef.value.length = 0;
    let monthFirstDay = firstDayjsRef.value!;
    let month = monthFirstDay.month();

    for (let i = 0; i < YEAR_CALENDAR_LENGTH; i++) {
      const firstWeekSunday = monthFirstDay.subtract(monthFirstDay.day(), 'day');

      // console.log(firstWeekSunday.format('YYYY-MM-DD'));
      month = monthFirstDay.month() + 1;
      const year = monthFirstDay.year();

      const days = getCommonCalendar({
        firstDayjsRef: ref(firstWeekSunday),
        currentDayjs,
        CALENDAR_LENGTH: 42,
        needLunar: false,
      });
      dateArrRef.value.push({
        days,
        month,
        year
      });
      monthFirstDay = monthFirstDay.add(1, 'month');
    }
  }

  const init = (date: string | Date | dayjs.Dayjs = options.date!) => {
    currentDayjs = dayjs(date);
    let calculateDayjs = currentDayjs;
    // 获取月份
    let month = calculateDayjs.month();
    // 构造年份日历的第一个月，映射逻辑为  1234月为1月 5678月为5月 9101112月为9月
    const firstMonth = Math.floor(month / 4) * 4 + 1;
    firstDayjsRef.value = dayjs(calculateDayjs).month(firstMonth - 1).date(1);
    if(scrollable){
      firstDayjsRef.value = firstDayjsRef.value!.subtract(4, 'month');
    }
    getCalendar();
  };
  init(options?.date);

  const unshift = () => {
    firstDayjsRef.value = firstDayjsRef.value!.subtract(4, 'month');
    getCalendar();
  }

  const push = () => {
    firstDayjsRef.value = firstDayjsRef.value!.add(4, 'month');
    getCalendar();
  }


  return {
    init,
    dateArrRef,
    unshift,
    push
  };


}
