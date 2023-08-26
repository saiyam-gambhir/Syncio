<script setup>
import { useConnectionsStore } from '@/stores/connections';

/* ----- Components ----- */
import DialogWrapper from '@/components/shared/DialogWrapper.vue';

/* ----- Data ----- */
const {
  deleteConnection,
  isConnectionDisconnectRequested,
  isDisconnectAndKeepRequested,
  selectedConnection,
} = toRefs(useConnectionsStore());

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isDisconnectAndKeepRequested.value = false;
};

const closeOnDisconnectHandler = () => {
  closeDialogHandler();
  isConnectionDisconnectRequested.value = false;
};

const disconnectHandler = async () => {
  await deleteConnection.value(selectedConnection.value.connection_id);
  closeOnDisconnectHandler();
};
</script>

<template>
  <DialogWrapper
    :isVisible="isDisconnectAndKeepRequested"
    @closeDialog="closeDialogHandler"
    title="Disconnect and Keep?"
    width="500px">
    <template #body>
      <section class="grid flex-column mt-1 px-3">
        <p class="mt-0">
          You are about to disconnect with
          <span class="text-danger font-semibold">{{ selectedConnection.store_domain }}</span>
        </p>
        <p class="mt-0">Any products currently in sync with this store will be unsynced, but will not be deleted.
        </p>
        <p class="m-0">This action cannot be undone.</p>
      </section>
    </template>

    <template #footer>
      <Button label="Cancel" class="p-button-secondary" @click="closeDialogHandler"></Button>
      <Button label="Disconnect and Keep" class="mr-0" @click="disconnectHandler"></Button>
    </template>
  </DialogWrapper>
</template>
