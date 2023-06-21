<script setup>
import { useConnections } from './composables/connections';

/* ----- Components ----- */
import DestinationLocationSelector from '@/views/connections/components/multiLocation/DestinationLocationSelector.vue';
import IconShopifyVue from '@/icons/IconShopify.vue';
import IconWoo from '@/icons/IconWoo.vue';
import SearchFilter from '@/components/shared/SearchFilter.vue';

/* ----- Data ----- */
const {
  connections,
  fetchConnectionsHandler,
  getStoreStatus,
  showDisconnectStoreDialog,
} = useConnections();
</script>

<template>
  <DataTable :value="connections.connections" responsiveLayout="scroll" showGridlines>
    <template #header>
      <div class="flex align-items-center justify-content-between">
        <div class="p-inputgroup w-35">
          <SearchFilter @update:modelValue="fetchConnectionsHandler" placeholder="Search by store URL"
            v-model="connections.filters.searchString">
          </SearchFilter>
        </div>

        <Dropdown v-model="connections.filters.sortBy" :options="connections.sortOptions" optionLabel="label"
          placeholder="Sort by Store" @change="fetchConnectionsHandler" :loading="connections.loadingConnections">
          <template #value> Sort by Store </template>
          <template #option="{ option }">
            <div class="flex align-items-center justify-content-between">
              {{ option.label }}
              <i :class="option.icon"></i>
            </div>
          </template>
        </Dropdown>
      </div>
    </template>

    <template #empty>
      <div class="px-4 py-8 text-center">
        <h2 class="m-0">No stores found</h2>
      </div>
    </template>

    <Column header="Platform" style="width: 5%" class="text-center">
      <template #body="{ data: connection }">
        <IconShopifyVue v-if="connection.platform === 'shopify'" />
        <IconWoo v-if="connection.platform === 'woocommerce'" />
      </template>
    </Column>

    <Column header="Store" style="width: 37.5%">
      <template #body="{ data: connection }">
        <div class="flex align-items-center">
          {{ connection.store_domain }}
        </div>
      </template>
    </Column>

    <Column header="Status" style="width: 10%">
      <template #body="{ data: connection }">
        <Tag :severity="getStoreStatus(connection.status)" rounded>{{ connection.status }}</Tag>
      </template>
    </Column>

    <Column header="Assigned Location" style="width: 30%">
      <template #body="{ data: connection }" v-if="connections.isMultilocation">
        <DestinationLocationSelector :connection="connection" />
      </template>
    </Column>

    <Column header="Actions" style="width: 17.5%" class="text-right">
      <template #body="{ data: connection }">
        <Button icon="pi pi-list" class="p-button-rounded p-button-outlined p-button-info"
          v-tooltip.top="'Products'"></Button>
        <Button icon="pi pi-trash" class="p-button-rounded p-button-outlined p-button-danger ml-3"
          v-tooltip.top="'Disconnect'" @click="showDisconnectStoreDialog(connection)"></Button>
      </template>
    </Column>
  </DataTable>
</template>
