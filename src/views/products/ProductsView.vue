<script setup>
import { useConnectionsStore } from 'connections';
import { useProductsStore } from 'products';

/* ----- Data ----- */
const { connections, fetchConnections, isDestinationStore, partnerStoreType } = toRefs(useConnectionsStore());
const { fetchProducts, getProductDetails, products, selectedStoreId } = toRefs(useProductsStore());
const statusOptions = {
  'Not synced': 'info',
  'pending': 'warning',
  'attention': 'warning',
  'synced': 'success',
};
const syncedActions = ref([
  { label: 'View sync', command: () => {} },
  { label: 'Resync', command: () => {} },
  { label: 'Unsync', command: () => {} },
]);
const unSyncedActions = ref([
  { label: 'Map', command: () => {} },
  { label: 'Sync', command: () => {} },
]);

/* ----- Mounted ----- */
onMounted(async () => {
  if (connections.value.length === 0) await fetchConnections.value();
});

/* ----- Computed ----- */
const selectedStore = computed(() => {
  return connections.value.filter(connection => connection.id === selectedStoreId.value)[0];
})

/* ----- Methods ----- */
const storeFilterHandler = async storeId => {
  selectedStoreId.value = storeId;
};

const fetchProductsHandler = async () => {
  await fetchProducts.value(true);
}

const onInputHandler = () => {};

const getProductSyncStatus = product => {
  const { product_status, mapper_id, is_sync_failed, external_product_id } = product;

  if (product_status === 'replaced' && mapper_id) {
    return 'replaced';
  }

  if (mapper_id) {
    return 'synced';
  }

  if (is_sync_failed && !mapper_id) {
    return 'attention';
  }

  // if (!mapper_id && this.isBulkSyncActive && this.localStorage[`selectedProducts_${this.currentShop.id}`]?.includes(external_product_id)) {
  //   return 'pending';
  // }

  // if (this.getProductStatus(product) === 'Pending') {
  //   return 'pending';
  // }

  return 'Not synced';
}

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
        class="ml-5 bulk-mapper-btn"
        label="Bulk Mapper"
        outlined
        v-if="selectedStoreId">
      </Button>
    </template>
  </PageHeader>

  <article class="mt-4">
    <DataTable :value="products" responsiveLayout="scroll" showGridlines>
      <template #empty>
        <div class="px-4 py-8 text-center">
          <h2 class="m-0">No products found</h2>
        </div>
      </template>

      <!-- <template #header>
        <div class="flex align-items-center justify-content-between">
          <div class="p-inputgroup w-35">
            <SearchFilter
              @update:modelValue="searchHandler"
              placeholder="Search by exact order number (eg: #1234)"
              v-model="filters.searchString">
            </SearchFilter>
          </div>

          <Dropdown
            :loading="loadingOrders"
            :options="sortOptions"
            @change="fetchOrdersHandler"
            optionLabel="label"
            placeholder="Sort by"
            optionValue="sortBy"
            v-model="filters.sortBy">
            <template #value>Sort by</template>
            <template #option="{ option }">
              <div class="flex align-items-center justify-content-between">
                {{ option.label }}
                <i :class="option.icon" class="ml-2"></i>
              </div>
            </template>
          </Dropdown>
        </div>
      </template> -->

      <Column header="" style="width: 3%">
        <template #body="{ data }">
          <CheckboxWrapper @onInput="onInputHandler(data)" />
        </template>
      </Column>

      <Column header="Product" style="width: 36%">
        <template #body="{ data: { default_image_url, title } }">
          <div class="flex align-items-center">
            <figure class="m-0" style="width: 42px; height: 42px; padding: 4px; border: 1px solid rgb(231, 231, 231); flex-shrink: 0;">
              <div class="w-full h-full" style="background-size: contain; background-repeat: no-repeat; background-position: center;" :style="{ backgroundImage: `url(${default_image_url})` }"></div>
            </figure>
            <div class="flex flex-column ml-3">
              {{ title }}
            </div>
          </div>
        </template>
      </Column>

      <Column header="Inventory" style="width: 10%;" class="text-center">
        <template #body="{ data: { total_inventory_quantity } }">
          <Tag severity="info">{{ total_inventory_quantity }}</Tag>
        </template>
      </Column>

      <Column header="Status" style="width: 11%">
        <template #body="{ data }">
          <Tag :severity="statusOptions[getProductSyncStatus(data)]" rounded>{{ getProductSyncStatus(data).replace('_', ' ') }}</Tag>
        </template>
      </Column>

      <Column header="Sales channel visibility" style="width: 20%">
        <template #body="{ data: { published_at } }">
          <span v-if="published_at">Online store</span>
          <span v-else>Unavailable</span>
        </template>
      </Column>

      <Column header="Actions" style="width: 15%" class="text-right">
        <template #body="{ data: { external_product_id, mapper_id, store_id } }" v-if="isDestinationStore">
          <div v-if="mapper_id">
            <SplitButton label="View Details" class="p-button-sm" outlined :model="syncedActions" @click="getProductDetails({ externalProductId: external_product_id, targetStoreId: store_id })" />
          </div>
          <div v-else>
            <SplitButton label="View Details" class="p-button-sm" outlined :model="unSyncedActions" @click="getProductDetails({ externalProductId: external_product_id, targetStoreId: store_id })" />
          </div>
        </template>
      </Column>
    </DataTable>
  </article>
</template>

<style scoped>
.product-action {
  width: 70px;
}

.bulk-mapper-btn {
  height: 39.5px;
}
</style>
