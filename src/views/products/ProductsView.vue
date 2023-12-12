<script setup>
/* ----- Components ----- */
const BulkMapperDialog = defineAsyncComponent(() => import('./components/BulkMapperDialog.vue'));
const DuplicateSkuDialog = defineAsyncComponent(() => import('./components/DuplicateSkuDialog.vue'));
const ProductDetailsDialog = defineAsyncComponent(() => import('./components/ProductDetailsDialog.vue'));

/* ----- Data ----- */
const {
  fetchProductsHandler,
  unselectAllRowsHandler,
  updateCurrentPageHandler,
} = useProducts();

const {
  userId,
} = toRefs(useAuthStore());

const {
  connections,
  fetchConnections,
  isDestinationStore,
  partnerStoreType,
} = toRefs(useConnectionsStore());

const {
  bulkSyncProducts,
  clickedProduct,
  fetchMetaFields,
  fetchProductDetails,
  isBulkMapperDialogRequested,
  isDuplicateSkuFound,
  isProductDetailsDialogRequested,
  loading,
  pagination,
  products,
  resyncProduct,
  selectedProducts,
  selectedStoreId,
  syncedProducts,
  syncProduct,
  syncProductsQueue,
  unsyncedProducts,
  unsyncProduct,
} = toRefs(useProductsStore());

const {
  fetchCurrentPlan,
} = toRefs(usePlanStore());

const statusOptions = {
  'attention': 'warning',
  'unsynced': 'danger',
  'pending': 'warning',
  'synced': 'success',
};

/* ----- Mounted ----- */
onMounted(async () => {
  if (connections.value.length === 0) await fetchConnections.value();
  if(products?.value?.length > 0) return;

  await fetchProductsHandler();
  checkProductStatusOnLoad(products.value);

  if(selectedStoreId.value) await fetchMetaFields.value();
});

/* ----- Watch ----- */
watch(selectedStoreId, (newValue, oldValue) => {
  if((newValue !== oldValue)) {
    fetchMetaFields.value();
  }
}, { deep: true });

/* ----- Methods ----- */
const checkProductStatusOnLoad = (products) => {
  products.forEach(({ mapper_id, is_sync_failed, external_product_id }) => {

    if((syncProductsQueue.value.includes(external_product_id) || syncProductsQueue.value.includes(mapper_id)) && mapper_id && !is_sync_failed) {
      const productIndex = syncProductsQueue.value.findIndex(item => +item === +external_product_id);
      syncProductsQueue.value.splice(productIndex, 1);
    }
  });
};

const storeFilterHandler = async storeId => {
  selectedStoreId.value = storeId;
};

const getProductSyncStatus = product => {
  const { product_status, mapper_id, is_sync_failed, external_product_id } = product;

  if((syncProductsQueue.value.includes(external_product_id) || syncProductsQueue.value.includes(mapper_id))) {
    return 'pending';
  }

  if (product_status === 'replaced' && mapper_id) {
    return 'replaced';
  }

  if (mapper_id) {
    return 'synced';
  }

  if (is_sync_failed && !mapper_id) {
    return 'attention';
  }

  if(!mapper_id && !is_sync_failed) {
    return 'not synced';
  }

  return 'not synced';
};

const updateProductStatus = (product, id) => {
  const syncedProductIndex = syncProductsQueue.value.indexOf(id);
  syncProductsQueue.value.splice(syncedProductIndex, 1);
  getProductSyncStatus(product);
};

const syncProductHandler = async (product) => {
  clickedProduct.value = product;
  const response = await syncProduct.value(product.external_product_id);
  if(response?.success) {
    product.mapper_id = await response.mapper.id;
  }
  updateProductStatus(product, product.external_product_id);
  setTimeout(() => {
    fetchCurrentPlan.value(userId.value);
  }, 500);
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

const unsyncProductHandler = async (product, loadCurrentPlan = true) => {
  const mapperIds = [];
  mapperIds.push(product.mapper_id);
  const response = await unsyncProduct.value(mapperIds);
  if(response?.success) {
    updateProductStatus(product, product.mapper_id);
    product.mapper_id = null;
    if(loadCurrentPlan) {
      setTimeout(() => {
        fetchCurrentPlan.value(userId.value);
      }, 500);
    }
  }
};

const bulkUnsyncProductsHandler = () => {
  const syncedProductsLength = syncedProducts.value.length;
  syncedProducts.value.forEach(async (product, index) => {
    await unsyncProductHandler(product, false);
    if((index + 1) === syncedProductsLength) {
      setTimeout(() => {
        fetchCurrentPlan.value(userId.value);
      }, 1000);
    }
  });
  unselectAllRowsHandler();
};

const resyncProductHandler = async (product) => {
  const mapperIds = [];
  mapperIds.push(product.mapper_id);
  const response = await resyncProduct.value(mapperIds);
  if(response?.success) {
    updateProductStatus(product, product.mapper_id);
  }
  await fetchCurrentPlan.value(userId.value);
};

const selectAllRowsHandler = (rows) => {
  syncedProducts.value = rows.data.filter(row => row.mapper_id);
  unsyncedProducts.value = rows.data.filter(row => !row.mapper_id);
};

const rowSelectHandler = (row) => {
  if(row.data.mapper_id) {
    syncedProducts.value.push(row.data)
  } else {
    unsyncedProducts.value.push(row.data);
  }
};

const rowUnselectHandler = (row) => {
  if(row.data.mapper_id) {
    const rowIndex = syncedProducts.value.findIndex(_row => _row.mapper_id == row.data.mapper_id);
    syncedProducts.value.splice(rowIndex, 1);
  } else {
    const rowIndex = unsyncedProducts.value.findIndex(_row => _row.external_product_id == row.data.external_product_id);
    unsyncedProducts.value.splice(rowIndex, 1);
  }
};

const fetchProductDetailsHandler = (product) => {
  clickedProduct.value = product;
  fetchProductDetails.value({ externalProductId: product.external_product_id, targetStoreId: product.store_id }, false);
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
        @change="fetchProductsHandler()"
        @update:modelValue="storeFilterHandler"
        customPlaceholder
        style="width: 25rem;"
        v-model="selectedStoreId">
      </StoresFilter>

      <Button
        @click="isBulkMapperDialogRequested = true"
        class="ml-5 bulk-mapper-btn"
        label="Bulk mapper"
        outlined
        v-if="selectedStoreId && isDestinationStore">
      </Button>
    </template>
  </PageHeader>

  <ProductsViewSkeleton v-if="loading" />
  <template v-else>
    <div v-if="(syncedProducts.length > 0 || unsyncedProducts.length > 0) && isDestinationStore" class="flex align-items-center py-2">
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

    <article class="mt-2">
      <DataTable
        :value="products"
        @rowSelect="rowSelectHandler"
        @rowSelectAll="selectAllRowsHandler"
        @rowUnselect="rowUnselectHandler"
        @rowUnselectAll="unselectAllRowsHandler"
        responsiveLayout="scroll"
        showGridlines
        v-model:selection="selectedProducts">

        <template #empty>
          <div class="px-4 py-8 text-center" v-if="!loading">
            <h2 class="m-0 line-height-3" v-if="selectedStoreId">No products found</h2>
            <h2 v-else class="line-height-3">Select a {{ partnerStoreType }} from the dropdown menu at the <br> top right to browse available products.</h2>
          </div>

        </template>

        <template #header>
          <ProductsViewHeader />
        </template>

        <Column
          headerStyle="width: 4%"
          selectionMode="multiple"
          v-if="isDestinationStore">
        </Column>

        <Column header="Product" style="width: 36%">
          <template #body="{ data: { default_image_url, external_product_id, store_id, title } }">
            <div class="flex align-items-center pointer btn-link-parent" @click="fetchProductDetails({ externalProductId: external_product_id, targetStoreId: store_id }, true)">
              <figure class="m-0" style="width: 42px; height: 42px; padding: 4px; border: 1px solid rgb(231, 231, 231); flex-shrink: 0;">
                <div class="w-full h-full" style="background-size: contain; background-repeat: no-repeat; background-position: center;" :style="{ backgroundImage: `url(${default_image_url})` }"></div>
              </figure>
              <div class="flex flex-column ml-3 pointer btn-link text-blue-500">
                {{ title }}
              </div>
            </div>
          </template>
        </Column>

        <Column header="Inventory" style="width: 15.5%;">
          <template #body="{ data: { total_inventory_quantity, variants } }">
            <span>{{ total_inventory_quantity }}</span> for <span>{{ variants.length }}</span> {{ variants.length > 1 ? 'variants' : 'variant' }}
          </template>
        </Column>

        <Column header="Status" style="width: 12.5%">
          <template #body="{ data }">
            <a v-tooltip.right="'Open link'" href="https://help.syncio.co/en/articles/5958687-attention-status-for-product-imports" target="_blank" v-if="getProductSyncStatus(data) === 'attention'">
              <Tag :severity="statusOptions[getProductSyncStatus(data)]" rounded>
                <StatusIcon />
                <span>
                  {{ getProductSyncStatus(data).replace('_', ' ') }}
                </span>
                <i v-if="getProductSyncStatus(data) === 'attention'" class="pi pi-external-link ml-2"></i>
              </Tag>
            </a>
            <Tag :severity="statusOptions[getProductSyncStatus(data)]" rounded v-else-if="getProductSyncStatus(data) === 'not synced'" :pt="{root: { style: { background: '#eee', color: '#333', border: '1px solid #333' }}}">
              <StatusIcon />
              <span>
                {{ getProductSyncStatus(data).replace('_', ' ') }}
              </span>
            </Tag>
            <Tag :severity="statusOptions[getProductSyncStatus(data)]" rounded v-else>
              <i v-if="getProductSyncStatus(data) === 'pending'" class="pi pi-spin pi-sync"></i>
              <StatusIcon v-else />
              <span :class="{ 'ml-2': getProductSyncStatus(data) === 'pending' }" style="transition: margin .25s;">
                {{ getProductSyncStatus(data).replace('_', ' ') }}
              </span>
            </Tag>
          </template>
        </Column>

        <Column header="Sales channel visibility" style="width: 16%">
          <template #body="{ data: { published_at } }">
            <span v-if="published_at">Online store</span>
            <span v-else>Unavailable</span>
          </template>
        </Column>

        <Column header="Actions" style="width: 16%" class="text-right" v-if="isDestinationStore">
          <template #body="{ data }">
            <div v-if="data.mapper_id">
              <span v-if="syncedProducts.length > 0 || unsyncedProducts.length > 0" v-tooltip.top="'Clear bulk selection to access this button.'" class="inline-block">
                <SplitButton
                  disabled
                  class="p-button-sm"
                  label="View sync"
                  outlined>
                </SplitButton>
              </span>
              <SplitButton
                v-else
                :disabled="getProductSyncStatus(data) === 'pending'"
                @click="fetchProductDetails({ externalProductId: data.external_product_id, targetStoreId: data.store_id }, false)"
                class="p-button-sm"
                label="View sync"
                :model="[
                  { label: 'Resync', command: () => resyncProductHandler(data) },
                  { label: 'Unsync', command: () => unsyncProductHandler(data) },
                ]"
                outlined>
              </SplitButton>

            </div>
            <div v-else>
              <span v-if="syncedProducts.length > 0 || unsyncedProducts.length > 0" v-tooltip.top="'Clear bulk selection to access this button.'" class="inline-block">
                <SplitButton
                  disabled
                  class="p-button-sm"
                  label="Sync"
                  outlined>
                </SplitButton>
              </span>
              <SplitButton
                v-else
                :disabled="getProductSyncStatus(data) === 'pending'"
                @click="syncProductHandler(data)"
                class="p-button-sm"
                label="Sync"
                :model="[
                  { label: 'Map', command: () => fetchProductDetailsHandler(data) }
                ]"
                outlined>
              </SplitButton>
            </div>
          </template>
        </Column>
      </DataTable>

      <Pagination
        :pagination="pagination"
        @updateCurrentPage="updateCurrentPageHandler"
        v-if="pagination">
      </Pagination>
    </article>

    <!----- Bulk Mapper ----->
    <BulkMapperDialog v-if="isBulkMapperDialogRequested" />

    <!-- Duplicate Sku -->
    <DuplicateSkuDialog v-if="isDuplicateSkuFound" />

    <!----- Product Details ----->
    <ProductDetailsDialog v-if="isProductDetailsDialogRequested" />
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
