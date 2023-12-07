<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  connections,
  isDestinationStore,
  isMultilocation,
  isSourceStore,
} = toRefs(useConnectionsStore());

const {
  getStoreStatus,
  showDisconnectStoreDialog,
} = useConnections();

const {
  fetchProducts,
  selectedStoreId
} = toRefs(useProductsStore());

const router = useRouter();

/* ----- Methods ----- */
const fetchProductsHandler = async (store) => {
  selectedStoreId.value = store.id;
  await router.push({ name: routes.PRODUCTS });
  await fetchProducts.value();
}
</script>

<template>
  <DataTable :value="connections" responsiveLayout="scroll" showGridlines>
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
        <span class="font-semibold" v-if="connection.platform === 'shopline'">SL</span>
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
        <Tag :severity="getStoreStatus(connection.status)" rounded>
          <StatusIcon />
          {{ connection.status }}
        </Tag>
      </template>
    </Column>

    <Column header="Assigned Location" style="width: 25%" v-if="isDestinationStore">
      <template #body="{ data: connection }" v-if="isMultilocation">
        <DestinationLocationDropdown :connection="connection" />
      </template>
    </Column>

    <Column header="Inventory Location" style="width: 25%" v-if="isSourceStore">
      <template #body="{ data: connection }">
        <SourceInventoryDropdown :connection="connection" />
      </template>
    </Column>

    <Column header="Actions" style="width: 20%" class="text-right">
      <template #body="{ data: connection }">
        <SplitButton
          @click="fetchProductsHandler(connection)"
          class="p-button-sm"
          label="View products"
          :model="[
            { label: 'Disconnect', command: () => showDisconnectStoreDialog(connection) },
          ]"
          outlined>
        </SplitButton>
      </template>
    </Column>
  </DataTable>
</template>
