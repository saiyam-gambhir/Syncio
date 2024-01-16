<script setup>
/* ----- Data ----- */
const inventoryReferenceId = ref(null);

const {
  destinationLocations,
  isLocationChangeRequested,
  isMultilocation,
  loadingInventory,
  location,
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
  const defaultInventoryReferenceId = props.connection?.destination_default_inventory_location?.external_reference_id;
  inventoryReferenceId.value = +defaultInventoryReferenceId;
});

/* ----- Computed ----- */
const selectedLocation = computed(() => {
  return destinationLocations?.value?.find(location => location.id === +inventoryReferenceId.value);
});

/* ----- Methods ----- */
const updateInventoryHandler = async inventoryId => {
  if(inventoryId.value === +props.connection.destination_default_inventory_location?.external_reference_id) return;

  const { destination_default_inventory_location, store_domain, source_default_inventory_location } = props.connection;
  location.value = {
    current: destination_default_inventory_location,
    new: selectedLocation.value,
    store: store_domain,
  };

  isLocationChangeRequested.value = true;

  const payload = {
    d_inventory_reference: +inventoryId.value,
    destination_store_id: storeId.value,
    is_default: true,
    name: selectedLocation?.value.name,
    s_inventory_reference: +source_default_inventory_location?.external_reference_id,
    source_store_id: +props.connection?.id,
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
    :options="destinationLocations"
    @change="updateInventoryHandler"
    class="w-full"
    :class="{ 'p-invalid' : connection.status === 'pending' }"
    optionLabel="name"
    optionValue="id"
    placeholder="Select Location"
    v-if="isMultilocation && connection.platform === 'shopify'"
    v-model="inventoryReferenceId">
  </Dropdown>

  <span v-else style="padding-left: .85rem;">{{ selectedLocation?.name }}</span>
</template>
