<script setup>
import { useConnectionsStore } from '@/stores/connections'
import DialogWrapper from '@/components/shared/DialogWrapper.vue'

/* ===== DATA ===== */
const connectionsStore = useConnectionsStore()

/* ===== METHODS ===== */
const closeDialogHandler = () => {
  connectionsStore.isDisconnectAndDeleteRequested = false
}
</script>

<template>
  <DialogWrapper :isVisible="connectionsStore.isDisconnectAndDeleteRequested" title="Disconnect & Delete?" width="550px" @closeDialog="closeDialogHandler">
    <template #body>
      <section class="grid mt-2">
      </section>
    </template>
  </DialogWrapper>
</template>