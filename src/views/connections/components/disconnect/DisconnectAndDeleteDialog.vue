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
    title="Disconnect and Delete?"
    width="500px">
    <template #body>
      <section class="grid flex-column mt-1 px-3">
        <p class="mt-0">
          You are about to disconnect with
          <span class="text-danger font-semibold">{{ selectedConnection.store_domain }}</span>
        </p>
        <p class="mt-0">Any products currently in sync with this store will be:</p>
        <ul class="p-0 pl-3 mt-0 mb-4 line-height-3">
          <li>unsynced</li>
          <li><strong>DELETED</strong> in the Destination store</li>
        </ul>
        <p class="m-0">This action cannot be undone.</p>
        <p class="mb-0">For more detailed information about the impact of this choice, <br> <AppLink label="learn about disconnecting stores" link="" /></p>
        <div class="field-checkbox mt-4">
          <Checkbox inputId="action-confirmation" v-model="isChecked" :binary="true" />
          <label for="action-confirmation">I Understand this action cannot be undone.</label>
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
