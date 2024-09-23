<script setup>
/* ----- Data ----- */
const {
  fetchOrder,
  getFinancialStatus,
  getFulfillmentStatus,
  getPushStatus,
} = useOrders();

const {
  formatCurrency,
  formatDate,
  formattedUnderscoreText,
} = useFilters();

const {
  isViewOrderDetailsRequested,
  loadingOrder,
  order,
  ordersCollection,
} = toRefs(useOrdersStore());

const {
  isShopify,
  storeName,
} = useConnectionsStore();

const bannerMessage = ref(null);
const bannerLink = ref(null);
const errorMessage = ref(null);
const errorLink = ref(null);

/* ----- Props ----- */
const props = defineProps({
  showControls: {
    type: Boolean,
    default: true,
  },

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
  fetchOrderSummary(1);
};

const fetchNextOrderSummary = () => {
  fetchOrderSummary(-1);
};

const onOrderPushHandler = () => {
  fetchOrder(props.order.syncio_order_id);
};

const getPushedDate = (date) => {
  const inputDate = new Date(date);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = inputDate.getDate();
  const month = monthNames[inputDate.getMonth()];
  const year = inputDate.getFullYear();
  const hours = (inputDate.getHours() % 12) || 12;
  const minutes = inputDate.getMinutes();
  const paddedMinutes = (minutes < 10 ? '0' : '') + minutes;
  const period = (inputDate.getHours() >= 12) ? 'PM' : 'AM';
  const formattedDate = `${day} ${month} ${year} at ${hours}:${paddedMinutes} ${period}`;
  return formattedDate;
};

const getErrorMessage = (errorMessages) => {
  if (errorMessages.length <= 0) {
    return false;
  }

  const banner = errorMessages.find(errorMessage => {
    return errorMessage['key'] === 'pushed_qty_edited' ||  errorMessage['key'] === 'not_pushed_qty_edited';
  });

  bannerMessage.value = banner?.description ?? null;
  bannerLink.value = banner?.href ?? null;

  const error = errorMessages.find(errorMessage => {
    return errorMessage['key'] !== 'pushed_qty_edited' &&  errorMessage['key'] !== 'not_pushed_qty_edited';
  });

  errorMessage.value = error?.description ?? null;
  errorLink.value = error?.href ?? null;

  return true;
};
</script>

<template>
  <Sidebar v-model:visible="isViewOrderDetailsRequested" position="right" class="w-sidebar">
    <template #header>
      <h1 class="text-4xl font-bold mb-0 flex align-items-center">
        Order Summary

        <template v-if="props.showControls">
          <Button
            :disabled="isPreviousOrderButtonDisabled"
            @click="fetchPreviousOrderSummary"
            class="p-button-sm ml-3"
            label="Previous order"
            outlined>
          </Button>

          <Button
            :disabled="isNextOrderButtonDisabled"
            @click="fetchNextOrderSummary"
            class="p-button-sm ml-3"
            label="Next order"
            outlined>
          </Button>
        </template>
      </h1>
    </template>

    <OrderDetailsSkeleton v-if="loadingOrder" />

    <div v-else class="grid mt-4">

      <div class="col-12 md:col-12 lg:col-8">
        <div v-if="bannerMessage">
          <Message severity="info" class="col-12 mt-0 mb-5" :closable="false">
            <p class="my-0">
              {{ bannerMessage }}
              <span v-if="bannerLink">
                <a :href="bannerLink" class="btn-link"> Read about how to fix.</a>
              </span>
            </p>
          </Message>
        </div>

        <CardWrapper class="pb-3">
          <template #content>
            <h3 class="mb-2 flex align-items-center">
              <LogoSmall style="width: 30px;transform: translateY(1px);" class="mr-2" /> Status:
              <Tag v-if="formattedUnderscoreText(order.push_status) === 'not pushed'" :pt="{root: { style: { background: '#eee', color: '#333', border: '1px solid #333' }}}" class="ml-3" rounded :severity="getPushStatus(order.push_status)"><StatusIcon /> {{ formattedUnderscoreText(order.push_status) }}</Tag>
              <Tag v-else class="ml-3" rounded :severity="getPushStatus(order.push_status)"><StatusIcon /> {{ formattedUnderscoreText(order.push_status) }}</Tag>
            </h3>
            <p class="mt-3 mb-0">Order contains synced products from <Tag severity="info" class="mx-1" style="padding: .25rem .75rem !important;">{{ Object.keys(order?.source_stores).length }}</Tag> {{ Object.keys(order?.source_stores).length > 1 ? 'source stores' : 'source store' }}.</p>
            <Divider />
            <h3 class="mb-0 flex align-items-center">
              <IconShopify class="mr-3" style="transform: translateY(-1px);" />
              Order details: <span class="ml-2">{{ order.name }}</span>
            </h3>
            <Divider />
            <div>
              <strong>Status:</strong>
              <Tag :severity="getFinancialStatus(order.financial_status)" rounded class="ml-3">
                <StatusIcon />
                {{ formattedUnderscoreText(order.financial_status) }}
              </Tag>
              <Tag :severity="getFulfillmentStatus(order.fulfillment_status)" rounded class="ml-2">
                <StatusIcon />
                {{ getOrderFulfillmentStatus }}
              </Tag>
            </div>
            <Divider />
            <div class="py-1">
              <strong class="mr-1">Order Id:</strong>
              <AppLink strong :label="order.id" :link="`https://${storeName}/admin/orders/${order.id}`" />
            </div>
            <Divider />
            <div class="py-1">
              <strong>Order created on</strong> {{ formatDate(order.created_at).date }} at {{ formatDate(order.created_at).time }}
            </div>
            <Divider />
            <div class="py-1" v-if="order.edited_at">
              <strong>Order edited on</strong> {{ formatDate(order.edited_at).date }} at {{ formatDate(order.edited_at).time }}
              <Divider />
            </div>
          </template>
        </CardWrapper>

        <CardWrapper class="mt-5" :class="`status-${store.push_status}`" v-for="(store, key) in order.source_stores" :key="key">
          <template #content>
            <div class="flex align-items-top justify-content-between mb-4">
              <h2 class="mb-0 flex">
                <i class="pi pi-shopping-cart text-xl mr-3" style="margin-top: .2rem;"></i>
                <div class="flex flex-column">
                  {{ store?.store_name }}
                  <span v-if="isShopify" class="text-small font-normal">{{ key + '.myshopify.com' }}</span>
                </div>
              </h2>

              <div class="text-right w-50">

                <!----- Push Order ----->
                <PushOrder :store="store" :order="order" @onOrderPush="onOrderPushHandler" />

                <!-- If order is pushed -->
                <template v-if="store.push_status === 'pushed'">
                  <Tag severity="success" :value="store.push_status" rounded />
                  <p class="mb-0 mt-3 font-semi" v-if="store.pushed_at">On {{ getPushedDate(store.pushed_at) }} (AEST)</p>
                </template>

                <template v-if="getErrorMessage(store.order_fail_reason)">
                  <p class="mb-0 mt-2 text-error">
                    {{ errorMessage }} <br>
                    <span v-if="errorLink">
                      <a :href="errorLink" class="btn-link"> Read about how to fix.</a>
                    </span>
                  </p>
                </template>
              </div>
            </div>

            <TrackingNumbers :storeOrder="store" />

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
          <template #content>
            <p v-if="order.note" class="text-lg mb-0 mt-3">{{ order.note }}</p>
            <p v-else class="mb-0 mt-2">There are no notes or feedback provided by the customer.</p>
          </template>
        </CardWrapper>

        <CardWrapper class="pb-3 mt-5" title="Additional Notes">
          <template #content>
            <div v-for="(value, propertyName) in order.additional_notes" :key="propertyName">
              <Divider />
              <div class="font-semibold">{{ propertyName }}</div>
              <div class="mt-2">{{ value }}</div>
            </div>
          </template>
        </CardWrapper>

        <CardWrapper class="pb-3 mt-5">
          <template #content>
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
          <template #content>
            <div class="mt-2"></div>
            <Tag v-for="tag in order.tags" :key="tag" severity="info" :value="tag" rounded class="mr-2 mt-2"></Tag>
          </template>
        </CardWrapper>
      </div>
    </div>
  </Sidebar>
</template>
