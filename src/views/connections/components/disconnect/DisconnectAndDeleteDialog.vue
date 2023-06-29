<script setup>
import { ref } from 'vue';
import { useConnectionsStore } from '@/stores/connections';

/* ----- Components ----- */
import DialogWrapper from '@/components/shared/DialogWrapper.vue';

/* ----- Data ----- */
const connectionsStore = useConnectionsStore();
const isChecked = ref(false);

/* ----- Methods ----- */
const closeDialogHandler = () => {
  connectionsStore.isDisconnectAndDeleteRequested = false;
};

const closeOnDisconnectHandler = () => {
  closeDialogHandler();
  connectionsStore.isConnectionDisconnectRequested = false;
};

const disconnectHandler = async () => {
  await connectionsStore.deleteConnection(connectionsStore.selectedConnection.connection_id, false);
  closeOnDisconnectHandler();
};
</script>

<template>
  <DialogWrapper
    :isVisible="connectionsStore.isDisconnectAndDeleteRequested"
    @closeDialog="closeDialogHandler"
    title="Disconnect and Delete?"
    width="500px">
    <template #body>
      <section class="grid flex-column mt-1 px-3">
        <p class="mt-0">
          You are about to disconnect with
          <span class="text-danger font-semibold">{{ connectionsStore.selectedConnection.store_domain }}</span>
        </p>
        <p class="mt-0">Any products currently in sync with this store will be unsynced, and will be <strong>DELETED</strong>.</p>
        <p class="m-0">This action cannot be undone.</p>
        <div class="field-checkbox mt-4">
          <Checkbox inputId="action-confirmation" v-model="isChecked" :binary="true" />
          <label for="action-confirmation">I Understand this action cannot be undone.</label>
        </div>
      </section>
    </template>

    <template #footer>
      <Button label="Cancel" class="p-button-secondary" @click="closeDialogHandler"></Button>
      <Button label="Delete all Products" class="p-button-danger mr-0" @click="disconnectHandler" :disabled="!isChecked"></Button>
    </template>
  </DialogWrapper>
</template>
