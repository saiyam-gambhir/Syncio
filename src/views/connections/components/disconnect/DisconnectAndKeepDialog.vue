<script setup>
import { useConnectionsStore } from '@/stores/connections'
import DialogWrapper from '@/components/shared/DialogWrapper.vue'

/* ===== DATA ===== */
const connectionsStore = useConnectionsStore()

/* ===== METHODS ===== */
const closeDialogHandler = () => {
  connectionsStore.isDisconnectAndKeepRequested = false
}

const closeOnDisconnectHandler = () => {
  closeDialogHandler()
  connectionsStore.isConnectionDisconnectRequested = false
}

const disconnectHandler = async () => {
  await connectionsStore.deleteConnection(connectionsStore.selectedConnection.connection_id)
  closeOnDisconnectHandler()
}
</script>

<template>
  <DialogWrapper :isVisible="connectionsStore.isDisconnectAndKeepRequested" title="Disconnect & Keep?" width="500px" @closeDialog="closeDialogHandler">
    <template #body>
      <section class="grid mt-1 px-3">
        <p class="mt-0">You are about to disconnect with <span class="text-danger font-semibold">{{ connectionsStore.selectedConnection.store_domain }}</span></p>
        <p class="mt-0">Any products currently in sync with this store will be unsynced, but will not be deleted.</p>
        <p class="m-0">This action cannot be undone.</p>
        <div class="flex justify-content-end mt-6 w-full">
          <Button label="Disconnect & Keep" class="mr-2" @click="disconnectHandler"></Button>
          <Button label="Cancel" class="p-button-secondary" @click="closeDialogHandler"></Button>
        </div>
      </section>
    </template>
  </DialogWrapper>
</template>
