<script setup>
/* ----- Data ----- */
const inventoryReferenceId = ref(null);

const {
  loadingInventory,
  sourceLocations,
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
  inventoryReferenceId.value = +sourceInventoryReferenceId;
});
</script>

<template>
  <Dropdown
    :autoOptionFocus="false"
    :loading="loadingInventory"
    :options="sourceLocations"
    @change=""
    class="w-full"
    optionLabel="name"
    optionValue="id"
    placeholder="Select Location"
    v-if="connection.platform === 'shopify'"
    v-model="inventoryReferenceId">
  </Dropdown>

  <span v-else class="pl-3">All locations</span>
</template>
