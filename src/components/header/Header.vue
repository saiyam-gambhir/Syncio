<script setup>
import { defineAsyncComponent, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useBattery, useOnline } from '@vueuse/core'
import { useConnectionsStore } from '@/stores/connections'

/* ===== COMPONENTS ===== */
import NetworkDialog from './components/NetworkDialog.vue'
const BatteryLowDialog = defineAsyncComponent(() => import('./components/BatteryLowDialog.vue'))

/* ===== DATA ===== */
const { charging, level } = useBattery()
const auth = useAuthStore()
const connections = useConnectionsStore()
const online = useOnline()

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
  <header class="header-height surface-section border-bottom-1 surface-border flex align-items-center justify-content-between px-5">
    <div class="header-left">
    </div>
    <div class="header-right">
      <Tag :value="`${connections.storeType} store`" :class="connections.storeType" />
      <Tag :value="connections.storeName" :class="connections.storeType" class="store-name ml-3" />
    </div>

    <NetworkDialog :online="online" />
    <BatteryLowDialog :level="level" v-if="auth.isBatteryLowDialogVisible" />
  </header>
</template>
