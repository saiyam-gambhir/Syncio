<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useConnectionsStore } from '@/stores/connections';

/* ----- Components ----- */
const ConnectNewStoreDialog = defineAsyncComponent(() => import('./components/connect/ConnectNewStoreDialog.vue'));
const DisableMultilocationDialog = defineAsyncComponent(() => import('./components/multiLocation/DisableMultilocationDialog.vue'));
const DisconnectDialog = defineAsyncComponent(() => import('./components/disconnect/DisconnectDialog.vue'));
import AppLink from '@/components/shared/AppLink.vue';
import Connections from '@/views/connections/Connections.vue';
import ConnectionsViewSkeleton from '@/views/connections/ConnectionsViewSkeleton.vue';
import PageHeader from '@/components/shared/PageHeader.vue';

/* ----- Data ----- */
const connectionsStore = useConnectionsStore();
const options = ref(['Off', 'On']);

/* ----- Mounted ----- */
onMounted(async () => {
  if (connectionsStore.connections.length === 0) {
    await connectionsStore.fetchConnections();
    if (connectionsStore.isStoreMultilocation) await connectionsStore.fetchDestinationLocations();
  }
});

/* ----- Methods ----- */
const toggleMultilocationHandler = async event => {
  if (event.value === 'Off' && !connectionsStore.isDisableMultilocationRequested) {
    connectionsStore.isDisableMultilocationRequested = true;
    return;
  }

  await connectionsStore.toggleMultilocation();
  await connectionsStore.fetchDestinationLocations();
};
</script>

<template>
  <PageHeader
    content="Connect and manage your stores"
    title="Stores"
    withActions>
    <template #actions>
      <div class="flex align-items-center justify-content-between">
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
          v-model="connectionsStore.isMultilocationEnabled">
        </SelectButton>
      </div>

      <Button
        @click="connectionsStore.isConnectNewStoreRequested = true"
        class="ml-5"
        icon="pi pi-plus-circle"
        iconPos="right"
        label="Connect New Store">
      </Button>
    </template>
  </PageHeader>

  <article class="mt-4">
    <ConnectionsViewSkeleton v-if="connectionsStore.loadingConnections" />
    <Connections v-else />

    <ConnectNewStoreDialog v-if="connectionsStore.isConnectNewStoreRequested" />
    <DisconnectDialog v-if="connectionsStore.isConnectionDisconnectRequested" />
    <DisableMultilocationDialog v-if="connectionsStore.isDisableMultilocationRequested" />
  </article>
</template>
