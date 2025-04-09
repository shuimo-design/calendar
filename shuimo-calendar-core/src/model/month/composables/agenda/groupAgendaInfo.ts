/**
 * @description
 * @author 阿怪
 * @date 2025/1/13 02:30
 * @version v2.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * v2.0.0 rewrite by human brain...
 */

export function groupAgendaInfo(agendaList: AgendaInfoType[]): AgendaInfoType[][] {
  const group: AgendaInfoType[][] = [];
  // const daysArrow: AgendaInfoType[][] = new Array(7).fill(0).map(() => []);
  const daysArrow: AgendaInfoType[][] = new Array(8).fill(0).map(() => []);

  agendaList.forEach(item => {
    if(daysArrow[item.groupInfo[0]]===undefined){
      debugger
    }
    daysArrow[item.groupInfo[0]].push(item);
  });


  const groupEndDay: number[] = [];
  // 遍历daysArrow
  daysArrow.forEach(dayInfo => {
    dayInfo.forEach(agenda => {

      const startDay = agenda.groupInfo[0]; // 周几开始
      const spendDays = agenda.groupInfo[1]; // 持续几天
      // 找到第一个大于endDay的group
      const index = groupEndDay.findIndex(endDay => endDay <= startDay);
      if (index === -1) {
        /**
         * 这里的星期数实际上会多出1，例如星期日 0 持续1天，实际上消耗的只有他自己这一天，
         * 但是不减去1是为了方便上面那个findIndex不用+1
         */
        groupEndDay.push(startDay + spendDays);
        group.push([agenda]);
      } else {
        const g = group[index];
        const endDay = groupEndDay[index];
        /**
         * 这里要处理两件事
         * 1. 修改groupInfo，后面会用于渲染，所以前面已经消耗的天数可以直接减去
         * 2. push进数组中，且更新groupEndDay，更新逻辑应该可以直接覆盖
         */
        agenda.groupInfo[0] = startDay - endDay;
        g.push(agenda);
        groupEndDay[index] = startDay + spendDays;
      }
    });
  });


  return group;
}
