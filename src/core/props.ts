/**
 * @description
 * @author 阿怪
 * @date 2025/1/20 19:22
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from './types/props';


// 暂时不用，不然会报警告
export const typedProps: MCOPO<Omit<MCalendarProps, 'type'>> = {
  modelValue: { type: [String, Date], default: '' },
  agenda: { type: Array, default: () => [] },
};

export const props: MCOPO<MCalendarProps> = {
  ...typedProps,
  type: { type: String as MPropType<'year' | 'month' | 'week' | 'day'>, default: 'month' },
};
