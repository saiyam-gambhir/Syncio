<script setup>
import { onMounted, ref } from 'vue';
import { useConnectionsStore } from '@/stores/connections';

/* ----- Props ----- */
const props = defineProps({
  connection: {
    type: Object,
    required: true,
  },
});

/* ----- Data ----- */
const connectionsStore = useConnectionsStore();

/* ----- MOUNTED ----- */
onMounted(() => {
  connectionsStore.currentLocation = { ...connectionsStore.currentLocation, ...props.connection?.destination_default_inventory_location };
  connectionsStore.selectedLocation = { ...connectionsStore.selectedLocation, ...props.connection?.destination_default_inventory_location };
});

/* ----- Methods ----- */
const onChangeHandler = event => {
  connectionsStore.selectedConnection = props.connection
  let { id, name } = connectionsStore.destinationLocations.filter(location => location.name.toLowerCase() === event.value.toLowerCase())[0];
  connectionsStore.selectedLocation = { external_reference_id: id, name }
  connectionsStore.isLocationChangeRequested = true;
};
</script>

<template>
  <Dropdown v-if="connection.platform === 'shopify' && connectionsStore.selectedLocation?.name" class="w-100"
    :options="connectionsStore.destinationLocations" optionLabel="name" optionValue="name" placeholder="Select a Location"
    v-model="connectionsStore.selectedLocation.name" @change="onChangeHandler($event)">
  </Dropdown>

  <span v-else class="ml-3">{{ connectionsStore.selectedLocation }}</span>
</template>
