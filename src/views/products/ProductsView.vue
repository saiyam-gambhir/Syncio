<script setup>
/* ----- Components ----- */
const BulkMapperDialog = defineAsyncComponent(() => import('./components/BulkMapperDialog.vue'));
const ProductDetailsDialog = defineAsyncComponent(() => import('./components/ProductDetailsDialog.vue'));

/* ----- Data ----- */
let count = ref(0);
const {
  connections,
  fetchConnections,
  isDestinationStore,
  partnerStoreType
} = toRefs(useConnectionsStore());

const {
  fetchProductDetails,
  fetchProducts,
  syncProduct,
  syncProductsQueue,
  isBulkMapperDialogRequested,
  isProductDetailsDialogRequested,
  products,
  selectedProducts,
  selectedStoreId,
} = toRefs(useProductsStore());

const statusOptions = {
  'Not Synced': 'info',
  'pending': 'warning',
  'attention': 'warning',
  'synced': 'success',
};

const syncedActions = ref([
  {
    label: 'Resync',
    command: () => {},
  },
  {
    label: 'Unsync',
    command: () => {},
  },
]);

const unSyncedActions = ref([
  {
    label: 'Map',
    command: () => {},
  },
  {
    label: 'Map',
    command: () => {},
  },
]);

/* ----- Mounted ----- */
onMounted(async () => {
  if (connections.value.length === 0) await fetchConnections.value();
  await fetchProductsHandler(true);
});

/* ----- Methods ----- */
const storeFilterHandler = async storeId => {
  selectedStoreId.value = storeId;
};

const fetchProductsHandler = async () => {
  await fetchProducts.value(true);
}

const getProductSyncStatus = product => {
  const { product_status, mapper_id, is_sync_failed, external_product_id } = product;

  if (mapper_id) {
    return 'synced';
  }

  if (product_status === 'replaced' && mapper_id) {
    return 'replaced';
  }

  if (is_sync_failed && !mapper_id) {
    return 'attention';
  }

  if(syncProductsQueue.value.includes(external_product_id)) {
    return 'pending';
  }

  return 'Not Synced';
};

const syncProductHandler = async (product) => {
  const response = await syncProduct.value(product.external_product_id);
  product.mapper_id = await response.mapper.id;
  const syncedProductIndex = syncProductsQueue.value.indexOf(product.external_product_id);
  syncProductsQueue.value.splice(syncedProductIndex, 1);
  getProductSyncStatus(product);
};
</script>

<template>
  <PageHeader
    content="Sync and manage your inventory"
    title="Products"
    withActions>
    <template #actions>
      <StoresFilter
        :customPlaceholderText="`Select a ${partnerStoreType}`"
        :showClear="false"
        @change="fetchProductsHandler()"
        @update:modelValue="storeFilterHandler"
        customPlaceholder
        v-model="selectedStoreId">
      </StoresFilter>

      <Button
        @click="isBulkMapperDialogRequested = true"
        class="ml-5 bulk-mapper-btn"
        label="Bulk Mapper"
        outlined
        v-if="selectedStoreId">
      </Button>
    </template>
  </PageHeader>

  <article class="mt-4">
    <DataTable v-model:selection="selectedProducts" :value="products" responsiveLayout="scroll" showGridlines>
      <template #empty>
        <div class="px-4 py-8 text-center">
          <h2 class="m-0">No products found</h2>
        </div>
      </template>

      <template #header>
        <ProductsViewHeader />
      </template>

      <Column
        headerStyle="width: 4%"
        selectionMode="multiple">
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
          <span class="font-semi">{{ total_inventory_quantity }}</span> for <span class="font-semi">{{ variants.length }}</span> {{ variants.length > 1 ? 'variants' : 'variant' }}
        </template>
      </Column>

      <Column header="Status" style="width: 12.5%">
        <template #body="{ data }">
          <Tag :severity="statusOptions[getProductSyncStatus(data)]" rounded>
            {{ getProductSyncStatus(data).replace('_', ' ') }}
          </Tag>
        </template>
      </Column>

      <Column header="Sales channel visibility" style="width: 16%">
        <template #body="{ data: { published_at } }">
          <span v-if="published_at">Online store</span>
          <span v-else>Unavailable</span>
        </template>
      </Column>

      <Column header="Actions" style="width: 16%" class="text-right">
        <template #body="{ data }" v-if="isDestinationStore">
          <div v-if="data.mapper_id">
            <SplitButton label="View sync" class="p-button-sm" outlined :model="syncedActions" @click="fetchProductDetails({ externalProductId: data.external_product_id, targetStoreId: data.store_id }, false)" />
          </div>
          <div v-else>
            <SplitButton :loading="true" label="Sync" class="p-button-sm" outlined :model="unSyncedActions" @click="syncProductHandler(data)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </article>

  <!----- Bulk Mapper ----->
  <BulkMapperDialog v-if="isBulkMapperDialogRequested" />

  <!----- Product Details ----->
  <ProductDetailsDialog v-if="isProductDetailsDialogRequested" />
</template>

<style scoped>
.product-action {
  width: 70px;
}

.bulk-mapper-btn {
  height: 39.5px;
}
</style>
