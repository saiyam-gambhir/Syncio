<script setup>
/* ----- Data ----- */
const {
  deleteConnection,
  isConnectionDisconnectRequested,
  isDisconnectAndDeleteRequested,
  selectedConnection,
} = toRefs(useConnectionsStore());

const isChecked = ref(false);

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isDisconnectAndDeleteRequested.value = false;
};

const closeOnDisconnectHandler = () => {
  closeDialogHandler();
  isConnectionDisconnectRequested.value = false;
};

const disconnectHandler = async () => {
  await deleteConnection.value(selectedConnection.value.connection_id, false);
  closeOnDisconnectHandler();
};
</script>

<template>
  <DialogWrapper
    :isVisible="isDisconnectAndDeleteRequested"
    @closeDialog="closeDialogHandler"
    title="Confirm disconnect and delete"
    width="550px">
    <template #body>
      <section class="grid flex-column px-3 text-700">
        <p class="m-0">
          You are about to disconnect from:
        </p>

        <div class="mt-4 text-center">
          <div v-if="selectedConnection?.store_name" class="flex flex-column p-3 surface-200">
            <span class="font-semi">{{ selectedConnection.store_name }}</span>
            <span style="font-size: .9rem;" class="mt-1 font-normal">{{ selectedConnection.store_domain }}</span>
          </div>
          <div v-else class="flex flex-column p-3 surface-200 font-semi">
            {{ selectedConnection.store_domain }}
          </div>
        </div>

        <p class="px-3 py-4 surface-highlight my-3">
          Synced products from this store will be <Strong>unsynced</Strong> and <Strong>DELETED</Strong> from your store. You can't undo this action.
          <br> <AppLink label="Learn about disconnecting stores" link="https://help.syncio.co/en/articles/8988630-disconnecting-stores" />
        </p>
        <div class="field-checkbox mt-2 mb-0">
          <Checkbox inputId="action-confirmation" v-model="isChecked" :binary="true" />
          <label for="action-confirmation">I understand this action can't be undone</label>
        </div>
      </section>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <Button label="Cancel" class="p-button-secondary" @click="closeDialogHandler"></Button>
        <Button label="Delete all Products" class="p-button-danger mr-0" @click="disconnectHandler" :disabled="!isChecked"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
