<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  clickedStore,
  connections,
  fetchStoreStats,
  isConnectionSettingsDialogRequested,
  isDestinationStore,
  isLocationPendingDialogRequested,
  isMultilocation,
  isShopify,
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
  clickedStore.value = store;
  if(store.status === 'pending' && isDestinationStore.value && isShopify.value) {
    isLocationPendingDialogRequested.value = true;
    return;
  }
  selectedStoreId.value = store.id;
  await router.push({ name: routes.PRODUCTS });
  await fetchProducts.value();
};

const getStatus = (connection) => {
  let itemStatus = "";
  const { destination_default_inventory_location, source_default_inventory_location, status } = connection;

  if((status === 'active' || status === 'Active')) {
    itemStatus = 'active';
  } else if(status === 'pending' && destination_default_inventory_location !== null && source_default_inventory_location === null && isMultilocation.value) {
    itemStatus = 'pending-with-no-source';
  } else if(status === 'pending')  {
    itemStatus = 'pending';
  }

  return itemStatus;
};

// const fetchConnectionSettingsHandler = async (connection) => {
//   clickedStore.value = connection;
//   isConnectionSettingsDialogRequested.value = true;
//   const { type, user_id } = connection;
//   const resposne = await fetchStoreStats.value(type, user_id);
//   clickedStore.value = { ...clickedStore.value, ...resposne };
// };
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
        <img src="@/assets/images/shopline_logo.png" v-if="connection.platform === 'shopline'" alt="Shopline" style="width: 28px;">
      </template>
    </Column>

    <Column header="Store" style="width: 37.5%">
      <template #body="{ data: connection }">
        <div class="flex align-items-center">
          <template v-if="connection.store_name">
            <div class="flex flex-column">
              <h3 class="m-0 text-900 font-semi" style="font-size: 1.1rem;">{{ connection.store_name }}</h3>
              <p class="m-0 pt-1 text-600">{{ connection.store_domain }}</p>
            </div>
          </template>
          <template v-else>
            {{ connection?.store_domain }}
          </template>
        </div>
      </template>
    </Column>

    <Column header="Status" style="width: 12.5%" v-if="isDestinationStore">
      <template #body="{ data: connection }">
        <Tag :severity="getStoreStatus(connection.status)" rounded>
          <StatusIcon />
          <template v-if="getStatus(connection) === 'active'">
            Active
          </template>
          <template v-if="getStatus(connection) === 'pending' || getStatus(connection) === 'pending-with-no-source'">
            Pending
          </template>
        </Tag>
        <i v-if="getStatus(connection) === 'pending-with-no-source'" style="transform: translateY(4px);" class="pi pi-info-circle ml-2 text-xl pointer" v-tooltip.top="'Source store has no location set'"></i>
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
        <!-- <Button
          @click="fetchConnectionSettingsHandler(connection)"
          class="p-button-sm mr-3"
          label="Settings"
          outlined
          v-if="isSourceStore">
        </Button> -->
        <SplitButton
          outlined
          @click="fetchProductsHandler(connection)"
          class="p-button-sm"
          label="View products"
          :model="[
            { label: 'Disconnect', command: () => showDisconnectStoreDialog(connection) },
          ]">
        </SplitButton>
      </template>
    </Column>
  </DataTable>
</template>

<style>
  .p-button.p-component.p-button-icon-only.p-splitbutton-menubutton {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }

  /* .btn-source {
    .p-splitbutton-menubutton {
      border-left-color: var(--white);
    }
  } */
</style>
