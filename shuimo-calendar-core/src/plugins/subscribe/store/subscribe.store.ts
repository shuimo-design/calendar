/**
 * @description
 * @author 阿怪
 * @date 2025/1/17 17:56
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineStore } from 'pinia';
import { SubscribeAddress } from '../composables/subscribeAddress.class.ts';
import { reactive, ref } from 'vue';


export const useSubscribeStore = defineStore('subscribe', () => {

  const subscribeAddressList = reactive<SubscribeAddress[]>([]);

  const weekendSub = new SubscribeAddress({
    name: '周末', active: true, color: '#2A6E3F',
  }, [
    { start: '2025-01-11', end: '2025-01-12' },
    { start: '2025-01-18', end: '2025-01-19' },
  ]);
  subscribeAddressList.push(weekendSub);


  const workDaysSub = new SubscribeAddress({
    name: '工作日', active: true, color: '#3D8E86',
  }, [
    { start: '2025-01-20', end: '2025-01-25' },
    { start: '2025-01-06', end: '2025-01-10' },
    { start: '2025-01-13', end: '2025-01-17' },
  ]);
  subscribeAddressList.push(workDaysSub);

  const holidaySub = new SubscribeAddress({
    active: true, color: '#2A6E3F', name: '节假日',
  }, [
    { info: { msg: '春节（休）' }, start: '2025-01-26', end: '2025-02-04' },
  ]);
  subscribeAddressList.push(holidaySub);

  const janghoodSub = new SubscribeAddress({
    active: false, name: '极客江湖',
  }, [
    { info: { msg: '日历开发周期' }, start: '2024-12-28', end: '2025-01-15', color: '#615EA8' },
    { info: { msg: '水墨迭代' }, start: '2025-01-15', end: '2025-01-24', color: 'var(--m-color-main)' },
  ]);
  subscribeAddressList.push(janghoodSub);

  return {
    subscribeAddressList,
  };
});
