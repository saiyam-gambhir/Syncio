<script setup>
/* ----- Data ----- */
const loadingUnsyncAction = ref(false);

const {
  userId,
} = toRefs(useAuthStore());

const {
  fetchCurrentPlan,
} = toRefs(usePlanStore());

const {
  clickedProduct,
  isUnsyncAndDeleteRequested,
  unsyncProduct,
  isBulkUnsyncAction,
  isUnsyncRequested,
  syncedProducts,
} = toRefs(useProductsStore());

const {
  unselectAllRowsHandler,
  updateProductStatus,
} = useProducts();

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isUnsyncAndDeleteRequested.value = false;
};

const unsyncAndDeleteProduct = async (product = clickedProduct.value, loadCurrentPlan = true) => {
  const mapperIds = [];
  mapperIds.push(product.mapper_id);
  loadingUnsyncAction.value = true;
  const response = await unsyncProduct.value(mapperIds, false);
  if(response?.success) {
    isBulkUnsyncAction.value = isUnsyncRequested.value = isUnsyncAndDeleteRequested.value = loadingUnsyncAction.value = false;
    clickedProduct.value = null;
    updateProductStatus(clickedProduct.value, product.mapper_id);
    product.mapper_id = null;
    if(loadCurrentPlan) {
      setTimeout(() => {
        fetchCurrentPlan.value(userId.value);
      }, 1000);
    }
  }
};

const bulkUnsyncAndDeleteProductsHandler = () => {
  const syncedProductsLength = syncedProducts.value.length;
  syncedProducts.value.forEach(async (product, index) => {
    await unsyncAndDeleteProduct(product, false);
    if((index + 1) === syncedProductsLength) {
      setTimeout(() => {
        fetchCurrentPlan.value(userId.value);
      }, 1000);
    }
  });
  unselectAllRowsHandler();
};

const unsyncAndDeleteHandler = () => {
  isBulkUnsyncAction.value ? bulkUnsyncAndDeleteProductsHandler() : unsyncAndDeleteProduct();
};
</script>

<template>
  <DialogWrapper
    :isVisible="isUnsyncAndDeleteRequested"
    @closeDialog="closeDialogHandler"
    title="Unsync and Delete Products?"
    width="500px">
    <template #body>
      <section class="grid flex-column mt-1 px-3">
        <p class="mt-0 text-center text-lg">
          <span class="block mt-2">
            You're about to unsync and permanently delete {{ syncedProducts.length }} {{ syncedProducts.length > 1 ? 'products' : 'product' }}.
          </span>
          <Tag class="mt-4 mb-3" v-if="!isBulkUnsyncAction" severity="danger" style="font-size: 1.15rem !important;">{{ clickedProduct.title }}</Tag> <br>
          <span class="block mt-2">You cannot undo this action.</span>
        </p>
      </section>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <Button label="Cancel" class="p-button-secondary" @click="closeDialogHandler"></Button>
        <Button :loading="loadingUnsyncAction" label="Delete and Unsync" class="p-button-danger mr-0" @click="unsyncAndDeleteHandler"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
