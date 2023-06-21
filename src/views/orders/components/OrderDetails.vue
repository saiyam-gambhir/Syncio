<script setup>
import { useFilters } from '@/composables/filters';
import { useOrders } from '../composables/orders';

/* ----- Data ----- */
const { formatCurrency, formatDate } = useFilters();
const { fetchOrder, orders } = useOrders();

/* ----- Props ----- */
const props = defineProps({
  order: {
    type: Object,
    default: {},
  },
});

const fetchOrderSummary = async index => {
  const { order, ordersCollection } = orders;
  let currentOrderId = order.syncio_order_id;
  let currentOrderIndex = ordersCollection.indexOf(currentOrderId);
  let nextOrderIndex = currentOrderIndex - index;
  await fetchOrder(ordersCollection[nextOrderIndex]);
};

const fetchPreviousOrderSummary = () => fetchOrderSummary(1);

const fetchNextOrderSummary = () => fetchOrderSummary(-1);
</script>

<template>
  <Sidebar v-model:visible="orders.isViewOrderDetailsRequested" position="full">
    <template #header>
      <h1 class="text-4xl font-bold mb-0 flex align-items-center">
        Order Summary
        <Button icon="pi pi-arrow-left" class="p-button-rounded p-button-outlined p-button-info ml-3"
          v-tooltip.left="'Previous order'" @click="fetchPreviousOrderSummary"></Button>
        <Button icon="pi pi-arrow-right" class="p-button-rounded p-button-outlined p-button-info ml-3"
          v-tooltip="'Next order'" @click="fetchNextOrderSummary"></Button>
      </h1>
    </template>

    <ProgressSpinner v-if="orders.loadingOrder" strokeWidth="1.5" animationDuration="1" />
    <div v-else class="grid mt-4">
      <div v-if="order.edited" class="col-12 mb-2 py-0">
        <Message severity="warn" class="col-12 mt-0" :closable="false">
          <p class="my-0">
            This order has been edited. Last edited:
            <span class="font-semibold">{{ formatDate(order.edited_at) }}</span>
          </p>
          <p class="my-0">
            The line item / quantity edits have been pushed to the source store.
            Please verify if the source store has received the right items and
            quantities.
          </p>
        </Message>
      </div>

      <div class="col-7">
        <div class="surface-card border-round border-1 surface-border p-4">
          <h2 class="text-xl font-bold">My order details: {{ order.name }}</h2>
        </div>

        <Panel class="mt-4" v-for="(store, key) in order.source_stores" :key="key" :toggleable="true">
          <template #header>
            <h3 class="text-bold m-0">
              {{ key }}
            </h3>
          </template>
          <DataTable :value="store.line_items" responsiveLayout="scroll">
            <Column header="Image" style="width: 5%" class="text-center">
              <template #body="{ data: { image } }">
                <img :src="image" alt="Product image" style="height: 2rem; width: auto" />
              </template>
            </Column>
            <Column header="Title" style="width: 50%">
              <template #body="{ data: { title } }">
                {{ title }}
              </template>
            </Column>
            <Column header="Price" style="width: 15%" class="text-right">
              <template #body="{ data: { unit_price } }">
                {{ formatCurrency(unit_price) }}
              </template>
            </Column>
            <Column header="Quantity" style="width: 12.5%" class="text-right">
              <template #body="{ data: { quantity } }">
                {{ quantity }}
              </template>
            </Column>
            <Column header="Total" style="width: 17.5%" class="text-right">
              <template #body="{ data: { total_price } }">
                {{ formatCurrency(total_price) }}
              </template>
            </Column>
          </DataTable>
        </Panel>
      </div>
      <div class="col-5">
        <div class="surface-card border-round border-1 surface-border p-4">
          <h2 class="text-xl font-bold">Notes</h2>
        </div>

        <div class="surface-card border-round border-1 surface-border p-4 mt-4">
          <h2 class="text-xl font-bold">Additional Notes</h2>
        </div>

        <div class="surface-card border-round border-1 surface-border p-4 mt-4">
          <h2 class="text-xl font-bold">Tags</h2>
        </div>
      </div>
    </div>
  </Sidebar>
</template>
