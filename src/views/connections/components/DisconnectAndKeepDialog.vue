<script setup>
import { useConnectionsStore } from '@/stores/connections'
import DialogWrapper from '@/components/shared/DialogWrapper.vue'

/* ===== DATA ===== */
const connectionsStore = useConnectionsStore()

/* ===== METHODS ===== */
const closeDialogHandler = () => {
  connectionsStore.isDisconnectAndKeepRequested = false
}
</script>

<template>
  <DialogWrapper :isVisible="connectionsStore.isDisconnectAndKeepRequested" title="Disconnect & Keep?" width="550px" @closeDialog="closeDialogHandler">
    <template #body>
      <section class="grid mt-2">
      </section>
    </template>
  </DialogWrapper>
</template>
