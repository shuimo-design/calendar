/**
 * @description
 * @author 阿怪
 * @date 2025/1/12 19:22
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { describe, it } from 'vitest';
import useCalendar from '../composables/useCalendar.ts';
import dayjs from 'dayjs';
import { AgendaClass } from '../composables/agenda/Agenda.class.ts';

describe('agenda', async () => {


  it('test', () => {

    const {dateArrRef} = useCalendar({props:{modelValue:'2025-01-12',agenda:[]}});
    const dateInfo = dateArrRef.value.map(date=>
      dayjs(date.year+'-'+date.month+'-'+date.day).toDate()
    );

    const agendaList = [
      { start: '2025-01-08', end: '2025-01-15', info: { msg: '日历开发周期' } },
      { start: '2025-01-06', end: '2025-01-10', info: { msg: '工作日' } },
      { start: '2025-01-11', end: '2025-01-12', info: { msg: '休息日' } },
      { start: '2025-01-18', end: '2025-01-19', info: { msg: '休息日' } },
      { start: '2025-01-12', end: '2025-01-12', info: { msg: '芋头煲仔饭' } },
      { start: '2025-01-10', end: '2025-01-26', info: { msg: '食谱开发周期' } },
      { start: '2025-01-13', end: '2025-01-17', info: { msg: '工作日' } },
      { start: '2025-01-20', end: '2025-01-26', info: { msg: '工作日' } },
      { start: '2025-01-27', end: '2025-02-4', info: { msg: '春节（休）' } },
    ];

    const agendaClass = new AgendaClass(agendaList, new Date('2025-1-5'));
    console.log(agendaClass.getOneWeekAndGoNext());
    console.log(agendaClass.getOneWeekAndGoNext());
    console.log(agendaClass.getOneWeekAndGoNext());
    console.log(agendaClass.getOneWeekAndGoNext());



  });

});
