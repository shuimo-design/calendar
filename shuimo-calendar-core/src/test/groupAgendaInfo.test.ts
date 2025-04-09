/**
 * @description
 * @author 阿怪
 * @date 2025/1/17 02:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, it } from 'vitest';
import { groupAgendaInfo } from '../model/month/composables/agenda/groupAgendaInfo.ts';

describe('group agenda info', () => {

  it('test', () => {

    const list = [
      { 'msg': '工作日', 'groupInfo': [0, 1, 6] },
      { 'msg': '春节（班）', 'groupInfo': [0, 1, 6] },

      { 'msg': '春节放假', 'groupInfo': [1, 6, 0] },

      { 'msg': '春节（休）', 'groupInfo': [2, 1, 4] },
      { 'msg': '除夕', 'groupInfo': [2, 1, 4] },
      { 'msg': '春节', 'groupInfo': [3, 1, 3] },
      { 'msg': '正月初二', 'groupInfo': [4, 1, 2] },
      { 'msg': '正月初三', 'groupInfo': [5, 1, 1] },
    ] as unknown as AgendaInfoType[];

    const res = groupAgendaInfo(list);

    // console.log(res);


  });

});
