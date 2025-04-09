<script setup lang="ts">
/**
 * @description 订阅列表
 * @author 阿怪
 * @date 2025/1/17 17:56
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { useAgendaStore } from '../../../store/agenda.store.ts';
import { storeToRefs } from 'pinia';

const agendaStore = useAgendaStore();
const { subscribeAddressList } = storeToRefs(agendaStore);



</script>

<template>

  <div class="subscribe-menu">

    <div class="subscribe-menu-item" v-for="item in subscribeAddressList">
      <span>{{item.name}}</span>
      <m-switch v-model="item.active"></m-switch>
    </div>

  </div>

</template>

<style scoped>

.subscribe-menu{
  width: 15vw;
}


</style>
