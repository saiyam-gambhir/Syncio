<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { useConnectionsStore } from '@/stores/connections'

/* ===== COMPONENTS ===== */
import AppLink from '@/components/shared/AppLink.vue'
import Connections from '@/views/connections/Connections.vue'
import ConnectionsViewSkeleton from '@/views/connections/ConnectionsViewSkeleton.vue'
import DialogWrapper from '@/components/shared/DialogWrapper.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
const DisableMultilocationDialog = defineAsyncComponent(() => import('@/views/connections/components/multiLocation/DisableMultilocationDialog.vue'))
const DisconnectDialog = defineAsyncComponent(() => import('@/views/connections/components/disconnect/DisconnectDialog.vue'))
const LocationChangeDialog = defineAsyncComponent(() => import('@/views/connections/components/multiLocation/LocationChangeDialog.vue'))
const SetCommissionDialog = defineAsyncComponent(() => import('@/views/connections/components/SetCommissionDialog.vue'))

/* ===== DATA ===== */
const connectionsStore = useConnectionsStore()
const options = ref(['Off', 'On'])

/* ===== MOUNTED ===== */
onMounted(async () => {
  if(connectionsStore.connections.length > 0) return
	await connectionsStore.fetchConnections()
  if(connectionsStore.isStoreMultilocation) await connectionsStore.fetchDestinationLocations()
})

/* ===== METHODS ===== */
const closeDialogHandler = () => {
  connectionsStore.isSetCommissionRequested = false
}

const toggleMultilocationHandler = async (event) => {
  if(event.value === 'Off' && !connectionsStore.isDisableMultilocationRequested) {
    connectionsStore.isDisableMultilocationRequested = true
    return
  }
  await connectionsStore.toggleMultilocation()
  await connectionsStore.fetchDestinationLocations()
}
</script>

<template>
  <PageHeader
    content="Connect and manage your stores"
    title="Stores"
    withActions>

    <template #actions>
      <div class="flex align-items-center justify-content-between">
        <h4 class="my-0 mr-4">
          Multi-Location (BETA)
          <br />
          <AppLink link="https://help.syncio.co/en/articles/5842693-multilocations-for-destination-stores" label="Read More" class="mt-1" />
        </h4>
        <SelectButton v-model="connectionsStore.isMultilocationEnabled" :options="options" aria-labelledby="single" @change="toggleMultilocationHandler($event)" />
      </div>
      <Button label="Connect New Store" class="ml-5" icon="pi pi-plus-circle" iconPos="right" />
    </template>
  </PageHeader>

	<article class="mt-4">
    <ConnectionsViewSkeleton v-if="connectionsStore.loadingConnections" />
    <Connections v-else />

    <DisconnectDialog v-if="connectionsStore.isConnectionDisconnectRequested" />
    <LocationChangeDialog v-if="connectionsStore.isLocationChangeRequested" />
    <SetCommissionDialog v-if="connectionsStore.isSetCommissionRequested" />
    <DisableMultilocationDialog v-if="connectionsStore.isDisableMultilocationRequested" />
	</article>
</template>
