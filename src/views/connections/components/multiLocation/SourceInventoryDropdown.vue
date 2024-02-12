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
  if (props.connection?.status === 'pending') {
    inventoryReferenceId.value = null;
  } else {
    inventoryReferenceId.value = sourceInventoryReferenceId ? +sourceInventoryReferenceId : 0;
  }
});

/* ----- Methods ----- */
const updateInventoryHandler = async inventoryId => {
  // No action if the user clicks on selected dropdown item
  if(inventoryId.value === +props.connection.source_default_inventory_location?.external_reference_id || inventoryId.value === 0) return;

  const selectedInventory = sourceLocations.value.find(inventory => inventory.id === inventoryId.value);

  const { source_default_inventory_location, store_domain } = props.connection;
  location.value = {
    current: source_default_inventory_location ?? { id: 0, name: 'All Locations' },
    new: selectedInventory,
    store: store_domain,
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
