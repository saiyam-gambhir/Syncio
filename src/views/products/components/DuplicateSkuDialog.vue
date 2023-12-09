<script setup>
/* ----- Data ----- */
const {
  storeName,
} = toRefs(useConnectionsStore());

const {
  clickedProduct,
  fetchProductDetails,
  isDuplicateSkuFound,
} = toRefs(useProductsStore());

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isDuplicateSkuFound.value = false;
};

const fetchProductDetailsHandler = () => {
  closeDialogHandler();
  const { external_product_id, store_id } = clickedProduct.value;
  fetchProductDetails.value({ externalProductId: external_product_id, targetStoreId: store_id }, false);
};
</script>

<template>
  <DialogWrapper :isVisible="isDuplicateSkuFound" title="Use Map instead of Sync" width="500px" @closeDialog="closeDialogHandler">
    <template #body>
      <p class="m-0 line-height-3 text-lg">
        Two or more products have the same SKU in <strong class="font-semibold">{{ storeName }}</strong>, so this product can't be synced accurately.
      </p>

      <p class="mt-4 mb-0 line-height-3 text-lg">Use <strong class="font-semibold">Map</strong> to choose the correct product.</p>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <Button
          @click="closeDialogHandler"
          class="p-button-secondary"
          label="Cancel">
        </Button>

        <Button
          @click="fetchProductDetailsHandler"
          class="mr-0"
          label="Map">
        </Button>
      </div>
    </template>
  </DialogWrapper>
</template>
