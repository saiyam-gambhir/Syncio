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

  //TODO - Need to improve this in the future
  if (props.connection?.status === 'pending') {
    if (!(props.connection?.is_multi_location) && !sourceInventoryReferenceId) { // ML is off, SS deactivated location
      inventoryReferenceId.value = null;
    } else if (destinationInventoryReferenceId && !sourceInventoryReferenceId) { // ML is on, SS deactivated
      inventoryReferenceId.value = null;
    } else if (!destinationInventoryReferenceId && !sourceInventoryReferenceId) { // ML is on, DS deactivated (SS may or may not have deactivated)
      // This needs to be looked into in the future. If DS deactivates and SS has all locations, set to null to show SS there's a deactivation
      // This is due to no difference between deactivated store and all locations in back-end
      inventoryReferenceId.value = null; 
    } else {
      inventoryReferenceId.value = +sourceInventoryReferenceId;
    }
  } else { // Status is active
    inventoryReferenceId.value = sourceInventoryReferenceId ? +sourceInventoryReferenceId : 0;
  }
});

/* ----- Methods ----- */
const updateInventoryHandler = async inventoryId => {
  //Prevent user from selecting already selected item menu
  const allLocationsStatus = props.connection?.status === 'active' || (props.connection?.status === 'pending' && +props.connection?.is_multi_location && !props.connection?.destination_default_inventory_location?.external_reference_id);

  const defaultSourceLocation = +props.connection.source_default_inventory_location?.external_reference_id === 0 ? null : +props.connection.source_default_inventory_location?.external_reference_id;

  if ((inventoryId.value === defaultSourceLocation) || ((inventoryId.value === 0 && !props.connection.source_default_inventory_location) && allLocationsStatus)) {
    return;
  }

  const selectedInventory = sourceLocations.value.find(inventory => inventory.id === inventoryId.value);

  const { source_default_inventory_location, store_domain, store_name } = props.connection;
  const currentLocation = sourceLocations?.value?.find(
    location => location.id === +source_default_inventory_location?.external_reference_id
  ) ?? {id: 0, name: 'All Locations'};

  location.value = {
    current: currentLocation,
    new: selectedInventory,
    store: store_domain,
    storeName: store_name,
    status: props.connection.status
  }

  isLocationChangeRequested.value = true;

  const payload = {
    d_inventory_reference: props.connection?.destination_default_inventory_location?.external_reference_id,
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
