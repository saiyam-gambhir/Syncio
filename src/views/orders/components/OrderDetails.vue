<script setup>
import { computed, toRefs } from 'vue';
import { useConnectionsStore } from '@/stores/connections';
import { useFilters } from '@/composables/filters';
import { useOrders } from '../composables/orders';
import { useOrdersStore } from '@/stores/orders';

/* ----- Components ----- */
import AppLink from '@/components/shared/AppLink.vue';
import CardWrapper from '@/views/dashboard/components/CardWrapper.vue';
import IconShopify from '@/icons/IconShopify.vue';
import OrderDetailsSkeleton from './OrderDetailsSkeleton.vue';

/* ----- Data ----- */
const { fetchOrder, getFinancialStatus, getFulfillmentStatus } = useOrders();
const { formatCurrency, formattedUnderscoreText, formatDate } = useFilters();
const { isViewOrderDetailsRequested, loadingOrder, order, ordersCollection } = toRefs(useOrdersStore());
const { storeName } = useConnectionsStore();

/* ----- Props ----- */
const props = defineProps({
  order: {
    type: Object,
    default: {},
  },
});

/* ----- Computed ----- */
const getOrderFulfillmentStatus = computed(() => {
  let status = formattedUnderscoreText(props.order.fulfillment_status);
  if(status === 'partial') return 'partially fulfilled';
  return status;
});

const isPreviousOrderButtonDisabled = computed(() => {
  const firstOrderId = ordersCollection.value[0];
  return firstOrderId === order.value.syncio_order_id;
});

const isNextOrderButtonDisabled = computed(() => {
  const lastOrderId = ordersCollection.value.at(-1);
  return lastOrderId === order.value.syncio_order_id;
});

/* ----- Methods ----- */
const fetchOrderSummary = async index => {
  let currentOrderId = order.value.syncio_order_id;
  let currentOrderIndex = ordersCollection.value.indexOf(currentOrderId);
  let nextOrderIndex = currentOrderIndex - index;
  await fetchOrder(ordersCollection.value[nextOrderIndex]);
};

const fetchPreviousOrderSummary = () => {
  fetchOrderSummary(1)
};

const fetchNextOrderSummary = () => {
  fetchOrderSummary(-1)
};
</script>

<!-- <v-col v-else class="text-right pr-0">
  <div v-if="storeOrder.is_mapper_deleted!==true && storeOrder.store_disconnected!==true">
    <v-chip class="mb-1" color="#D91E18" text-color="white">
      <span class="text-capitalize">{{ storeOrder.push_status }}</span>
    </v-chip>
    <p style="color:#D91E18" class="mt-1 mb-0" v-if="currentOrder.push_status==='pushed'">Location
      changed</p>
    <p style="color:#D91E18" class="mt-1 mb-0" v-else>blocked by Syncio location mismatching</p>
  </div>

</v-col>
<v-col class="text-no-wrap pt-0" v-if="storeOrder.is_mapper_deleted==true && storeOrder.store_disconnected!==true">
<div><span style=" color: red;" class="pl-4" >
  Cannot fetch info as some product(s) are unsynced on {{ new Date(storeOrder.mapper_deleted_at).toLocaleString("en-US", {timeZone: "Australia/Sydney"}) | moment("DD MMM") }} (AEST)
</span></div>
</v-col>
<v-col class="text-no-wrap pt-0" v-if="storeOrder.store_disconnected==true">
<div><span style="color: red;" class="pl-4">
  Cannot fetch info as store is disconnected
</span></div>
</v-col> -->

<template>
  <Sidebar v-model:visible="isViewOrderDetailsRequested" position="right" class="w-sidebar">
    <template #header>
      <h1 class="text-4xl font-bold mb-0 flex align-items-center">
        Order Summary
        <Button
          :disabled="isPreviousOrderButtonDisabled"
          @click="fetchPreviousOrderSummary"
          class="p-button-rounded p-button-outlined p-button-info ml-3"
          icon="pi pi-arrow-left"
          v-tooltip.left="'Previous order'">
        </Button>

        <Button
          :disabled="isNextOrderButtonDisabled"
          @click="fetchNextOrderSummary"
          class="p-button-rounded p-button-outlined p-button-info ml-3"
          icon="pi pi-arrow-right"
          v-tooltip="'Next order'">
        </Button>
      </h1>
    </template>

    <OrderDetailsSkeleton v-if="loadingOrder" />

    <div v-else class="grid mt-4">
      <div v-if="order.edited" class="col-12 mb-2 py-0">
        <Message severity="warn" class="col-12 mt-0" :closable="false">
          <p class="my-0">
            This order has been edited. Last edited:
            <span class="font-semibold">{{ formatDate(order.edited_at).date }} at {{ formatDate(order.edited_at).time }}</span>
          </p>
          <p class="my-0">
            The line item / quantity edits have been pushed to the source store.
            Please verify if the source store has received the right items and
            quantities.
          </p>
        </Message>
      </div>

      <div class="col-8">
        <CardWrapper class="pb-3">
          <template #links>
            <h3 class="mb-2 flex align-items-center">
              <IconShopify class="mr-3" style="transform: translateY(-1px);" />
              My order details: {{ order.name }}
            </h3>
            <div class="mt-3 mb-5">
              <strong>Status:</strong>
              <Tag :severity="getFinancialStatus(order.financial_status)" rounded class="ml-2">{{ formattedUnderscoreText(order.financial_status) }}</Tag>
              <Tag :severity="getFulfillmentStatus(order.fulfillment_status)" rounded class="ml-2">{{ getOrderFulfillmentStatus }}</Tag>
            </div>
            <AppLink
              strong
              :label="`Order ID: ${order.id}`"
              :link="`https://${storeName}/admin/orders/${order.id}`">
            </AppLink>
            <div class="mt-2">
              <strong>Order created on</strong> {{ formatDate(order.created_at).date }} at {{ formatDate(order.created_at).time }}
            </div>
            <div v-if="order.edited_at" class="mt-2">
              <strong>Order edited on</strong> {{ formatDate(order.edited_at).date }} at {{ formatDate(order.edited_at).time }}
            </div>
          </template>
        </CardWrapper>

        <CardWrapper class="mt-5" v-for="(store, key) in order.source_stores" :key="key">
          <template #links>
            <h2 class="mb-4">
              <i class="pi pi-shopping-cart text-xl mr-2"></i>
              {{ key }}
            </h2>

            <DataTable :value="store.line_items" responsiveLayout="scroll" showGridlines>
              <Column header="Image" style="width: 7.5%" class="text-center">
                <template #body="{ data: { image } }">
                  <div style="height: 38px; padding: 2px; border: 1px solid rgb(231, 231, 231);" class="flex align-items-center flex-shrink-0 justify-content-center">
                    <img :src="image" alt="Product image" style="width: 32px;" />
                  </div>
                </template>
              </Column>
              <Column header="Title" style="width: 47.5%">
                <template #body="{ data: { sku, title } }">
                  <span class="font-semibold">{{ title }}</span>
                  <div class="mt-2">SKU: {{ sku }}</div>
                </template>
              </Column>
              <Column header="Price" style="width: 15%" class="text-right tabular-nums">
                <template #body="{ data: { unit_price } }">
                  {{ formatCurrency(unit_price) }}
                </template>
              </Column>
              <Column header="Quantity" style="width: 12.5%" class="text-right tabular-nums">
                <template #body="{ data: { quantity } }">
                  {{ quantity }}
                </template>
              </Column>
              <Column header="Total" style="width: 17.5%" class="text-right tabular-nums">
                <template #body="{ data: { total_price } }">
                  {{ formatCurrency(total_price) }}
                </template>
              </Column>
            </DataTable>
          </template>
        </CardWrapper>
      </div>

      <div class="col-4">
        <CardWrapper class="pb-3" title="Notes">
          <template #links>
            <p v-if="order.note" class="text-lg mb-0 mt-3">{{ order.note }}</p>
            <p v-else class="text-lg mb-0 mt-3">There are no notes or feedback provided by the customer.</p>
          </template>
        </CardWrapper>

        <CardWrapper class="pb-3 mt-5" title="Additional Notes">
          <template #links>
            <div v-for="(value, propertyName) in order.additional_notes" :key="propertyName">
              <Divider />
              <div class="font-semibold text-lg">{{ propertyName }}</div>
              <div class="mt-2 text-lg">{{ value }}</div>
            </div>
          </template>
        </CardWrapper>

        <CardWrapper class="pb-3 mt-5">
          <template #links>
            <div>
              <div class="font-semibold text-lg uppercase">Customer</div>
              <div class="mt-2 text-lg">{{ order.contact_details?.name }}</div>
            </div>

            <Divider />

            <div>
              <div class="font-semibold text-lg uppercase">Contact information</div>
              <div class="mt-2 text-lg">{{ order.contact_details?.email }}</div>
            </div>

            <Divider />

            <div>
              <div class="font-semibold text-lg uppercase">Shipping address</div>
              <div class="mt-2 text-lg">{{ order.shipping_address?.address1 }}</div>
              <div class="mt-2 text-lg">{{ order.shipping_address?.city }}, {{ order.shipping_address?.province }}</div>
              <div class="mt-2 text-lg">{{ order.shipping_address?.zip }}, {{ order.shipping_address?.country }}</div>
            </div>
          </template>
        </CardWrapper>

        <CardWrapper class="pb-3 mt-5" title="Tags">
          <template #links>
            <div class="mt-3"></div>
            <Tag v-for="tag in order.tags" :key="tag" severity="info" :value="tag" rounded class="mr-2"></Tag>
          </template>
        </CardWrapper>
      </div>
    </div>
  </Sidebar>
</template>
