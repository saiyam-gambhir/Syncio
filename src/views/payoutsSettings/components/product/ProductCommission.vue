<script setup>
/* ----- Components ----- */
const BulkCommissionDialog = defineAsyncComponent(() => import('../BulkCommissionDialog.vue'));

/* ----- Data ----- */
const {
  connections,
  fetchConnections,
  connectionFilterItems,
} = toRefs(useConnectionsStore());

const {
  areProductCommissionsChanged,
  bulkCommissionsUpdate,
  commissionTypeOptions,
  deleteCommission,
  fetchByProduct,
  isBulkCommissionUpdateRequested,
  loadingStoreProducts,
  selectedProducts,
  storeProducts,
  storeProductsPagination,
  unMutatedStoreProducts,
} = toRefs(usePayoutsSettingsStore());

const {
  isCheckboxSelected,
  onInputHandler,
} = useCheckbox();

/* ----- Mounted ----- */
onMounted(async () => {
  if (connections.value?.length === 0) await fetchConnections.value();
  await fetchByProduct.value();
});

watch(storeProducts, () => {
  areProductCommissionsChanged.value = JSON.stringify(storeProducts.value) !== unMutatedStoreProducts.value;
}, { deep: true });

/* ----- Methods ----- */
const getDefaultCommissionType = (connectionType) => {
  return connectionType === 'percentage' ? '%' : '$';
};

const deleteCommissionHandler = async (commissionId) => {
  await deleteCommission.value(commissionId);
  cancelHandler();
};

const bulkCommissionsUpdateHandler = async () => {
  await bulkCommissionsUpdate.value(storeProducts.value, 'product');
  cancelHandler();
};

const cancelHandler = () => {
  storeProducts.value = JSON.parse(unMutatedStoreProducts.value);
};

const getStore = (id) => {
  const store = connectionFilterItems.value?.find(store => store.id === id);
  return store;
}

const updateCurrentPageHandler = page => {
  fetchByProduct.value(page);
};

const clearSelectionHandler = () => {
  selectedProducts.value = [];
};

const isRowSelectedHandler = (data) => {
  return isCheckboxSelected(data, selectedProducts.value, 'external_product_id');
};
</script>

<template>
  <BulkSelectedCount :items="selectedProducts" itemType="product">
    <Button
      @click="isBulkCommissionUpdateRequested = true"
      label="Set commission type and rate">
    </Button>

    <template #clear>
      <Button
        @click="clearSelectionHandler"
        class="ml-2"
        icon="pi pi-times"
        rounded
        size="10px"
        v-tooltip.bottom="'Clear selection'">
      </Button>
    </template>
  </BulkSelectedCount>

  <BulkCommissionDialog
    v-if="isBulkCommissionUpdateRequested"
    :items="selectedProducts"
    itemType="product">
  </BulkCommissionDialog>

  <ProductCommissionSkeleton v-if="loadingStoreProducts" />

  <DataTable v-else :value="storeProducts" responsiveLayout="scroll" showGridlines :rowClass="isRowSelectedHandler">
    <template #empty>
      <div class="px-4 py-8 text-center">
        <h2 class="m-0">No products found</h2>
      </div>
    </template>

    <template #header>
      <ProductCommissionHeader />
    </template>

    <Column header="" style="width: 3%">
      <template #body="{ data }">
        <CheckboxWrapper
          :isChecked="isCheckboxSelected(data, selectedProducts, 'external_product_id') === 'selected'"
          @onInput="onInputHandler(data, selectedProducts, 'external_product_id')">
        </CheckboxWrapper>
      </template>
    </Column>

    <Column header="Product" style="width: 15%">
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

    <Column header="Store" style="width: 15%">
      <template #body="{ data: { store_id } }">
        <template v-if="getStore(store_id)?.store_name">
          <div class="flex flex-column">
            <h3 class="m-0 text-900 font-semi" style="font-size: 1.1rem;">{{ getStore(store_id).store_name }}</h3>
            <p class="m-0 pt-1 text-600">{{ getStore(store_id).store_domain }}</p>
          </div>
        </template>
        <template v-else>
          {{ getStore(store_id)?.store_domain }}
        </template>
      </template>
    </Column>

    <Column header="Commission type" style="width: 15%">
      <template #body="{ data: { product_commission_rate } }">
        <Dropdown
          :options="commissionTypeOptions"
          class="w-75"
          optionLabel="name"
          optionValue="type"
          placeholder="Select type"
          v-model="product_commission_rate.type">
        </Dropdown>
      </template>
    </Column>

    <Column style="width: 12.5%">
      <template #header>
        Rate <i class="pi pi-question-circle ml-3 text-xl" v-tooltip.right="'Select commission type to add rate'"></i>
      </template>
      <template #body="{ data: { product_commission_rate } }">
        <div class="p-inputgroup w-75" v-if="product_commission_rate.type">
          <InputNumber
            :maxFractionDigits="2"
            :useGrouping="false"
            placeholder="Enter Rate"
            v-model="product_commission_rate.value">
          </InputNumber>
          <span class="p-inputgroup-addon">{{ getDefaultCommissionType(product_commission_rate.type) }}</span>
        </div>
      </template>
    </Column>

    <Column header="Actions" style="width: 15%" class="text-right">
      <template #body="{ data: { product_commission_rate } }">
        <Button
          @click="deleteCommissionHandler(product_commission_rate.id)"
          class="p-button-sm p-button-danger"
          label="Clear commission"
          outlined
          v-if="product_commission_rate.id">
        </Button>
      </template>
    </Column>
  </DataTable>

  <Pagination
    :pagination="storeProductsPagination"
    @updateCurrentPage="updateCurrentPageHandler"
    v-if="storeProductsPagination">
    <template #footer>
      <div class="flex">
        <Button
          :disabled="!areProductCommissionsChanged"
          @click="cancelHandler"
          class="mr-2"
          label="Cancel"
          outlined
          style="width: 80px;">
        </Button>

        <Button
          :disabled="!areProductCommissionsChanged"
          @click="bulkCommissionsUpdateHandler"
          class="ml-2"
          label="Save"
          style="width: 100px;"
          width="80px">
        </Button>
      </div>
    </template>
  </Pagination>
</template>
