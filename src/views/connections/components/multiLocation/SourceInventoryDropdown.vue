<script setup>
/* ----- Data ----- */
const inventoryReferenceId = ref(0);

const {
  loadingInventory,
  sourceLocations,
  storeId,
  storeType,
  updateLocation,
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
  inventoryReferenceId.value = sourceInventoryReferenceId ? +sourceInventoryReferenceId : 0;
});

/* ----- Methods ----- */
const updateInventoryHandler = async inventoryId => {
  if(inventoryId.value === +props.connection.source_default_inventory_location?.external_reference_id) return;

  const selectedInventory = sourceLocations.value.find(inventory => inventory.id === inventoryId.value);

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

  await updateLocation.value(payload);
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
