<script setup>
/* ----- Components ----- */
// const DisconnectAndDeleteDialog = defineAsyncComponent(() => import('./DisconnectAndDeleteDialog.vue'));
// const DisconnectAndKeepDialog = defineAsyncComponent(() => import('./DisconnectAndKeepDialog.vue'));

/* ----- Data ----- */
// const {
//   isConnectionDisconnectRequested,
//   isDisconnectAndDeleteRequested,
//   isDisconnectAndKeepRequested,
// } = toRefs(useConnectionsStore());

/* ----- Methods ----- */
// const closeDialogHandler = () => {
//   isConnectionDisconnectRequested.value = false;
// };

// const showDisconnectAndDeleteDialog = () => {
//   isDisconnectAndDeleteRequested.value = true;
// };

// const showDisconnectAndKeepDialog = () => {
//   isDisconnectAndKeepRequested.value = true;
// };

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
  isUnsyncRequested,
  unsyncProduct,
} = toRefs(useProductsStore());

const {
  updateProductStatus,
} = useProducts();

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isUnsyncRequested.value = false;
};

const unsyncProductHandler = async (product, loadCurrentPlan = true) => {
  const mapperIds = [];
  mapperIds.push(product.mapper_id);
  loadingUnsyncAction.value = true;
  const response = await unsyncProduct.value(mapperIds);
  if(response?.success) {
    isUnsyncRequested.value = false;
    loadingUnsyncAction.value = false;
    updateProductStatus(product, product.mapper_id);
    product.mapper_id = null;
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
    :isVisible="isUnsyncRequested"
    :showFooter="false"
    @closeDialog="closeDialogHandler"
    title="Select an unsync option"
    width="725px">
    <template #body>
      <section class="grid">
        <div class="col-12 md:col-12 lg:col-6">
          <div class="surface-0 shadow-2 border-round text-center p-4 pt-7">
            <IconLinkOff />
            <h2 class="mb-3 mt-4">Unsync and Keep</h2>
            <p class="mt-0">Unsync without deleting the product from your destination store.</p>
            <Button
              :loading="loadingUnsyncAction"
              @click="unsyncProductHandler(clickedProduct)"
              class="p-button-lg block w-100 mt-6"
              label="Unsync and Keep"
              outlined>
            </Button>
          </div>
        </div>

        <div class="col-12 md:col-12 lg:col-6">
          <div class="surface-0 shadow-2 border-round text-center p-4 pt-7">
            <i class="pi pi-trash icon-trash"></i>
            <h2 class="mb-3 mt-4">Unsync and Delete</h2>
            <p class="mt-0">Unsync and delete the product from your destination store.</p>
            <Button
              @click=""
              class="p-button-lg block w-100 mt-6"
              label="Unsync and Delete"
              outlined
              severity="danger">
            </Button>
          </div>
        </div>
      </section>
    </template>
  </DialogWrapper>

  <!-- <DisconnectAndDeleteDialog v-if="isDisconnectAndDeleteRequested" />
  <DisconnectAndKeepDialog v-if="isDisconnectAndKeepRequested" /> -->
</template>

<style scoped>
.icon-trash {
  font-size: 32px;
  height: 40px;
  transform: translateY(2px);
}
</style>
