<script setup>
/* ----- Data ----- */
const {
  deleteConnection,
  isConnectionDisconnectRequested,
  isDisconnectAndKeepRequested,
  isShopify,
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
        <p class="m-0">
          You are about to disconnect with:
        </p>

        <div class="my-5 text-center">
          <Tag v-if="selectedConnection?.store_name" severity="danger" style="text-transform: none !important; font-size: 1rem !important;" class="flex-inline flex-column">
            <span>{{ selectedConnection.store_name }}</span>
            <span style="font-size: .9rem;" class="mt-1 font-normal">{{ selectedConnection.store_domain }}</span>
          </Tag>
          <Tag v-else severity="danger" style="text-transform: none !important; font-size: 1rem !important;">
            {{ selectedConnection.store_domain }}
          </Tag>
        </div>

        <p class="mt-0">Any products currently in sync with this store:</p>
        <ul class="p-0 pl-3 mt-0 mb-4 line-height-3">
          <li>will be unsynced</li>
          <li>will NOT be deleted</li>
          <li v-if="isShopify">stock will be set to Zero in the Destination store to prevent oversell</li>
        </ul>
        <p class="m-0">This action cannot be undone.</p>
        <p>For more detailed information about the impact of this choice, <br> <AppLink label="learn about disconnecting stores" link="https://help.syncio.co/en/articles/8988630-disconnecting-stores" /></p>
      </section>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <Button label="Cancel" class="p-button-secondary" @click="closeDialogHandler"></Button>
        <Button label="Disconnect and Keep" class="mr-0" @click="disconnectHandler"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
