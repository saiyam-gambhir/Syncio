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
} = toRefs(useProductsStore());

const {
  updateProductStatus,
} = useProducts();

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isUnsyncAndDeleteRequested.value = false;
};

const unsyncAndDeleteHandler = async (loadCurrentPlan = true) => {
  const mapperIds = [];
  mapperIds.push(clickedProduct.value.mapper_id);
  loadingUnsyncAction.value = true;
  const response = await unsyncProduct.value(mapperIds, false);
  if(response?.success) {
    isBulkUnsyncAction.value = isUnsyncRequested.value = isUnsyncAndDeleteRequested.value = loadingUnsyncAction.value = false;
    updateProductStatus(clickedProduct.value, clickedProduct.value.mapper_id);
    clickedProduct.value.mapper_id = null;
    if(loadCurrentPlan) {
      setTimeout(() => {
        fetchCurrentPlan.value(userId.value);
      }, 1000);
    }
  }
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
          <span class="block mt-2">You're about to unsync and permanently delete</span>
          <Tag class="mt-4 mb-3" severity="danger" style="font-size: 1.15rem !important;">{{ clickedProduct.title }}</Tag> <br>
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
