<script setup>
/* ----- Data ----- */
const inventoryCount = ref(null);

const {
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

  variantsCount: {
    required: true,
    type: Number,
  }
})

/* ----- Mounted ----- */
onMounted(() => {
  fetchInventoryHandler();
});

/* ----- Methods ----- */
const fetchInventoryHandler = async () => {
  const params = {
    location_id: selectedStore?.value.source_default_inventory_location.external_reference_id,
    origin: storeType.value,
    product_id: props.productId,
    source_store_id: selectedStore.value.id,
  };

  const response = await fetchInventory.value(params);
  if(response.success) {
    inventoryCount.value = response.inventory_quantity;
  }
};
</script>

<template>
  <i v-if="inventoryCount === null" class="pi pi-spin pi-spinner" style="font-size: 1.25rem"></i>
  <template v-else>
    <span>{{ inventoryCount }} for </span> <span>{{ props.variantsCount }}</span> {{ variantsCount > 1 ? 'variants' : 'variant' }}
  </template>
</template>
