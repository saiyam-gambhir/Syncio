<script setup>
import { useBattery, useOnline } from '@vueuse/core';

/* ----- Components ----- */
import Loading from './Loading.vue';
const BatteryLowDialog = defineAsyncComponent(() => import('./components/shared/BatteryLowDialog.vue'));

/* ----- Data ----- */
const { charging, level } = useBattery();
const online = useOnline();
const auth = useAuthStore();

/* ----- Watcher ----- */
watch(online, () => {
  if (!online.value) {
    auth.isNetworkDialogVisible = true;
  }
});

watch(level, () => {
  if (level.value < 0.3 && !charging.value) {
    //auth.isBatteryLowDialogVisible = true;
  }
});
</script>

<template>
  <component :is="$route.meta.layout ?? Loading"></component>
  <NetworkDialog :online="online" v-if="!online" />
  <BatteryLowDialog :level="level" v-if="auth.isBatteryLowDialogVisible" />
</template>
