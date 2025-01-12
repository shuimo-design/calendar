/**
 * @description
 * @author 阿怪
 * @date 2025/1/12 19:07
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

type MCalendarProps<AgendaInfo = any> = {
  modelValue?: string | Date;
  agenda?: MCalendarAgenda<AgendaInfo>[];
}

type MCalendarAgenda<AgendaInfo = any> = MCalendarAgendaType<AgendaInfo>;

type MCalendarAgendaType<AgendaInfo = any, DateType = Date | string> = {
  start: DateType;
  end: DateType;
  info?: AgendaInfo;
  color?: string;
  level?: number;
  startDay?: number;
  endDay?: number;
  days?: number;
}
