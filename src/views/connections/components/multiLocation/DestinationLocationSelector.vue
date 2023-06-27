<script setup>
import { onMounted, ref, watch } from 'vue';
import { useConnections } from '../../composables/connections';
import { useConnectionsStore } from '@/stores/connections';
import { useRefHistory } from '@vueuse/core'

/* ----- Components ----- */
import DialogWrapper from '@/components/shared/DialogWrapper.vue';

/* ----- Props ----- */
const props = defineProps({
  connection: {
    type: Object,
    required: true,
  },
});

/* ----- Data ----- */
const connection = ref(props.connection);
const { history, undo } = useRefHistory(connection, { deep: true })
const connections = useConnections();
const connectionsStore = useConnectionsStore();
const showConfirmation = ref(false)

/* ----- Mounted ----- */
onMounted(() => {
  connectionsStore.currentLocation = { ...connectionsStore.currentLocation, ...props.connection?.destination_default_inventory_location };
  connectionsStore.selectedLocation = { ...connectionsStore.selectedLocation, ...props.connection?.destination_default_inventory_location };
});

/* ----- Methods ----- */
const onChangeHandler = event => {
  connectionsStore.selectedConnection = props.connection
  let { id, name } = connectionsStore.destinationLocations.filter(location => location.name.toLowerCase() === event.value.toLowerCase())[0];
  connectionsStore.selectedLocation = { external_reference_id: id, name }
  connections.isLocationChangeRequested = true;
};

const closeDialogHandler = () => {
  connections.isLocationChangeRequested = false;
  undo();
};

const closeDialogAndFetchConnectionsHandler = () => {
  connections.isLocationChanged = false;
  connections.fetchConnectionsHandler();
};

watch(connections.isLocationChanged, (newV, oldV) => {
  showConfirmation.value = newV
})
</script>

<template>
  <Dropdown v-if="connection.platform === 'shopify' && connectionsStore.selectedLocation?.name" class="w-100"
    :options="connectionsStore.destinationLocations" optionLabel="name" optionValue="name" placeholder="Select a Location"
    v-model="connection.destination_default_inventory_location.name" @change="onChangeHandler($event)">
  </Dropdown>

  <span v-else class="ml-3">{{ connectionsStore.selectedLocation }}</span>

  <DialogWrapper :isVisible="connections.isLocationChangeRequested"
    :title="showConfirmation ? 'Location Changed' : 'Confirm inventory location change'" width="475px"
    @closeDialog="closeDialogHandler">
    <template #body>
      <section v-if="showConfirmation" class="text-center">
        <p class="mt-0">
          <strong>{{ connectionsStore.selectedConnection.store_domain }}'s</strong> products will be resynced
          to reflect the new location's inventory quantity.
        </p>
        <p>This may take up to 24 hours.</p>
        <p class="mb-0">An e-mail will be sent to you once the resync is completed.</p>
      </section>

      <section v-else>
        <p class="mt-0">You're about to change the inventory receiving location for <br> <strong>{{
          connectionsStore.selectedConnection.store_domain
        }}</strong></p>
        <p><strong>From:</strong> {{ history[1].snapshot.destination_default_inventory_location.name }}</p>
        <p class="mb-0"><strong>To:</strong> {{ history[0].snapshot.destination_default_inventory_location.name }}</p>
      </section>
    </template>

    <template #footer>
      <Button v-if="showConfirmation" label="OK" class="mr-0" @click="closeDialogAndFetchConnectionsHandler"></Button>
      <div v-else>
        <Button label="Cancel" class="p-button-secondary ml-1" @click="closeDialogHandler"></Button>
        <Button label="Confirm" class="mr-0" :loading="connectionsStore.loadingLocationChange"
          @click="connections.locationChangeHandler"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
