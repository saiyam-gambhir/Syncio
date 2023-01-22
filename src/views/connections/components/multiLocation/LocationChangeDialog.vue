<script setup>
import { useConnectionsStore } from '@/stores/connections'
import DialogWrapper from '@/components/shared/DialogWrapper.vue'

/* ===== DATA ===== */
const connectionsStore = useConnectionsStore()

/* ===== METHODS ===== */
const closeDialogHandler = () => {
  connectionsStore.isLocationChangeRequested = false
}

const closeOnDisconnectHandler = () => {
}

// const disconnectHandler = async () => {
//   await connectionsStore.deleteConnection(connectionsStore.selectedConnection.connection_id, false)
//   closeOnDisconnectHandler()
// }
</script>

<template>
  <DialogWrapper :isVisible="connectionsStore.isLocationChangeRequested" title="Are you sure you want to change locations?" width="550px" @closeDialog="closeDialogHandler">
    <template #body>
      <section class="mt-1 px-3 text-center">
        <p class="mt-0">You cannot undo this action.</p>
        <p class="mt-0">We recommend you to back up your inventory quantity before proceeding.</p>
        <p class="mt-1">
          <a href="https://help.syncio.co/en/articles/5791417-multi-locations-destination-store" class="btn-link" target="_black">Check out our guide.</a>
        </p>
        <div class="flex justify-content-center mt-6 w-full">
          <Button label="Change Location" class="mr-2" @click="disconnectHandler"></Button>
          <Button label="Cancel" class="p-button-secondary" @click="closeDialogHandler"></Button>
        </div>
      </section>
    </template>
  </DialogWrapper>
</template>
