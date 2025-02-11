/**
 * @description calendar day type
 * @author 阿怪
 * @date 2025/2/11 23:06
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed, defineComponent } from 'vue';
import { props } from '../../props.ts';
import dayjs from 'dayjs';
import { lunar } from '@shuimo-design/lunar';
import { weekInfo } from '../../composables/constant.ts';
import LunarInfo from './components/LunarInfo.vue';
import MCalendarTimes from './components/MCalendarTimes.vue';

export type CalendarTime = {
  hour: number;
  minute: number;
  expand?: boolean;
  height?: number;
}

export default defineComponent<MCalendarProps>((_props, { slots }) => {
  const props = _props as Required<MCalendarProps>;

  const dayInfo = computed(() => {
    return dayjs(props.modelValue);
  });

  const lunarInfo = computed(() => lunar(props.modelValue));


  // 分割时间模块
  const splitTimeGroup: CalendarTime[] = [
    { hour: 8, minute: 30, expand: true },
    { hour: 11, minute: 55, expand: true },
    { hour: 13, minute: 30, expand: true },
    { hour: 18, minute: 0, expand: true },
  ];

  return () => {
    return <div class="m-calendar-day">
      <div class="m-calendar-day-inner">

        <div class="m-calendar-day-header">
          <div class="left">
            <span class="m-calendar-day-header-title">{dayInfo.value.year()}年{dayInfo.value.month() + 1}月{dayInfo.value.date()}日</span>
            <span class="m-calendar-day-header-lunar">
              <LunarInfo text={`${lunarInfo.value.year}年`}/>
              <LunarInfo text={`${lunarInfo.value.month}月`}/>
              <LunarInfo text={`${lunarInfo.value.day}日`}/>
              {lunarInfo.value.term}
            </span>
          </div>
          <div class="right">
            <span>星期{weekInfo[dayInfo.value.day()]}</span>
          </div>
        </div>
        <m-divider/>

        <MCalendarTimes timeGroup={splitTimeGroup}/>
      </div>
    </div>;
  };

}, {
  name: 'MCalendarDay',
  props,
});
