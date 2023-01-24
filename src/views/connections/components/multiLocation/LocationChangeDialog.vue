<script setup>
import { useConnectionsStore } from '@/stores/connections'

/* ===== COMPONENTS ===== */
import AppLink from '@/components/shared/AppLink.vue'
import DialogWrapper from '@/components/shared/DialogWrapper.vue'

/* ===== DATA ===== */
const connectionsStore = useConnectionsStore()

/* ===== METHODS ===== */
const closeDialogHandler = () => {
  connectionsStore.isLocationChangeRequested = false
}
</script>

<template>
  <DialogWrapper :isVisible="connectionsStore.isLocationChangeRequested" title="Are you sure you want to change locations?" width="550px" @closeDialog="closeDialogHandler">
    <template #body>
      <section class="mt-1">
        <p class="mt-0">You cannot undo this action.</p>
        <p class="mt-0">We recommend you to back up your inventory quantity before proceeding.</p>
        <p class="mt-1">
          <AppLink link="https://help.syncio.co/en/articles/5791417-multi-locations-destination-store" label="Check out our guide" />
        </p>
      </section>
    </template>

    <template #footer>
      <Button icon="pi pi-times" label="Cancel" class="p-button-secondary ml-1" @click="closeDialogHandler"></Button>
      <Button icon="pi pi-check" label="Change Location" class="mr-0" @click="disconnectHandler"></Button>
    </template>
  </DialogWrapper>
</template>
