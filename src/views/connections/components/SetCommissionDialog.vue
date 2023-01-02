<script setup>
import { useConnectionsStore } from '@/stores/connections'

/* ===== COMPONENTS ===== */
import DialogWrapper from '@/components/shared/DialogWrapper.vue'

/* ===== DATA ===== */
const connectionsStore = useConnectionsStore()

/* ===== METHODS ===== */
const closeDialogHandler = () => {
  connectionsStore.isSetCommissionRequested = false
}
</script>

<template>
  <DialogWrapper :isVisible="connectionsStore.isSetCommissionRequested" title="Set commission" width="600px" @closeDialog="closeDialogHandler">

  </DialogWrapper>
</template>
