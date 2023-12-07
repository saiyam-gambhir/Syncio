<script setup>
/* ----- Data ----- */
const inventoryReferenceId = ref(null);

const {
  destinationLocations,
  isMultilocation,
  loadingInventory,
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
</script>

<template>
  <Dropdown
    :autoOptionFocus="false"
    :loading="loadingInventory"
    :options="destinationLocations"
    @change=""
    class="w-full"
    optionLabel="name"
    optionValue="id"
    placeholder="Select Location"
    v-if="isMultilocation"
    v-model="inventoryReferenceId">
  </Dropdown>
</template>
