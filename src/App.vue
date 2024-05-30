<script setup>
import { useOnline } from '@vueuse/core';

/* ----- Components ----- */
import Loading from './Loading.vue';

/* ----- Data ----- */
const online = useOnline();
const {
  isNetworkDialogVisible,
  isSwitchingStore,
} = toRefs(useAuthStore());

/* ----- Watcher ----- */
watch(online, () => {
  if (!online.value) {
    isNetworkDialogVisible.value = true;
  }
});
</script>

<template>
  <SwitchStoreLoading v-if="isSwitchingStore" />
  <component :is="$route.meta.layout ?? Loading"></component>
  <NetworkDialog :online="online" v-if="!online" />
</template>
