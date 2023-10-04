<script setup>
import { useCheckbox } from '@/composables/checkbox';
import { useConnectionsStore } from 'connections';
import { usePayoutsSettingsStore } from 'payoutsSettings';

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
  loadingStoreProducts,
  storeProducts,
  storeProductsPagination,
  unMutatedStoreProducts,
  selectedProducts,
} = toRefs(usePayoutsSettingsStore());

const {
  isCheckboxSelected,
  onInputHandler,
  isRowSelected,
} = useCheckbox(selectedProducts.value);

/* ----- Mounted ----- */
onMounted(async () => {
  if (connections.value.length === 0) await fetchConnections.value();
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

const getStoreName = (id) => {
  const store = connectionFilterItems.value?.find(store => store.id === id);
  return store?.store_domain;
}

const updateCurrentPageHandler = page => {
  fetchByProduct.value(page);
};
</script>

<template>
  <BulkSelectedCount :items="selectedProducts" itemType="product">
    <Button label="Set commission type and rate" @click=""></Button>
  </BulkSelectedCount>

  <ProductCommissionSkeleton v-if="loadingStoreProducts" />

  <DataTable v-else :value="storeProducts" responsiveLayout="scroll" showGridlines :rowClass="isRowSelected">
    <template #empty>
      <div class="px-4 py-8 text-center">
        <h2 class="m-0">No products found</h2>
      </div>
    </template>

    <template #header>
      <ConnectionsViewHeader />
    </template>

    <Column header="" style="width: 3%">
      <template #body="{ data }">
        <CheckboxWrapper :isChecked="isCheckboxSelected(data, 'external_product_id') === 'selected'" @onInput="onInputHandler(data, 'external_product_id')" />
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

    <Column header="Store URL" style="width: 15%">
      <template #body="{ data: { store_id } }">
        {{ getStoreName(store_id) }}
      </template>
    </Column>

    <Column header="Commission type" style="width: 15%">
      <template #body="{ data: { product_commission_rate } }">
        <Dropdown
          :options="commissionTypeOptions"
          class="w-90"
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
      <template #body="{ data: { id, product_commission_rate } }">
        <div class="p-inputgroup" v-if="product_commission_rate.type">
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
