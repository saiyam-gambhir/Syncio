<script setup>
/* ----- Components ----- */
const BulkCommissionDialog = defineAsyncComponent(() => import('../BulkCommissionDialog.vue'));

/* ----- Data ----- */
const {
  connections,
  fetchConnections,
  loadingConnections,
} = toRefs(useConnectionsStore());

const {
  areStoreCommissionsChanged,
  bulkCommissionsUpdate,
  commissionTypeOptions,
  deleteCommission,
  isBulkCommissionUpdateRequested,
  selectedStores,
  storeConnections,
} = toRefs(usePayoutsSettingsStore());

const {
  isCheckboxSelected,
  onInputHandler,
} = useCheckbox(selectedStores.value);

/* ----- Mounted ----- */
onMounted(async () => {
  if (connections.value?.length === 0) await fetchConnections.value();
  cancelHandler();
});

watch(storeConnections, () => {
  areStoreCommissionsChanged.value = JSON.stringify(storeConnections.value) !== JSON.stringify(connections.value);
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
  await bulkCommissionsUpdate.value(storeConnections.value, 'store');
  cancelHandler();
}

const cancelHandler = () => {
  storeConnections.value = structuredClone(toRaw(connections.value));
};

const clearSelectionHandler = () => {
  selectedStores.value = [];
};

const isRowSelectedHandler = (data) => {
  return isCheckboxSelected(data, selectedStores.value);
};
</script>

<template>
  <BulkSelectedCount :items="selectedStores" itemType="store">
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
    :items="selectedStores"
    itemType="store">
  </BulkCommissionDialog>

  <StoreCommissionSkeleton v-if="loadingConnections" />

  <DataTable v-else :value="storeConnections" responsiveLayout="scroll" showGridlines :rowClass="isRowSelectedHandler">
    <template #empty>
      <div class="px-4 py-8 text-center">
        <h2 class="m-0">No stores found</h2>
      </div>
    </template>

    <template #header>
      <ConnectionsViewHeader />
    </template>

    <Column header="" style="width: 3%">
      <template #body="{ data }">
        <CheckboxWrapper
          :isChecked="isCheckboxSelected(data, selectedStores) === 'selected'"
          @onInput="onInputHandler(data, selectedStores)"
          v-if="data.platform.toLowerCase() === 'shopify'">
        </CheckboxWrapper>
      </template>
    </Column>

    <Column header="Platform" style="width: 5%" class="text-center">
      <template #body="{ data: connection }">
        <IconShopify v-if="connection.platform === 'shopify'" />
        <IconWoo v-if="connection.platform === 'woocommerce'" style="padding: .79rem 0" />
        <img src="@/assets/images/shopline_logo.png" v-if="connection.platform === 'shopline'" alt="Shopline" style="width: 28px;">
      </template>
    </Column>

    <Column header="Store" style="width: 40%">
      <template #body="{ data: connection }">
        <div class="flex align-items-center">
          {{ connection.store_domain }}
        </div>
      </template>
    </Column>

    <Column header="Commission type" style="width: 20%">
      <template #body="{ data: connection }">
        <Dropdown
          v-if="connection.platform === 'shopify'"
          :options="commissionTypeOptions"
          class="w-90"
          optionLabel="name"
          optionValue="type"
          placeholder="Select type"
          v-model="connection.store_commission_rate.type">
        </Dropdown>
        <span v-else class="font-semi">Not supported</span>
      </template>
    </Column>

    <Column style="width: 12.5%">
      <template #header>
        Rate <i class="pi pi-question-circle ml-3 text-xl" v-tooltip.right="'Select commission type to add rate'"></i>
      </template>
      <template #body="{ data: connection }">
        <div v-if="connection.platform === 'shopify' && connection.store_commission_rate.type" class="p-inputgroup">
          <InputNumber
            :maxFractionDigits="2"
            :useGrouping="false"
            placeholder="Enter Rate"
            v-model="connection.store_commission_rate.value">
          </InputNumber>
          <span class="p-inputgroup-addon">{{ getDefaultCommissionType(connection.store_commission_rate.type) }}</span>
        </div>
      </template>
    </Column>

    <Column header="Actions" style="width: 19.5%" class="text-right">
      <template #body="{ data: connection }">
        <Button
          @click="deleteCommissionHandler(connection.store_commission_rate.id)"
          class="p-button-sm p-button-danger"
          label="Clear commission"
          outlined
          v-if="connection.platform === 'shopify' && (connection.store_commission_rate.id)">
        </Button>
      </template>

      <template #footer>
        <div class="flex justify-content-end">
          <Button
            :disabled="!areStoreCommissionsChanged"
            @click="cancelHandler"
            class="mr-2"
            label="Cancel"
            outlined
            style="width: 80px;">
          </Button>

          <Button
            :disabled="!areStoreCommissionsChanged"
            :loading="loadingConnections"
            @click="bulkCommissionsUpdateHandler"
            class="ml-2"
            label="Save"
            style="width: 100px;"
            width="80px">
          </Button>
        </div>
      </template>
    </Column>
  </DataTable>
</template>
