<script setup>
/* ----- Data ----- */
const inventoryReferenceId = ref(0);

const {
  isLocationChangeRequested,
  location,
  loadingInventory,
  sourceLocations,
  storeId,
  storeType,
} = toRefs(useConnectionsStore());

/* ----- Props ----- */
const props = defineProps({
  connection: {
    required: true,
    type: Object,
  }
});

/* ----- Mounted ----- */
onMounted(() => {
  const sourceInventoryReferenceId = props.connection?.source_default_inventory_location?.external_reference_id;
  const destinationInventoryReferenceId = +props.connection?.destination_default_inventory_location?.external_reference_id;
  if (props.connection?.status === 'pending' && !(+props.connection?.is_multi_locations)) { // ML is off
    inventoryReferenceId.value = null;
  } else if (props.connection?.status === 'pending' && destinationInventoryReferenceId && !sourceInventoryReferenceId) { // ML on, DS has location set
    inventoryReferenceId.value = null;
  } else {
    inventoryReferenceId.value = sourceInventoryReferenceId ? +sourceInventoryReferenceId : 0;
  }
});

/* ----- Methods ----- */
const updateInventoryHandler = async inventoryId => {
  if((inventoryId.value === +props.connection.source_default_inventory_location?.external_reference_id) || (inventoryId.value === 0 && !props.connection.source_default_inventory_location)) return;

  const selectedInventory = sourceLocations.value.find(inventory => inventory.id === inventoryId.value);

  const { source_default_inventory_location, store_domain, store_name } = props.connection;
  const currentLocation = sourceLocations?.value?.find(
    location => location.id === +source_default_inventory_location?.external_reference_id
  ) ?? { id: 0, name: 'All Locations' }

  location.value = {
    current: currentLocation,
    new: selectedInventory,
    store: store_domain,
    storeName: store_name,
  }

  isLocationChangeRequested.value = true;

  const payload = {
    d_inventory_reference: +props.connection?.destination_default_inventory_location?.external_reference_id,
    destination_store_id: +props.connection?.id,
    is_default: true,
    name: selectedInventory?.name,
    s_inventory_reference: selectedInventory?.id,
    source_store_id: storeId.value,
    store_type: storeType.value,
    sync_option: 'keep',
  };

  location.value.params = payload;
};
</script>

<template>
  <Dropdown
    :autoOptionFocus="false"
    :loading="loadingInventory"
    :options="sourceLocations"
    @change="updateInventoryHandler"
    class="w-full"
    optionLabel="name"
    optionValue="id"
    placeholder="Select Location"
    v-if="connection.platform === 'shopify'"
    v-model="inventoryReferenceId">
  </Dropdown>

  <span v-else class="pl-3">All locations</span>
</template>
