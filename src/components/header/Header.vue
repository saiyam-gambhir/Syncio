<script setup>
import { useConnectionsStore } from '@/stores/connections'
import { useBattery } from '@vueuse/core'

/* ===== DATA ===== */
const connections = useConnectionsStore()
const { level } = useBattery()
</script>

<template>
  <header class="header-height surface-section border-bottom-1 surface-border flex align-items-center justify-content-between px-5">
    <div class="header-left">
      {{ level*100 }}%
    </div>
    <div class="header-right">
      <Tag :value="`${connections.storeType} store`" :class="connections.storeType" />
      <Tag :value="connections.storeName" :class="connections.storeType" class="store-name ml-3" />
    </div>
  </header>
</template>
