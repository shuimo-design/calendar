/**
 * @description
 * @author 阿怪
 * @date 2025/1/17 01:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineStore, storeToRefs } from 'pinia';
import { computed } from 'vue';
import useSubscribe from '../plugins/subscribe/composables/useSubscribe.ts';
import { useSubscribeStore } from '../plugins/subscribe/store/subscribe.store.ts';

export const useAgendaStore = defineStore('agenda', () => {


  const { parseICalendarData } = useSubscribe();
  const subscribeStore = useSubscribeStore();
  const { subscribeAddressList } = storeToRefs(subscribeStore);


  const agendaList = computed(() => subscribeAddressList?.value
    .filter(item => item.active)
    .map(item => item.agendas).flat());

  // agendaList.value.push(...parseICalendarData(cn_zhICAL));

  return {
    subscribeAddressList,
    agendaList,
  };
});
