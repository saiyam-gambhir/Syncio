<script setup>
import { useConnectionsStore } from '@/stores/connections'
const connections = useConnectionsStore()
</script>

<template>
  <header class="header-height surface-section border-bottom-1 surface-border flex align-items-center justify-content-between px-5">
    <div class="header-left">
    </div>
    <div class="header-right">
      <Tag :value="`${connections.storeType} store`" :class="connections.storeType" rounded />
    </div>
  </header>
</template>
