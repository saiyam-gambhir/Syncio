<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { useConnectionsStore } from '@/stores/connections'
import { useToasts } from '@/composables/toasts'

/* ===== COMPONENTS ===== */
import AppLink from '@/components/shared/AppLink.vue'
import Connections from '@/views/connections/Connections.vue'
import ConnectionsViewSkeleton from '@/views/connections/ConnectionsViewSkeleton.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
const DisableMultilocationDialog = defineAsyncComponent(() => import('./components/multiLocation/DisableMultilocationDialog.vue'))
const DisconnectDialog = defineAsyncComponent(() => import('./components/disconnect/DisconnectDialog.vue'))
const LocationChangeDialog = defineAsyncComponent(() => import('./components/multiLocation/LocationChangeDialog.vue'))
const SetCommissionDialog = defineAsyncComponent(() => import('./components/SetCommissionDialog.vue'))

/* ===== DATA ===== */
const connections = useConnectionsStore()
const options = ref(['Off', 'On'])
const { showToast } = useToasts()

/* ===== MOUNTED ===== */
onMounted(async () => {
  if(connections.connections.length > 0) return
	await connections.fetchConnections()
  if(connections.isStoreMultilocation) await connections.fetchDestinationLocations()
})

/* ===== METHODS ===== */
const closeDialogHandler = () => {
  connections.isSetCommissionRequested = false
}

const toggleMultilocationHandler = async (event) => {
  if(event.value === 'Off' && !connections.isDisableMultilocationRequested) {
    connections.isDisableMultilocationRequested = true
    return
  }
  const message = await connections.toggleMultilocation()
  showToast({ detail: message })
  await connections.fetchDestinationLocations()

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
          Multi-Location
          <br />
          <AppLink link="https://help.syncio.co/en/articles/5842693-multilocations-for-destination-stores" label="Read More" class="mt-1" />
        </h4>
        <SelectButton v-model="connections.isMultilocationEnabled" :options="options" aria-labelledby="single" @change="toggleMultilocationHandler($event)" />
      </div>
      <Button label="Connect New Store" class="ml-5" icon="pi pi-plus-circle" iconPos="right" />
    </template>
  </PageHeader>

	<article class="mt-4">
    <ConnectionsViewSkeleton v-if="connections.loadingConnections" />
    <Connections v-else />

    <DisconnectDialog v-if="connections.isConnectionDisconnectRequested" />
    <LocationChangeDialog v-if="connections.isLocationChangeRequested" />
    <SetCommissionDialog v-if="connections.isSetCommissionRequested" />
    <DisableMultilocationDialog v-if="connections.isDisableMultilocationRequested" />
	</article>
</template>
