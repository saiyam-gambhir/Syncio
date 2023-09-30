<script setup>
import { useConnectionsStore } from 'connections';
import { usePayoutsSettingsStore } from 'payoutsSettings';

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
  deleteStoreCommission,
  storeConnections,
} = toRefs(usePayoutsSettingsStore());

/* ----- Mounted ----- */
onMounted(async () => {
  if (connections.value.length === 0) await fetchConnections.value();
  cancelHandler();
});

watch(storeConnections, () => {
  areStoreCommissionsChanged.value = JSON.stringify(storeConnections.value) !== JSON.stringify(connections.value);
}, { deep: true });

/* ----- Methods ----- */
const getDefaultCommissionType = (connectionType) => {
  return connectionType === 'percentage' ? '%' : '$';
};

const cancelHandler = () => {
  storeConnections.value = structuredClone(toRaw(connections.value));
};
</script>

<template>
  <ConnectionsViewSkeleton v-if="loadingConnections" />
  <DataTable v-else :value="storeConnections" responsiveLayout="scroll" showGridlines>
    <template #empty>
      <div class="px-4 py-8 text-center">
        <h2 class="m-0">No stores found</h2>
      </div>
    </template>

    <template #header>
      <ConnectionsViewHeader />
    </template>

    <Column header="Platform" style="width: 5%" class="text-center">
      <template #body="{ data: connection }">
        <IconShopify v-if="connection.platform === 'shopify'" />
        <IconWoo v-if="connection.platform === 'woocommerce'" class="py-2" />
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
        <span v-else>Not supported</span>
      </template>
    </Column>

    <Column header="Rate" style="width: 12.5%">
      <template #body="{ data: connection }">
        <div v-if="connection.platform === 'shopify'" class="p-inputgroup">
          <InputNumber
            :disabled="!connection.store_commission_rate.type"
            :maxFractionDigits="2"
            :useGrouping="false"
            placeholder="Enter Rate"
            v-model="connection.store_commission_rate.value">
          </InputNumber>
          <span class="p-inputgroup-addon">{{ getDefaultCommissionType(connection.store_commission_rate.type) }}</span>
        </div>
        <span v-else>Not supported</span>
      </template>
    </Column>

    <Column header="Actions" style="width: 22.5%" class="text-right">
      <template #body="{ data: connection }">
        <Button
          @click="deleteStoreCommission(connection.store_commission_rate.id)"
          class="p-button-sm p-button-danger"
          label="Clear commission"
          outlined
          v-if="connection.platform === 'shopify' && (connection.store_commission_rate.id)">
        </Button>
      </template>
    </Column>
  </DataTable>

  <div class="flex justify-content-end pt-4">
    <Button
      :disabled="!areStoreCommissionsChanged"
      @click="cancelHandler"
      class="mr-3"
      label="Cancel"
      outlined
      style="width: 80px;">
    </Button>

    <Button
      :disabled="!areStoreCommissionsChanged"
      @click="bulkCommissionsUpdate(storeConnections)"
      label="Save"
      style="width: 100px;"
      width="80px">
    </Button>
  </div>
</template>
