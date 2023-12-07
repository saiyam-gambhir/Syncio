<script setup>
/* ----- Components ----- */
const ConnectNewStoreDialog = defineAsyncComponent(() => import('./components/connect/ConnectNewStoreDialog.vue'));
const DisableMultilocationDialog = defineAsyncComponent(() => import('./components/multiLocation/DisableMultilocationDialog.vue'));
const DisconnectDialog = defineAsyncComponent(() => import('./components/disconnect/DisconnectDialog.vue'));

/* ----- Data ----- */
const {
  connections,
  fetchConnections,
  fetchDestinationLocations,
  fetchSourceLocations,
  isConnectionDisconnectRequested,
  isDestinationStore,
  isDisableMultilocationRequested,
  isMultilocationEnabled,
  isNewStoreConnectionRequested,
  isSourceStore,
  isStoreMultilocation,
  loadingConnections,
  toggleMultilocation,
} = toRefs(useConnectionsStore());

const options = ref(['Off', 'On']);

/* ----- Mounted ----- */
onMounted(async () => {
  if (connections.value.length === 0) {
    await fetchConnections.value();
    if (isStoreMultilocation.value && isDestinationStore.value) await fetchDestinationLocations.value();
    if(isSourceStore) await fetchSourceLocations.value();
  }
});

/* ----- Methods ----- */
const toggleMultilocationHandler = async event => {
  if (event.value === 'Off' && !isDisableMultilocationRequested.value) {
    isDisableMultilocationRequested.value = true;
    return;
  }

  await toggleMultilocation.value();
  await fetchDestinationLocations.value();
};
</script>

<template>
  <PageHeader
    content="Connect and manage your stores"
    title="Stores"
    withActions>
    <template #actions>
      <div v-if="isDestinationStore" class="flex align-items-center justify-content-between">
        <h4 class="my-0 mr-4">
          Multi-Location
          <br />
          <AppLink
            link="https://help.syncio.co/en/articles/5842693-multilocations-for-destination-stores"
            label="Read More"
            class="mt-1">
          </AppLink>
        </h4>

        <SelectButton
          :options="options"
          @change="toggleMultilocationHandler($event)"
          aria-labelledby="single"
          v-model="isMultilocationEnabled">
        </SelectButton>
      </div>

      <Button
        @click="isNewStoreConnectionRequested = true"
        class="ml-5 p-button-success"
        label="Connect new store">
      </Button>
    </template>
  </PageHeader>

  <article class="mt-2">
    <ConnectionsViewSkeleton v-if="loadingConnections" />
    <Connections v-else />
  </article>

  <ConnectNewStoreDialog v-if="isNewStoreConnectionRequested" />
  <DisconnectDialog v-if="isConnectionDisconnectRequested" />
  <DisableMultilocationDialog v-if="isDisableMultilocationRequested" />
</template>
