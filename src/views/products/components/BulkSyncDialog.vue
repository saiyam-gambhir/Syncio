<script setup>
/* ----- Data ----- */
const {
  fetchProductsHandler,
} = useProducts();

const {
  bulkSync,
} = toRefs(useProductsStore());

const {
  productsSynced,
} = toRefs(usePlanStore());

/* ----- Methods ----- */
const closeDialogHandler = async () => {
  bulkSync.value.showDialog = false;
  await fetchProductsHandler();
  if(productsSynced.value === 0) {
    Intercom('trackEvent', 'first-product-synced');
  }
};
</script>

<template>
  <DialogWrapper :isVisible="bulkSync.showDialog" title="Bulk sync is now in progress" width="450px" :closable="false">
    <template #body>
      <p class="m-0 line-height-3 text-center text-lg pt-2">
        <i class="pi pi-spin pi-sync text-5xl" style="color: #fcb057;"></i>
        <div class="pt-4">Refresh <i class="pi pi-refresh text-lg mx-2"></i> the table to check your progress.</div>
      </p>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-end">
        <Button
          :loading="loadingBulkMapper"
          @click="closeDialogHandler"
          class="mr-0"
          label="Ok">
        </Button>
      </div>
    </template>
  </DialogWrapper>
</template>
