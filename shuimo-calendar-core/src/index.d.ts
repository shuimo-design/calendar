/**
 * @description
 * @author 阿怪
 * @date 2025/1/12 19:07
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export type RequiredParams<T, Params extends keyof T> = Partial<T> & Required<Pick<T, Params>>;

export type MCalendarProps<AgendaInfo = any> = {
  modelValue?: string | Date;
  agenda?: MCalendarAgenda<AgendaInfo>[];
  type?: 'year' | 'month' | 'week' | 'day',
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

export type AgendaInfoType<AgendaInfo = any, DateType = Date | string> = MCalendarAgendaResType<AgendaInfo, DateType> & {
  isActive: boolean;
  operator: boolean;
  isNew: boolean;
  groupInfo: [number, number, number];
};
