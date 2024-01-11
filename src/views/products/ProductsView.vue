<script setup>
/* ----- Components ----- */
const BulkMapperDialog = defineAsyncComponent(() => import('./components/BulkMapperDialog.vue'));
const BulkSyncDialog = defineAsyncComponent(() => import('./components/BulkSyncDialog.vue'));
const DuplicateSkuDialog = defineAsyncComponent(() => import('./components/DuplicateSkuDialog.vue'));
const LocationPendingDialog = defineAsyncComponent(() => import('../connections/components/multiLocation/LocationPendingDialog.vue'));
const ProductDetailsDialog = defineAsyncComponent(() => import('./components/ProductDetailsDialog.vue'));
const UnsyncDialog = defineAsyncComponent(() => import('./components/unSync/UnsyncDialog.vue'));

/* ----- Data ----- */
const {
  fetchProductsHandler,
  getProductSyncStatus,
  updateCurrentPageHandler,
} = useProducts();

const {
  connections,
  fetchConnections,
  isDestinationStore,
  isLocationPendingDialogRequested,
  isShopify,
  isSourceStore,
  isWoocommerce,
  partnerStoreType,
} = toRefs(useConnectionsStore());

const {
  bulkSync,
  bulkSyncProducts,
  fetchMetaFields,
  isBulkMapperDialogRequested,
  isBulkUnsyncAction,
  isDuplicateSkuFound,
  isProductDetailsDialogRequested,
  isUnsyncRequested,
  loading,
  pagination,
  products,
  queries,
  selectedProducts,
  selectedStore,
  selectedStoreId,
  statusOptions,
  syncedProducts,
  unsyncedProducts,
} = toRefs(useProductsStore());

/* ----- Mounted ----- */
onMounted(async () => {
  if(isDestinationStore.value && isShopify.value) {
    const isPending = isLocationIsPending();
    if(isPending) return;
  }

  if (connections.value?.length === 0) await fetchConnections.value();
  if(products?.value?.length > 0) return;

  await fetchProductsHandler();
  if(selectedStoreId.value) await fetchMetaFields.value();

  if(isDestinationStore.value && isWoocommerce.value) {
    statusOptions.value.push({ key: 'Replaced', value: 'replaced' });
  } else if(isSourceStore.value && isWoocommerce.value) {
    statusOptions.value.push({ key: 'Unsupported', value: 'unsupported' });
  }
});

/* ----- Watch ----- */
watch(selectedStoreId, (newValue, oldValue) => {
  if((newValue !== oldValue)) {
    fetchMetaFields.value();
  }
}, { deep: true });

/* ----- Methods ----- */
const isLocationIsPending = () => {
  if(selectedStore?.value?.status === 'pending' && isDestinationStore.value && isShopify.value) {
    isLocationPendingDialogRequested.value = true;
    return true;
  }

  return false;
};

const storeFilterHandler = async storeId => {
  selectedStoreId.value = storeId;
};

const bulkSyncProductsHandler = async () => {
  const sourceProductIds = unsyncedProducts.value.map(product => product.external_product_id);
  const response = await bulkSyncProducts.value(sourceProductIds);
  if(response?.success) {
    products.value.forEach(product => {
      getProductSyncStatus(product);
    });
  }
};

const bulkUnsyncProductsHandler = () => {
  isBulkUnsyncAction.value = true;
  isUnsyncRequested.value = true;
};

const storeChangeHandler = async () => {
  const isPending = isLocationIsPending();
  if(isPending) return;

  queries.value.page = 1;
  await fetchProductsHandler();
};
</script>

<template>
  <PageHeader
    title="Products"
    withActions
    withLink>
    <template #header>
      <span v-if="isDestinationStore">Sync and manage your inventory. </span>
      <span v-else>View inventory and product sync status for connected Destination stores. </span>
      <AppLink link="https://help.syncio.co/en/articles/3285405-syncing-products" label="Read about syncing products" />
    </template>
    <template #actions>
      <StoresFilter
        :customPlaceholderText="`Select a ${partnerStoreType}`"
        :showClear="false"
        @change="storeChangeHandler()"
        @update:modelValue="storeFilterHandler"
        customPlaceholder
        editable
        style="width: 25rem;"
        v-model="selectedStoreId">
      </StoresFilter>

      <Button
        :disabled="!selectedStoreId"
        @click="isBulkMapperDialogRequested = true"
        class="ml-5 bulk-mapper-btn"
        label="Bulk mapper"
        outlined
        v-if="isDestinationStore">
      </Button>
    </template>
  </PageHeader>

  <ProductsViewSkeleton v-if="loading" />

  <template v-else>
    <div class="flex align-items-center" style="padding-bottom: .65rem;" v-if="isDestinationStore && (syncedProducts.length > 0 || unsyncedProducts.length > 0)">
      <h3 class="m-0">{{ selectedProducts?.length }} products selected</h3>

      <Button
        :disabled="unsyncedProducts?.length === 0"
        :label="`Sync ${unsyncedProducts?.length} products`"
        @click="bulkSyncProductsHandler"
        class="p-button-success ml-4">
      </Button>

      <Button
        :disabled="syncedProducts?.length === 0"
        :label="`Unsync ${syncedProducts?.length} products`"
        @click="bulkUnsyncProductsHandler"
        class="p-button-danger ml-3"
        outlined>
      </Button>
    </div>

    <div v-if="bulkSync.isOngoing" class="flex align-items-center" style="padding-bottom: .65rem;">
      <Tag @click="fetchProductsHandler" class="pointer" severity="warning">
        <i class="pi pi-spin pi-sync mr-2"></i>
        {{ bulkSync?.count }} sync in progress | CLICK to refresh
      </Tag>
    </div>

    <article class="mt-2" v-if="!isLocationIsPending()">
      <Products />

      <Pagination
        :disablePerPage="syncedProducts.length > 0 || unsyncedProducts.length > 0"
        :pagination="pagination"
        @updateCurrentPage="updateCurrentPageHandler"
        perPage
        v-if="pagination">
      </Pagination>
    </article>

    <!----- Bulk Mapper ----->
    <BulkMapperDialog v-if="isBulkMapperDialogRequested" />

    <!----- Bulk Sync ----->
    <BulkSyncDialog v-if="bulkSync.showDialog" />

    <!-- Duplicate Sku -->
    <DuplicateSkuDialog v-if="isDuplicateSkuFound" />

    <!----- Location Pending ----->
    <LocationPendingDialog v-if="isLocationPendingDialogRequested" :store="selectedStore" isRouterLink />

    <!----- Product Details ----->
    <ProductDetailsDialog v-if="isProductDetailsDialogRequested" />

    <!----- Unsync ----->
    <UnsyncDialog v-if="isUnsyncRequested" :isBulk="isBulkUnsyncAction" />
  </template>
</template>

<style scoped>
.product-action {
  width: 70px;
}

.bulk-mapper-btn {
  height: 39.5px;
}
</style>
