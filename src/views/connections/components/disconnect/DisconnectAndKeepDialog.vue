<script setup>
/* ----- Data ----- */
const {
  deleteConnection,
  isConnectionDisconnectRequested,
  isDisconnectAndKeepRequested,
  isSourceStore,
  selectedConnection,
} = toRefs(useConnectionsStore());

const selectedOption = ref();
const disconnectOptions = ref([
  { name: 'YES - Set Destination store stock to zero for synced products', val: true },
  { name: 'NO - Keep Destination store stock as is for synced products', val: false },
]);

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isDisconnectAndKeepRequested.value = false;
};

const closeOnDisconnectHandler = () => {
  closeDialogHandler();
  isConnectionDisconnectRequested.value = false;
};

const disconnectHandler = async () => {
  await deleteConnection.value(selectedConnection.value.connection_id, true, selectedOption.value.val);
  closeOnDisconnectHandler();
};
</script>

<template>
  <DialogWrapper
    :isVisible="isDisconnectAndKeepRequested"
    @closeDialog="closeDialogHandler"
    title="Confirm disconnect and keep"
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
          Synced products from this store will be <Strong>unsynced</Strong> and <Strong>NOT deleted</Strong> from your store. Impacted products in your store won't receive any more updates. <AppLink label="Learn about disconnecting stores" link="https://help.syncio.co/en/articles/8988630-disconnecting-stores" />
        </p>

        <p class="font-semi text-lg mt-2 mb-1">Set Destination store stock to zero?</p>
        <p class="m-0">This can't be undone. Prevents oversell for the Destination store.</p>

        <Dropdown
          :autoOptionFocus="false"
          v-model="selectedOption"
          :options="disconnectOptions"
          optionLabel="name"
          placeholder="Select an option"
          class="w-full mt-2">
        </Dropdown>

        <p v-if="isSourceStore && selectedOption" class="text-highlight mb-0">Make sure you inform the Destination store, so they can decide how to manage the products in their store</p>

      </section>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <Button label="Cancel" class="p-button-secondary" @click="closeDialogHandler"></Button>
        <Button :disabled="!selectedOption" label="Disconnect and Keep" class="mr-0 p-button-danger" @click="disconnectHandler"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
