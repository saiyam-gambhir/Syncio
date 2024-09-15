<script setup>
import * as routes from '@/routes';

/* ----- Components ----- */
const ProductSyncLimitDialog = defineAsyncComponent(() => import('./components/ProductSyncLimitDialog.vue'));

/* ----- Data ----- */
const {
  getProductSyncStatus,
  resyncProductHandler,
  unselectAllRowsHandler,
  updateProductStatus,
} = useProducts();

const {
  userId,
} = toRefs(useAuthStore());

const {
  connections,
  isDestinationStore,
  isSourceStore,
  partnerStoreType,
} = toRefs(useConnectionsStore());

const {
  clickedProduct,
  fetchProductDetails,
  isUnsyncRequested,
  loading,
  products,
  selectedProducts,
  selectedStore,
  selectedStoreId,
  SYNC_PRODUCT,
  syncedProducts,
  unsyncedProducts,
} = toRefs(useProductsStore());

const {
  fetchCurrentPlan,
  productsSynced,
  productsSyncedLimit,
  shouldShowProductSyncLimitDialog,
} = toRefs(usePlanStore());

const statusOptionsTag = {
  'attention': 'warning',
  'pending': 'warning',
  'replaced': 'danger',
  'synced': 'success',
  'unsupported': 'info',
  'unsynced': 'danger',
};

const isAllChecked = ref(false);

/* ----- Before Route Leave ----- */
onBeforeRouteLeave((to, from, next) => {
  shouldShowProductSyncLimitDialog.value = false;
  unselectAllRowsHandler();
  next();
});

/* ----- Watch ----- */
watch(products, (newValue, oldValue) => {
  if(products?.value?.every(product => product.added)) {
    isAllChecked.value = true;
  } else {
    isAllChecked.value = false;
  }
}, { deep: true })

/* ----- Methods ----- */
const syncProductHandler = async (product) => {
  if(productsSynced.value >= productsSyncedLimit.value) {
    shouldShowProductSyncLimitDialog.value = true;
    return;
  }

  clickedProduct.value = product;
  const response = await SYNC_PRODUCT.value(product.external_product_id);
  if(response?.success) {
    product.mapper_id = await response.mapper.id;
    if(productsSynced.value === 0) {
      Intercom('trackEvent', 'first-product-synced');
    }
  }
  updateProductStatus(product, product.external_product_id);
  setTimeout(() => {
    fetchCurrentPlan.value(userId.value);
  }, 1000);
};

const unsyncProductHandler = async (product) => {
  clickedProduct.value = product;
  isUnsyncRequested.value = true;
};

const rowSelectHandler = (row) => {
  if(row.mapper_id) {
    const rowIndex = syncedProducts.value.findIndex(_row => _row.mapper_id == row.mapper_id);
    const selectedRowIndex = selectedProducts.value.findIndex(_row => _row.mapper_id == row.mapper_id);
    if(rowIndex === -1) {
      syncedProducts.value.push(row);
      row.added = true;
    } else {
      syncedProducts.value.splice(rowIndex, 1);
      row.added = false;
    }

    if(selectedRowIndex === -1) {
      selectedProducts.value.push(row);
    } else {
      selectedProducts.value.splice(rowIndex, 1);
    }
  } else {
    const rowIndex = unsyncedProducts.value.findIndex(_row => _row.external_product_id == row.external_product_id);
    const selectedRowIndex = selectedProducts.value.findIndex(_row => _row.external_product_id == row.external_product_id);
    if(rowIndex === -1) {
      unsyncedProducts.value.push(row);
      row.added = true;
    } else {
      unsyncedProducts.value.splice(rowIndex, 1);
      row.added = false;
    }

    if(selectedRowIndex === -1) {
      selectedProducts.value.push(row);
    } else {
      selectedProducts.value.splice(rowIndex, 1);
    }
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

const selectAll = () => {
  isAllChecked.value = !isAllChecked.value; // Toggle select all checkbox
  unselectAllRowsHandler();

  // If select all is unselected, return list
  if (!isAllChecked.value) {
    selectedProducts.value.forEach(row => row.added = false);
    return;
  }

  selectedProducts.value = [...selectedProducts.value, ...products.value];
  selectedProducts.value.forEach(row => row.added = true);
  syncedProducts.value = selectedProducts.value.filter(row => row.mapper_id);
  unsyncedProducts.value = selectedProducts.value.filter(row => !row.mapper_id);
};

const isSelected = (row) => {
  if(row.added) return 'selected';
};
</script>

<template>
  <DataTable
    :value="products"
    responsiveLayout="scroll"
    showGridlines
    :rowClass="isSelected">

    <template #empty v-if="connections?.length === 0">
      <div class="px-4 py-8 text-center">
        <h2 class="m-0 text-xl">You need to connect to a store to access their products</h2>
        <p class="text-xl line-height-3">
          Invite your partners to connect via <br> <router-link :to="routes.STORES" class="btn-link text-xl">Stores</router-link> > Connect new store
        </p>
        <p class="text-xl line-height-3">Or</p>
        <p v-if="isDestinationStore" class="text-xl line-height-3">Find quality products and partners on <router-link id="marketplace-orders-link" :to="routes.MARKETPLACE" class="text-xl btn-link">Marketplace</router-link></p>
        <p v-else-if="isSourceStore" class="text-xl line-height-3 mb-0">Find quality retail partners to sell your products on <router-link id="marketplace-orders-link" :to="routes.MARKETPLACE" class="text-xl btn-link">Marketplace</router-link></p>
      </div>
    </template>

    <template #empty v-else>
      <div class="px-4 py-8 text-center" v-if="!loading">
        <h2 class="m-0 line-height-3" v-if="selectedStoreId">No products found</h2>
        <h2 v-else class="line-height-3 font-semi">
          To view <span v-if="isDestinationStore">and sync</span> products, select a {{ partnerStoreType }} from the <br> dropdown at the top right
        </h2>
        <p v-if="isSourceStore" class="block mt-4 mb-0 text-xl line-height-3">Import and sync of products is managed by the <br> Destination store</p>
      </div>
    </template>

    <template #header>
      <ProductsViewHeader />
    </template>

    <Column v-if="isDestinationStore">
      <template #header>
        <CheckboxWrapper :isChecked="isAllChecked" @onInput="selectAll" />
      </template>
      <template #body="{ data }">
        <CheckboxWrapper :isChecked="data.added" @onInput="rowSelectHandler(data)" />
      </template>
    </Column>

    <Column header="Product" style="width: 36%; max-width: 36%;">
      <template #body="{ data: { default_image_url, external_product_id, product_status, store_id, title } }">
        <div class="flex align-items-center pointer btn-link-parent" @click.prevent="fetchProductDetails({ externalProductId: external_product_id, targetStoreId: store_id }, true)">
          <figure class="m-0" style="width: 42px; height: 42px; padding: 4px; border: 1px solid rgb(231, 231, 231); flex-shrink: 0;">
            <div class="w-full h-full" style="background-size: contain; background-repeat: no-repeat; background-position: center;" :style="{ backgroundImage: `url(${default_image_url})` }"></div>
          </figure>
          <div class="btn-link text-blue-500 truncate-btn ml-3 pointer ">
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

  <ProductSyncLimitDialog v-if="shouldShowProductSyncLimitDialog" :selectedProducts="unsyncedProducts?.length || '1'" />
</template>
