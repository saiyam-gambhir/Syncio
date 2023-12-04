<script setup>
/* ----- Data ----- */
const {
  isDestinationStore,
} = toRefs(useConnectionsStore());

const {
  isViewDetailsRequested,
} = toRefs(useProductsStore());

/* ----- Props ----- */
const props = defineProps({
  product: {
    required: true,
    type: Object,
  }
});
</script>

<template>
  <div class="py-2" v-if="isViewDetailsRequested">
    <h2>Description</h2>
    <div class="text-lg description" v-html="product.data?.description"></div>
  </div>

  <Divider />

  <div class="py-2" v-if="product?.data">
    <h2>Variants</h2>
    <DataTable :value="product.data.variants" responsiveLayout="scroll" showGridlines>
      <Column header="Title" style="width: 40%;">
        <template #body="{ data: { title } }">
          <strong class="font-semibold py-2 block">{{ title }}</strong>
        </template>
      </Column>

      <Column header="SKU" style="width: 40%;">
        <template #body="{ data: { sku } }">
          {{ sku }}
        </template>
      </Column>

      <Column style="width: 20%;">
        <template #header>
          Quantity
          <i v-if="isDestinationStore" class="pi pi-question-circle ml-3 text-xl pointer" v-tooltip.top="'Quantities are from Shopify totals. Synced Stock Buffer and locations may not be applied.'"></i>
        </template>
        <template #body="{ data: { inventory_quantity } }">
          {{ inventory_quantity }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
