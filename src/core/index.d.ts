/**
 * @description
 * @author 阿怪
 * @date 2025/1/12 19:07
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

type RequiredParams<T, Params extends keyof T> = Partial<T> & Required<Pick<T, Params>>;


type MCalendarProps<AgendaInfo = any> = {
  modelValue?: string | Date;
  agenda?: MCalendarAgenda<AgendaInfo>[];
}

/**
 * 通用的日程数据结构
 */
type MCalendarAgendaTypeCommon<AgendaInfo = any, DateType = Date | string> = {
  start: DateType;
  end: DateType;
  info?: AgendaInfo;
  color?: string;
  level?: number;
}

/**
 * 用户给到的日程数据
 */
type MCalendarAgenda<AgendaInfo = any> = RequiredParams<MCalendarAgendaTypeCommon<AgendaInfo>, 'start' | 'end'>;

/**
 * 用于计算的日程数据结构
 */
type MCalendarAgendaType<AgendaInfo = any, DateType = Date | string> = MCalendarAgendaTypeCommon<AgendaInfo, DateType> & {
  children: MCalendarAgendaResType<AgendaInfo, DateType>[];
}

/**
 * 返回给日程组件的数据
 */
type MCalendarAgendaResType<AgendaInfo = any, DateType = Date | string> = MCalendarAgendaTypeCommon<AgendaInfo, DateType> & {
  startDay: number;
  endDay: number;
  days: number;
  isActive: boolean;
  operator: boolean;
  isNew: boolean;
  parent: MCalendarAgendaType<AgendaInfo, DateType>
}

type AgendaInfoType<AgendaInfo = any, DateType = Date | string> = MCalendarAgendaResType<AgendaInfo,DateType> & {
  isActive: boolean;
  operator: boolean;
  isNew: boolean;
  groupInfo: [number, number, number];
};
