<script setup>
import { useConnectionsStore } from '@/stores/connections'
import DialogWrapper from '@/components/shared/DialogWrapper.vue'

/* ----- DATA ----- */
const connectionsStore = useConnectionsStore()

/* ----- METHODS ----- */
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
  <DialogWrapper :isVisible="connectionsStore.isDisconnectAndKeepRequested" title="Disconnect and Keep?" width="500px" @closeDialog="closeDialogHandler">
    <template #body>
      <section class="grid flex-column mt-1 px-3">
        <p class="mt-0">You are about to disconnect with <span class="text-danger font-semibold">{{ connectionsStore.selectedConnection.store_domain }}</span></p>
        <p class="mt-0">Any products currently in sync with this store will be unsynced, but will not be deleted.</p>
        <p class="m-0">This action cannot be undone.</p>
      </section>
    </template>

    <template #footer>
      <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" @click="closeDialogHandler"></Button>
      <Button icon="pi pi-check" label="Disconnect and Keep" class="mr-0" @click="disconnectHandler"></Button>
    </template>
  </DialogWrapper>
</template>
