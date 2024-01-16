<script setup>
import { useOnline } from '@vueuse/core';

/* ----- Components ----- */
import Loading from './Loading.vue';

/* ----- Data ----- */
const online = useOnline();
const auth = useAuthStore();

/* ----- Watcher ----- */
watch(online, () => {
  if (!online.value) {
    auth.isNetworkDialogVisible = true;
  }
});
</script>

<template>
  <component :is="$route.meta.layout ?? Loading"></component>
  <NetworkDialog :online="online" v-if="!online" />
</template>
