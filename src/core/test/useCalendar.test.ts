/**
 * @description
 * @author 阿怪
 * @date 2025/1/9 10:36
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { describe, it } from 'vitest';
import { ref } from 'vue';
import dayjs from 'dayjs';
import { useMonthCalendarCore } from '../model/month/composables/useMonthCalendar.ts';
import { useYearCalendarCore } from '../model/year/composables/useYearCalendar.ts';

describe('useCalendar', () => {


  it('useCalendarCore', () => {
    const res = useYearCalendarCore({
      date: dayjs('2025-06-20'),
    })

    res.init('2025-01-20');
    const {dateArrRef} = res;
    console.log(dateArrRef.value);
    // res.init('2024-02-20');
    // res.init('2024-03-20');
    // res.init('2024-04-20');
    // res.init('2024-05-20');
    // res.init('2024-06-20');
    // res.init('2024-07-20');
    // res.init('2024-08-20');
    // res.init('2024-09-20');
    // res.init('2024-10-20');
    // res.init('2024-11-20');
    // res.init('2024-12-20');

  });

});
