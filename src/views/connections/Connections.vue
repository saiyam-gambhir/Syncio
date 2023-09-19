<script setup>
import { useConnections } from './composables/connections';
import { useConnectionsStore } from 'connections';
import { useProductsStore } from 'products';
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  connections,
  isMultilocation,
} = toRefs(useConnectionsStore());

const {
  getStoreStatus,
  showDisconnectStoreDialog,
} = useConnections();

const {
  fetchProducts,
  selectedStoreId
} = toRefs(useProductsStore());

const loadingProductsRoute = ref(false);
const router = useRouter();

/* ----- Methods ----- */
const fetchProductsHandler = async (store) => {
  selectedStoreId.value = store.id;
  loadingProductsRoute.value = true;
  await fetchProducts.value(true);
  loadingProductsRoute.value = false;
  await router.push({ name: routes.PRODUCTS });
}
</script>

<template>
  <DataTable :value="connections" responsiveLayout="scroll" showGridlines>
    <template #header>
      <ConnectionsViewHeader />
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

    <Column header="Status" style="width: 12.5%">
      <template #body="{ data: connection }">
        <Tag :severity="getStoreStatus(connection.status)" rounded>{{ connection.status }}</Tag>
      </template>
    </Column>

    <Column header="Assigned Location" style="width: 25%">
      <template #body="{ data: connection }" v-if="isMultilocation">
      </template>
    </Column>

    <Column header="Actions" style="width: 20%" class="text-right">
      <template #body="{ data: connection }">
        <Button
          :disabled="loadingProductsRoute"
          :loading="loadingProductsRoute"
          @click="fetchProductsHandler(connection)"
          class="p-button-sm"
          label="Products"
          outlined>
        </Button>
        <Button
          @click="showDisconnectStoreDialog(connection)"
          class="ml-2 p-button-sm"
          label="Disconnect"
          outlined
          severity="danger">
        </Button>
      </template>
    </Column>
  </DataTable>
</template>
