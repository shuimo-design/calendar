/**
 * 日历视图类型
 */
export type CalendarView = 'year' | 'month' | 'week' | 'day';

/**
 * 日期信息
 */
export interface DateInfo {
  date: Date;
  isToday: boolean;
  isWeekend: boolean;
  isOtherMonth: boolean;
}

/**
 * 日历事件
 */
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
  [key: string]: any;
}

/**
 * 日历基础类型定义
 */
export type RequiredParams<T, Params extends keyof T> = Partial<T> & Required<Pick<T, Params>>;

export type MCalendarProps<AgendaInfo = any> = {
  modelValue?: string | Date;
  agenda?: MCalendarAgenda<AgendaInfo>[];
  type?: CalendarView,
  border?: boolean | {top?:boolean,right?:boolean,bottom?:boolean,left?:boolean};
}

/**
 * 通用的日程数据结构
 */
export type MCalendarAgendaTypeCommon<AgendaInfo = any, DateType = Date | string> = {
  start: DateType;
  end: DateType;
  info?: AgendaInfo;
  color?: string;
  level?: number;
}

/**
 * 用户给到的日程数据
 */
export type MCalendarAgenda<AgendaInfo = any> = RequiredParams<MCalendarAgendaTypeCommon<AgendaInfo>, 'start' | 'end'>;

/**
 * 用于计算的日程数据结构
 */
export type MCalendarAgendaType<AgendaInfo = any, DateType = Date | string> = MCalendarAgendaTypeCommon<AgendaInfo, DateType> & {
  children: MCalendarAgendaResType<AgendaInfo, DateType>[];
}

/**
 * 返回给日程组件的数据
 */
export type MCalendarAgendaResType<AgendaInfo = any, DateType = Date | string> = MCalendarAgendaTypeCommon<AgendaInfo, DateType> & {
  startDay: number;
  endDay: number;
  days: number;
  isActive: boolean;
  operator: boolean;
  isNew: boolean;
  parent: MCalendarAgendaType<AgendaInfo, DateType>
}

/**
 * 日程信息类型
 */
export type AgendaInfoType<AgendaInfo = any, DateType = Date | string> = MCalendarAgendaResType<AgendaInfo, DateType> & {
  isActive: boolean;
  operator: boolean;
  isNew: boolean;
  groupInfo: [number, number, number];
};
