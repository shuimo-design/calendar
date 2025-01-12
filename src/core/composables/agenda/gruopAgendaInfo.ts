/**
 * @description
 * @author 阿怪 from chatgpt o1
 * @date 2025/1/13 02:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */



// 题目所说的复合类型
export type AgendaInfo = MCalendarAgendaType & {
  groupInfo: [number, number, number]; // [x, y, z]
};

/**
 * =======================
 * 2. 判断冲突的函数
 * =======================
 */

/**
 * 判断两个 AgendaInfo 是否冲突（即“占用天区间”是否重叠）
 * @param a AgendaInfo
 * @param b AgendaInfo
 * @returns true 表示冲突，false 表示无冲突
 */
function isConflict(a: AgendaInfo, b: AgendaInfo): boolean {
  const [x1, y1] = a.groupInfo;
  const [x2, y2] = b.groupInfo;

  // a 的占用区间 [start1, end1]
  const start1 = x1;
  const end1 = x1 + y1 - 1;

  // b 的占用区间 [start2, end2]
  const start2 = x2;
  const end2 = x2 + y2 - 1;

  // 若区间不重叠，则要么 a 在 b 之前结束，要么在 b 之后开始
  // 不重叠条件: end1 < start2 || end2 < start1
  // 取否定即可得到“是否冲突”
  const noOverlap = (end1 < start2) || (end2 < start1);
  return !noOverlap;
}

/**
 * =======================
 * 3. “贴紧前一个三元组”的逻辑
 * =======================
 * 假设你希望当一个新 AgendaInfo 与某组不冲突时，
 * 就将它的 x（skip）相对于组内“最晚结束”的那条进行重新计算，
 * 从而让它贴紧前面。
 */

/**
 * 获取某组内“最晚结束”的那一天（即最大的 end = x+y-1）
 */
function getGroupMaxEndDay(group: AgendaInfo[]): number {
  let maxEnd = -Infinity;
  for (const gItem of group) {
    const [x, y] = gItem.groupInfo;
    const end = x + y - 1;
    if (end > maxEnd) {
      maxEnd = end;
    }
  }
  return maxEnd;
}

/**
 * 将 newItem 的三元组 [x2, y2, z2] 改写为“紧贴”已有组的末尾
 * @param group 已有组
 * @param newItem 待加入的新 AgendaInfo
 * @returns 一个新的 AgendaInfo（或者你也可以直接改 newItem）
 */
function offsetTriple(group: AgendaInfo[], newItem: AgendaInfo): AgendaInfo {
  // 找到该组内“最晚结束”的 day
  const maxEndDay = getGroupMaxEndDay(group); // 比如 1+5-1=5
  // newItem 原始 [x2, y2, z2]
  const [x2, y2, z2] = newItem.groupInfo;

  // 看看它与 maxEndDay 的差值
  // 如果 x2 > maxEndDay+1 ，说明它本来是从更后面开始的
  // 我们要把它“拉近”到刚好贴着 maxEndDay + 1
  // offset = x2 - (maxEndDay+1)
  const offset = x2 - (maxEndDay + 1);

  // 如果 offset >= 0，表示它起始比前面结束更晚，就贴过来 => x=0
  // 如果 offset < 0，说明它其实比 maxEndDay+1 小（理论上不该出现，因不冲突表示 x2 >= maxEndDay+1，但做个保护）
  // 也可直接固定成 0，表示“不再预留空白”
  const newX = Math.max(0, offset);

  // 你示例里 `[6,1,0] -> [0,1,0]` 就是这个逻辑：6 - (1+5)=0
  // y2 不变
  // z2 是否要变？看你需求:
  //   - 可以设 0（表示本小段用完了）
  //   - 也可以保留原值
  //   - 或者你要做某种剩余计算，都行
  const newZ = 0;

  const modified = {
    ...newItem,
    groupInfo: [newX, y2, newZ] as [number, number, number],
  };
  return modified;
}

/**
 * =======================
 * 4. 分组主函数 (合并了“贴紧”逻辑)
 * =======================
 * 当我们发现某个 item 可以加入已存在的 group 时，
 * 就把它“贴紧”该组的末尾。
 */
export function groupAgendaInfo(agendaList: AgendaInfo[]): AgendaInfo[][] {
  const result: AgendaInfo[][] = [];

  for (const item of agendaList) {
    let placed = false;

    for (const group of result) {
      // 检查当前组中是否与 item 有冲突
      const conflict = group.some(gItem => isConflict(gItem, item));
      if (!conflict) {
        // 不冲突 => 放进该组
        // 但要对 item 做“贴紧末尾”的处理
        if (group.length === 0) {
          // 如果组里还没有元素，直接放进去即可
          group.push(item);
        } else {
          // 否则先计算 offset 后的结果
          const offsetedItem = offsetTriple(group, item);
          group.push(offsetedItem);
        }
        placed = true;
        break;
      }
    }

    if (!placed) {
      // 如果无法放进任何已有组 => 新建一个组
      result.push([item]);
    }
  }

  return result;
}
