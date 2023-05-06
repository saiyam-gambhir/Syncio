<script setup>
import { defineAsyncComponent, watch } from 'vue'
import { useBattery, useOnline } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth'

/* ===== COMPONENTS ===== */
import Loading from './Loading.vue'
const BatteryLowDialog = defineAsyncComponent(() => import('./components/shared/BatteryLowDialog.vue'))
const NetworkDialog = defineAsyncComponent(() => import('./components/shared/NetworkDialog.vue'))

/* ===== DATA ===== */
const { charging, level } = useBattery()
const online = useOnline()
const auth = useAuthStore()

/* ===== WATCHER ===== */
watch(online, () => {
  if(!online.value) {
    auth.isNetworkDialogVisible = true
  }
})

watch(level, () => {
  if(level.value < .21 && !charging.value) {
    auth.isBatteryLowDialogVisible = true
  }
})
</script>

<template>
  <component :is="$route.meta.layout ?? Loading"></component>
  <NetworkDialog :online="online" v-if="!online" />
  <BatteryLowDialog :level="level" v-if="auth.isBatteryLowDialogVisible" />
</template>
