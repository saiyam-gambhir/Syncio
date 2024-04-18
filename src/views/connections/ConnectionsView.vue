<script setup>
/* ----- Components ----- */
const ConnectNewStoreDialog = defineAsyncComponent(() => import('./components/connect/ConnectNewStoreDialog.vue'));
const DisableMultilocationDialog = defineAsyncComponent(() => import('./components/multiLocation/DisableMultilocationDialog.vue'));
const DisconnectDialog = defineAsyncComponent(() => import('./components/disconnect/DisconnectDialog.vue'));
const LocationChangeConfirmationDialog = defineAsyncComponent(() => import('./components/multiLocation/LocationChangeConfirmationDialog.vue'));
const LocationChangedDialog = defineAsyncComponent(() => import('./components/multiLocation/LocationChangedDialog.vue'));
const LocationPendingDialog = defineAsyncComponent(() => import('./components/multiLocation/LocationPendingDialog.vue'));

/* ----- Data ----- */
const {
  clickedStore,
  connections,
  fetchConnections,
  fetchDestinationLocations,
  fetchSourceLocations,
  isConnectionDisconnectRequested,
  isDestinationStore,
  isDisableMultilocationRequested,
  isLocationChanged,
  isLocationChangeRequested,
  isLocationPendingDialogRequested,
  isMultilocationEnabled,
  isNewStoreConnectionRequested,
  isShopify,
  isSourceStore,
  isStoreMultilocation,
  loadingConnections,
  toggleMultilocation,
} = toRefs(useConnectionsStore());

const options = ref(['Off', 'On']);

/* ----- Mounted ----- */
onMounted(async () => {
  isLocationPendingDialogRequested.value = false;

  if (connections.value?.length === 0) {
    await fetchConnections.value();
  }

  if(isStoreMultilocation.value && isDestinationStore.value) await fetchDestinationLocations.value();
  if(isSourceStore.value) await fetchSourceLocations.value();
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
  <PageHeader title="Stores" withActions withLink>
    <template #header>
      Connect and manage your stores <br>
      <AppLink link="https://help.syncio.co/en/articles/5596700-connecting-to-a-store" label="Learn about connecting to a store" />
    </template>
    <template #actions>
      <div v-if="isDestinationStore && isShopify" class="flex align-items-center justify-content-between">
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
        class="ml-4 p-button-success"
        label="Connect new store">
      </Button>
    </template>
  </PageHeader>

  <article class="mt-2">
    <ConnectionsViewSkeleton v-if="loadingConnections" />
    <Connections v-else />
  </article>

  <!-- Connect new store dialog -->
  <ConnectNewStoreDialog v-if="isNewStoreConnectionRequested" />

  <!-- Disable multilocation dialog -->
  <DisableMultilocationDialog v-if="isDisableMultilocationRequested" />

  <!-- Disconnect store dialog -->
  <DisconnectDialog v-if="isConnectionDisconnectRequested" />

  <!-- Location change confirmation dialog -->
  <LocationChangeConfirmationDialog v-if="isLocationChangeRequested" />

  <!-- Location changed dialog -->
  <LocationChangedDialog v-if="isLocationChanged" />

  <!-- Location pending dialog -->
  <LocationPendingDialog v-if="isLocationPendingDialogRequested" />
</template>
