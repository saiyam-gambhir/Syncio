<script setup>
/* ----- Components ----- */
const BulkMapperDialog = defineAsyncComponent(() => import('./components/BulkMapperDialog.vue'));
const BulkSyncDialog = defineAsyncComponent(() => import('./components/BulkSyncDialog.vue'));
const DuplicateSkuDialog = defineAsyncComponent(() => import('./components/DuplicateSkuDialog.vue'));
const ProductDetailsDialog = defineAsyncComponent(() => import('./components/ProductDetailsDialog.vue'));
const UnsyncDialog = defineAsyncComponent(() => import('./components/unSync/UnsyncDialog.vue'));

/* ----- Data ----- */
const {
  fetchProductsHandler,
  getProductSyncStatus,
  resyncProductHandler,
  unselectAllRowsHandler,
  updateCurrentPageHandler,
  updateProductStatus,
} = useProducts();

const {
  userId,
} = toRefs(useAuthStore());

const {
  connections,
  fetchConnections,
  isDestinationStore,
  isSourceStore,
  isWoocommerce,
  partnerStoreType,
} = toRefs(useConnectionsStore());

const {
  bulkSync,
  bulkSyncProducts,
  clickedProduct,
  fetchMetaFields,
  fetchProductDetails,
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
  syncProduct,
  unsyncedProducts,
} = toRefs(useProductsStore());

const {
  fetchCurrentPlan,
} = toRefs(usePlanStore());

const statusOptionsTag = {
  'attention': 'warning',
  'pending': 'warning',
  'replaced': 'danger',
  'synced': 'success',
  'unsupported': 'info',
  'unsynced': 'danger',
};

/* ----- Mounted ----- */
onMounted(async () => {
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
const storeFilterHandler = async storeId => {
  selectedStoreId.value = storeId;
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
  }, 1000);
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

const unsyncProductHandler = async (product) => {
  clickedProduct.value = product;
  isUnsyncRequested.value = true;
};

const bulkUnsyncProductsHandler = () => {
  isBulkUnsyncAction.value = true;
  isUnsyncRequested.value = true;
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

const viewSyncHander = (product) => {
  clickedProduct.value = product;
  fetchProductDetails.value({ externalProductId: product.external_product_id, targetStoreId: product.store_id }, false);
};

const storeChangeHandler = () => {
  queries.value.page = 1;
  fetchProductsHandler();
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
            <h2 v-else class="line-height-3 font-semi">
              Select a {{ partnerStoreType }} from the dropdown menu at the <br> top right to browse available products.
              <span v-if="isSourceStore" class="block mt-4">
                Import and sync of products is managed by Destination stores. <br>
                Log in to your Destination store or contact the Destination <br>
                store owner to import and sync products.
              </span>
            </h2>
          </div>

        </template>

        <template #header>
          <ProductsViewHeader />
        </template>

        <Column
          style="width: 3rem; min-width: 42.5px"
          selectionMode="multiple"
          v-if="isDestinationStore">
        </Column>

        <Column header="Product" style="width: 36%;">
          <template #body="{ data: { default_image_url, external_product_id, product_status, store_id, title } }">
            <div class="flex align-items-center pointer btn-link-parent" @click.prevent="fetchProductDetails({ externalProductId: external_product_id, targetStoreId: store_id }, true)">
              <figure class="m-0" style="width: 42px; height: 42px; padding: 4px; border: 1px solid rgb(231, 231, 231); flex-shrink: 0;">
                <div class="w-full h-full" style="background-size: contain; background-repeat: no-repeat; background-position: center;" :style="{ backgroundImage: `url(${default_image_url})` }"></div>
              </figure>
              <div class="flex flex-column ml-3 pointer btn-link text-blue-500 truncate-text">
                {{ title }}
              </div>
            </div>
            <div v-if="isDestinationStore && product_status === 'replaced'" style="padding-left: 4.3rem; padding-bottom: 1rem;" class="text-sm">
              Replaced by Source store.
              <AppLink label="What to do" link="https://help.syncio.co/en/articles/6958498-what-is-a-replaced-product-and-what-do-i-do-with-it" class="text-sm" />
            </div>
          </template>
        </Column>

        <Column header="Inventory" style="width: 14%;">
          <template #body="{ data: { external_product_id, total_inventory_quantity, variants }, index }">
            <span v-if="selectedStore?.source_default_inventory_location">
              <InventoryCounter
                :productId="external_product_id"
                :rowIndex="index"
                :variantsCount="variants?.length">
              </InventoryCounter>
            </span>
            <template v-else>
              <span>{{ total_inventory_quantity }}</span> for <span>{{ variants.length }}</span> {{ variants.length > 1 ? 'variants' : 'variant' }}
            </template>
          </template>
        </Column>

        <Column header="Status" style="width: 14.5%">
          <template #body="{ data }">

            <a v-if="getProductSyncStatus(data) === 'attention'" v-tooltip.right="'Open link'" href="https://help.syncio.co/en/articles/5958687-attention-status-for-product-imports" target="_blank">
              <Tag :severity="statusOptionsTag[getProductSyncStatus(data)]" rounded>
                <StatusIcon />
                <span>
                  {{ getProductSyncStatus(data).replace('_', ' ') }}
                </span>
                <i class="pi pi-external-link ml-2"></i>
              </Tag>
            </a>

            <a v-else-if="getProductSyncStatus(data) === 'unsupported'" v-tooltip.right="'Open link'" href="https://help.syncio.co/en/articles/6958447-woocommerce-supported-product-types" target="_blank">
              <Tag :severity="statusOptionsTag[getProductSyncStatus(data)]" rounded>
                <StatusIcon />
                <span>Unsupported</span>
                <i class="pi pi-external-link ml-2"></i>
              </Tag>
            </a>

            <Tag v-else-if="getProductSyncStatus(data) === 'not synced'" :severity="statusOptionsTag[getProductSyncStatus(data)]" rounded :pt="{root: { style: { background: '#eee', color: '#333', border: '1px solid #333' }}}">
              <StatusIcon />
              <span>
                {{ getProductSyncStatus(data).replace('_', ' ') }}
              </span>
            </Tag>

            <Tag v-else :severity="statusOptionsTag[getProductSyncStatus(data)]" rounded>
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
                v-else-if="data.product_status !== 'replaced'"
                :disabled="getProductSyncStatus(data) === 'pending'"
                @click="viewSyncHander(data)"
                class="p-button-sm"
                label="View sync"
                :model="[
                  { label: 'Resync', command: () => resyncProductHandler(data) },
                  { label: 'Unsync', command: () => unsyncProductHandler(data) },
                ]"
                outlined>
              </SplitButton>
              <SplitButton
                v-else-if="data.product_status === 'replaced'"
                :disabled="getProductSyncStatus(data) === 'pending'"
                @click="viewSyncHander(data)"
                class="p-button-sm"
                label="View sync"
                :model="[
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
