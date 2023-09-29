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
  commissionTypeOptions,
} = toRefs(usePayoutsSettingsStore());

/* ----- Mounted ----- */
onMounted(async () => {
  if (connections.value.length === 0) await fetchConnections.value();
});

/* ----- Methods ----- */
const defaultCommissionType = (connectionType) => {
  return connectionType === 'percentage' ? '%' : '$';
};
</script>

<template>
  <ConnectionsViewSkeleton v-if="loadingConnections" />
  <DataTable v-else :value="connections" responsiveLayout="scroll" showGridlines>
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
        <IconWoo v-if="connection.platform === 'woocommerce'" />
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
          :options="commissionTypeOptions"
          class="w-90"
          optionLabel="name"
          optionValue="type"
          placeholder="Select type"
          v-model="connection.store_commission_rate.type">
        </Dropdown>
      </template>
    </Column>

    <Column header="Rate" style="width: 15%">
      <template #body="{ data: connection }">
        <div class="p-inputgroup">
          <InputNumber
            :disabled="!connection.store_commission_rate.type"
            :maxFractionDigits="2"
            :useGrouping="false"
            placeholder="Enter Rate"
            v-model="connection.store_commission_rate.value">
          </InputNumber>
          <span class="p-inputgroup-addon">{{ defaultCommissionType(connection.store_commission_rate.type) }}</span>
        </div>
      </template>
    </Column>

    <Column header="Actions" style="width: 20%" class="text-right">
      <template #body="{ data: connection }">
        <Button label="Clear" class="p-button-sm p-button-danger"></Button>
      </template>
    </Column>
  </DataTable>
</template>
