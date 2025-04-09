/**
 * @description
 * @author 阿怪
 * @date 2025/1/12 19:56
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import dayjs from 'dayjs';

const compareDate = (date1: Date, date2: Date) => {
  return dayjs(dayjs(date1).format('YYYY-MM-DD')).diff(dayjs(date2).format('YYYY-MM-DD'), 'days');
};

const maxDay = (date1: Date, date2: Date) => {
  const date1Js = dayjs(dayjs(date1).format('YYYY-MM-DD'));
  const date2Js = dayjs(dayjs(date2).format('YYYY-MM-DD'));
  return date1Js.diff(date2Js) > 0 ? date1 : date2;
};

const minDay = (date1: Date, date2: Date) => {
  const date1Js = dayjs(dayjs(date1).format('YYYY-MM-DD'));
  const date2Js = dayjs(dayjs(date2).format('YYYY-MM-DD'));
  return date1Js.diff(date2Js) < 0 ? date1 : date2;
};

export class AgendaClass<T = any> {

  list: MCalendarAgendaType<T, Date>[];
  currentDate: Date;

  level = 0;

  currentActiveAgenda: MCalendarAgendaType<T, Date>[] = [];
  leftAgenda: MCalendarAgendaType<T, Date>[] = [];

  constructor(list: MCalendarAgenda<T>[], startDate: Date) {
    this.currentDate = startDate; // 这个默认会是日历的第一天，是个特殊逻辑，暂不支持其他情况

    this.list = list
      .map(item => ({
        ...item,
        start: new Date(item.start),
        end: new Date(item.end),
        children: [],
      }))
      .sort((a, b) => a.start.getTime() - b.start.getTime());


    // 先初始化一周数据
    // 从currentDate开始，到currentDate+7天
    const lastDay = dayjs(this.currentDate).add(7, 'day').toDate();
    for (let i = 0; i < this.list.length; i++) {
      const item = this.list[i];

      if (Math.max(item.start.getTime(), this.currentDate.getTime()) <= Math.min(item.end.getTime(), lastDay.getTime())) {
        this.currentActiveAgenda.push({
          ...item,
          level: this.level++,
        });
      } else {
        this.leftAgenda.push(item);
      }

    }

  }


  getOneWeekAndGoNext() {

    const f = (day: any) => dayjs(day).format('YYYY-MM-DD');


    const lastDay = dayjs(this.currentDate).add(6, 'day').toDate();

    for (let i = 0; i < this.leftAgenda.length; i++) {
      const item = this.leftAgenda[i];
      if (compareDate(maxDay(item.start, this.currentDate), minDay(item.end, lastDay)) <= 0) {
        this.currentActiveAgenda.push({
          ...item,
          level: this.level++,
        });
        this.leftAgenda.splice(i, 1);
        i--;
      }
    }


    const agendas: AgendaInfoType<T, Date>[] = [];

    for (let i = 0; i < this.currentActiveAgenda.length; i++) {
      const item = this.currentActiveAgenda[i];


      // 摆烂，先这样
      const daysCount = dayjs(dayjs(Math.min(item.end.getTime(), lastDay.getTime())).format('YYYY-MM-DD'))
        .diff(dayjs(Math.max(item.start.getTime(), this.currentDate.getTime())).format('YYYY-MM-DD'), 'day') + 1;


      if (compareDate(item.end, lastDay) <= 0) {
        this.currentActiveAgenda.splice(i, 1);
        i--;
        this.level--;
      }

      const startDay = compareDate(item.start, this.currentDate);
      const endDay = compareDate(item.end, lastDay);
      const days = Math.min(daysCount, 7);

      const agenda: AgendaInfoType<T, Date> = {
        start: item.start,
        end: item.end,
        info: item.info,
        color: item.color,
        level: item.level,
        startDay,
        endDay,
        days,
        parent: item,
        isActive: false,
        operator: false,
        isNew: false,
        groupInfo: [
          Math.max(startDay ?? 0, 0), // 第几天开始
          Math.min(days, 7),  // 持续几天
          Math.max(0 - (endDay ?? 0), 0), // 还剩几天
        ]
      };

      item.children.push(agenda);

      agendas.push(agenda);
    }


    this.currentDate = dayjs(this.currentDate).add(7, 'day').toDate();


    return agendas;
  }

}
