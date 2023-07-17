<script setup>
import { computed, ref, toRefs } from 'vue';
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
const { fetchOrder, getFinancialStatus, getFulfillmentStatus, getPushStatus } = useOrders();
const { formatCurrency, formattedUnderscoreText, formatDate } = useFilters();
const {
  isViewOrderDetailsRequested,
  loadingOrder,
  order,
  ordersCollection,
  pushOrder,
} = toRefs(useOrdersStore());
const { storeName } = useConnectionsStore();
const shippingCost = ref('');

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

const pushOrderHandler = async (targetStoreId) => {
  const payload = {
    orderId: props.order.syncio_order_id,
    shippingCost: shippingCost.value,
    targetStoreId: targetStoreId,
  };

  await pushOrder.value(payload);
};
</script>

<template>
  <Sidebar v-model:visible="isViewOrderDetailsRequested" position="right" class="w-sidebar">
    <template #header>
      <h1 class="text-4xl font-bold mb-0 flex align-items-center">
        Order Summary
        <Button
          :disabled="isPreviousOrderButtonDisabled"
          @click="fetchPreviousOrderSummary"
          class="p-button-sm ml-3"
          label="Previous Order"
          outlined
          raised>
        </Button>

        <Button
          :disabled="isNextOrderButtonDisabled"
          @click="fetchNextOrderSummary"
          class="p-button-sm ml-3"
          label="Next Order"
          outlined
          raised>
        </Button>
      </h1>
    </template>

    <OrderDetailsSkeleton v-if="loadingOrder" />

    <div v-else class="grid mt-4">

      <div class="col-12 md:col-12 lg:col-8">
        <div v-if="order.edited">
          <Message severity="warn" class="col-12 mt-0 mb-5" :closable="false">
            <p class="my-0">
              This order has been edited. Last edited:
              <span class="font-semibold">{{ formatDate(order.edited_at).date }} at {{ formatDate(order.edited_at).time }}</span>
            </p>
            <p class="my-0">The line item / quantity edits have been pushed to the source store. Please verify if the source store has received the right items and quantities.</p>
          </Message>
        </div>

        <CardWrapper class="pb-3">
          <template #links>
            <h3 class="mb-2 flex align-items-center">
              Syncio Status: <Tag class="ml-3" rounded :severity="getPushStatus(order.push_status)">{{ formattedUnderscoreText(order.push_status) }}</Tag>
            </h3>
            <p class="mt-3 mb-0">Order contains synced products from <strong>{{ Object.keys(order?.source_stores).length }}</strong> source stores.</p>
            <Divider />
            <h3 class="mb-2 flex align-items-center">
              <IconShopify class="mr-3" style="transform: translateY(-1px);" />
              My order details: {{ order.name }}
            </h3>
            <Divider />
            <div>
              <strong>Status:</strong>
              <Tag :severity="getFinancialStatus(order.financial_status)" rounded class="ml-3">{{ formattedUnderscoreText(order.financial_status) }}</Tag>
              <Tag :severity="getFulfillmentStatus(order.fulfillment_status)" rounded class="ml-2">{{ getOrderFulfillmentStatus }}</Tag>
            </div>
            <Divider />
            <AppLink
              strong
              :label="`Order ID: ${order.id}`"
              :link="`https://${storeName}/admin/orders/${order.id}`">
            </AppLink>
            <Divider />
            <div>
              <strong>Order created on</strong> {{ formatDate(order.created_at).date }} at {{ formatDate(order.created_at).time }}
            </div>
            <Divider />
            <div v-if="order.edited_at">
              <strong>Order edited on</strong> {{ formatDate(order.edited_at).date }} at {{ formatDate(order.edited_at).time }}
              <Divider />
            </div>
          </template>
        </CardWrapper>

        <CardWrapper class="mt-5" :class="`status-${store.push_status}`" v-for="(store, key) in order.source_stores" :key="key">
          <template #links>
            <div class="flex align-items-top justify-content-between mb-4">
              <h2 class="mb-0">
                <i class="pi pi-shopping-cart text-xl mr-2"></i>
                {{ key }}
              </h2>

              <div class="text-right">
                <template v-if="store.push_status !== 'pushed' && store.push_status !== 'blocked' && !store.is_mapper_deleted && !store.store_disconnected">
                  <InputText v-if="!!order.customer || !!order.shipping_address" placeholder="$ Enter a shipping fee" v-model="shippingCost" />
                </template>

                <template v-if="store.push_status !== 'blocked'">
                  <Button class="ml-3" :disabled="!shippingCost" v-if="order.customer !== null && order.shipping_address !== null && store.push_status !== 'pushed' && !store.is_mapper_deleted && !store.store_disconnected" @click="pushOrderHandler(store.target_store_id, storeName)" style="transform: translateY(-1px);">
                    <span v-if="store.push_status === 'failed'">Repush Order</span>
                    <span v-else>Push Order</span>
                  </Button>
                </template>

                <template v-if="store.push_status === 'failed' && !store.is_mapper_deleted">
                  <p class="mb-0 mt-2 text-error font-semibold">An error has occurred while pushing your order to one or more source stores. <br> Please click 'Repush Order' to try again.</p>
                </template>

                <!-- If order is pushed -->
                <template v-if="store.push_status === 'pushed'">
                  <Tag severity="success" :value="store.push_status" rounded />
                  <!-- TODO: Change date format from BE -->
                  <p class="mb-0 mt-2" v-if="store.pushed_at">on {{ formatDate(store.pushed_at).date }} at {{ formatDate(store.pushed_at).time }}</p>
                </template>

                <!-- If store is disconnected -->
                <template v-if="store.store_disconnected">
                  <p class="mb-0 mt-2 text-error font-semibold">Cannot fetch information as store is disconnected</p>
                </template>

                <template v-if="store.push_status !== 'blocked'"></template>

                <template v-else>
                  <div v-if="!store.is_mapper_deleted && !store.store_disconnected">
                    <Tag severity="danger" :value="store.push_status" icon="pi pi-times" />
                    <p class="mb-0 mt-2 text-error font-semibold" v-if="order.push_status === 'pushed'">Location changed</p>
                    <p class="mb-0 mt-2 text-error font-semibold" v-else>Blocked by Syncio location mismatching</p>
                  </div>
                </template>

                <template v-if="store.is_mapper_deleted && !store.store_disconnected">
                  <p class="mb-0 mt-2 text-error font-semibold">
                    Cannot fetch information as some product(s) are unsynced on {{ formatDate(store.mapper_deleted_at).date }} at {{ formatDate(store.mapper_deleted_at).time }}
                  </p>
                </template>
              </div>
            </div>

            <Divider />

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

      <div class="col-12 md:col-12 lg:col-4">
        <CardWrapper class="pb-3" title="Notes">
          <template #links>
            <p v-if="order.note" class="text-lg mb-0 mt-3">{{ order.note }}</p>
            <p v-else class="text-lg mb-0 mt-2">There are no notes or feedback provided by the customer.</p>
          </template>
        </CardWrapper>

        <CardWrapper class="pb-3 mt-5" title="Additional Notes">
          <template #links>
            <div v-for="(value, propertyName) in order.additional_notes" :key="propertyName">
              <Divider />
              <div class="font-semibold">{{ propertyName }}</div>
              <div class="mt-2">{{ value }}</div>
            </div>
          </template>
        </CardWrapper>

        <CardWrapper class="pb-3 mt-5">
          <template #links>
            <div>
              <div class="font-semibold text-lg uppercase">Customer</div>
              <div class="mt-2">{{ order.contact_details?.name }}</div>
            </div>

            <Divider />

            <div>
              <div class="font-semibold text-lg uppercase">Contact information</div>
              <div class="mt-2">{{ order.contact_details?.email }}</div>
            </div>

            <Divider />

            <div>
              <div class="font-semibold text-lg uppercase">Shipping address</div>
              <div class="mt-2">{{ order.shipping_address?.address1 }}</div>
              <div class="mt-2">{{ order.shipping_address?.city }}, {{ order.shipping_address?.province }}</div>
              <div class="mt-2">{{ order.shipping_address?.zip }}, {{ order.shipping_address?.country }}</div>
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
