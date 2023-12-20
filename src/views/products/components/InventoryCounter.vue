<script setup>
/* ----- Data ----- */
const inventoryCount = ref(null);

const {
  isDestinationStore,
  storeId,
  storeType,
} = toRefs(useConnectionsStore());

const {
  fetchInventory,
  selectedStore,
} = toRefs(useProductsStore());

/* ----- Props ----- */
const props = defineProps({
  productId: {
    required: true,
    type: String,
  },

  rowIndex: {
    required: true,
    type: Number,
  },

  variantsCount: {
    required: true,
    type: Number,
  }
})

/* ----- Mounted ----- */
onMounted(() => {
  setTimeout(() => {
    fetchInventoryHandler();
  }, props.rowIndex * 1000);
});

/* ----- Methods ----- */
const fetchInventoryHandler = async () => {
  const params = {
    location_id: selectedStore?.value.source_default_inventory_location.external_reference_id,
    origin: storeType.value,
    product_id: props.productId,
    source_store_id: isDestinationStore.value ? selectedStore.value.id : storeId.value,
  };

  const response = await fetchInventory.value(params);
  if(response.success) {
    inventoryCount.value = response.inventory_quantity;
  }
};
</script>

<template>
  <Skeleton v-if="inventoryCount === null" height="15.5px" width="50%" />
  <template v-else>
    <span class="line-height-3">{{ inventoryCount }} assigned for </span> <span>{{ props.variantsCount }}</span> {{ variantsCount > 1 ? 'variants' : 'variant' }}
  </template>
</template>
