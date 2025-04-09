/**
 * @description
 * @author 阿怪
 * @date 2025/1/7 16:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';

export default defineComponent((props,{slots}) => {
  return () => {
    return <m-border class="m-calendar-cell" top={false} >
      {slots.default?.()}
    </m-border>;
  };
}, {
  name: 'MCalendarMonthCell',
});
