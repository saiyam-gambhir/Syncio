<script setup>
import { useConnectionsStore } from '@/stores/connections'
import DialogWrapper from '@/components/shared/DialogWrapper.vue'

/* ===== DATA ===== */
const connectionsStore = useConnectionsStore()

const hideDialogHandler = () => {
  connectionsStore.isConnectionDisconnectRequested = false
}
</script>

<template>
  <DialogWrapper :isVisible="connectionsStore.isConnectionDisconnectRequested" title="Select a disconnect option" @hideDialog="hideDialogHandler">

  </DialogWrapper>
</template>
