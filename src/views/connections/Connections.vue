<script setup>
import { toRefs } from 'vue';
import { useConnections } from './composables/connections';
import { useConnectionsStore } from '@/stores/connections';

/* ----- Components ----- */
import IconShopify from '@/icons/IconShopify.vue';
import IconWoo from '@/icons/IconWoo.vue';
import SearchFilter from '@/components/shared/SearchFilter.vue';

/* ----- Data ----- */
const {
  fetchConnectionsHandler,
  getStoreStatus,
  showDisconnectStoreDialog,
} = useConnections();

const {
  connections,
  filters,
  isMultilocation,
  loadingConnections,
  sortOptions,
} = toRefs(useConnectionsStore());

/* ----- Methods ----- */
const searchHandler = async (searchText) => {
  filters.value.searchString = searchText;
  await fetchConnectionsHandler();
};
</script>

<template>
  <DataTable :value="connections" responsiveLayout="scroll" showGridlines>
    <template #header>
      <div class="flex align-items-center justify-content-between">
        <div class="p-inputgroup w-35">
          <SearchFilter
            @update:modelValue="searchHandler"
            placeholder="Search by store URL"
            v-model="filters.searchString">
          </SearchFilter>
        </div>

        <Dropdown
          :loading="loadingConnections"
          :options="sortOptions"
          @change="fetchConnectionsHandler"
          optionLabel="label"
          placeholder="Sort by Store"
          v-model="filters.sortBy">
          <template #value>Sort by Store</template>
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
        <IconShopify v-if="connection.platform === 'shopify'" />
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
      <template #body="{ data: connection }" v-if="isMultilocation">
      </template>
    </Column>

    <Column header="Actions" style="width: 17.5%" class="text-right">
      <template #body="{ data: connection }">
        <Button
          icon="pi pi-list"
          class="p-button-rounded p-button-outlined p-button-info"
          v-tooltip.top="'Products'">
        </Button>
        <Button
          @click="showDisconnectStoreDialog(connection)"
          class="p-button-rounded p-button-outlined p-button-danger ml-3"
          icon="pi pi-trash"
          v-tooltip.top="'Disconnect'">
        </Button>
      </template>
    </Column>
  </DataTable>
</template>
