<script setup>
/* ----- Components ----- */
const OrderDetails = defineAsyncComponent(() => import('../../../orders/components/OrderDetails.vue'));

/* ----- Data ----- */
const {
  fetchOrder,
} = useOrders();

const {
  isViewOrderDetailsRequested,
  order,
} = toRefs(useOrdersStore());

const {
  isDestinationStore,
} = toRefs(useConnectionsStore());

const {
  formatCurrency,
  formatCommission,
} = useFilters();

const expandedRows = ref([]);

/* ----- Props ----- */
const props = defineProps({
  orders: {
    type: Object,
    default: {},
  },

  isPayoutCreate: {
    type: Boolean,
    default: false
  },
});

/* ----- Computed ----- */
const totalProductsInAllOrders = computed(() => {
  return props.orders?.reduce((accumulator, order) => accumulator + order.line_item_count, 0);
});

/* ----- Methods ----- */
const fetchOrderHandler = async orderId => {
  isViewOrderDetailsRequested.value = true;
  await fetchOrder(orderId);
};
</script>

<template>
  <CardWrapper class="mt-5" data-section="invoiced-orders">
    <template #content>
      <h1 class="mb-0">Orders Invoiced</h1>
      <h3 class="mb-0 mt-2 font-normal">{{ totalProductsInAllOrders }} products from {{ orders?.length }} orders</h3>

      <DataTable v-model:expandedRows="expandedRows" :value="props.orders" responsiveLayout="scroll" showGridlines class="mt-5">

        <Column expander style="width: 5%" />

        <Column header="My Order #" style="width: 15%">
          <template #body="{ data: { order_id, order_number } }">
            <a v-if="isDestinationStore" href="javascript:void(0);" class="btn-link" @click="fetchOrderHandler(order_id)" v-tooltip.top="'View order'">
              {{ order_number }}
            </a>
            <span v-else>{{ order_number }}</span>
          </template>
        </Column>

        <Column header="Source order" style="width: 15%">
          <template #body="{ data: { source_order_number } }">
            {{ source_order_number }}
          </template>
        </Column>

        <Column header="Items" style="width: 15%">
          <template #body="{ data: { line_item_count } }">
            {{ line_item_count }}
          </template>
        </Column>

        <Column header="Value" style="width: 15%">
          <template #body="{ data: { total_price } }">
            <span class="tabular-nums">
              {{ formatCurrency(total_price) }}
            </span>
          </template>
        </Column>

        <Column header="Commission" style="width: 20%">
          <template #body="{ data: { commission, commission_type } }">
            <span class="tabular-nums display-commission">
              + {{ formatCommission(commission_type, commission) }}
            </span>
          </template>
        </Column>

        <Column header="Payable" style="width: 15%">
          <template #body="{ data: { payable } }">
            <span class="tabular-nums">
              {{ formatCurrency(payable) }}
            </span>
          </template>
        </Column>

        <template #expansion="{ data }">
          <DataTable :value="data.products" responsiveLayout="scroll">
            <Column header="" style="width: 5%">
              <template #body="{ data: { image } }">
                <figure class="m-0" style="width: 42px; height: 42px; padding: 4px; border: 1px solid rgb(231, 231, 231); flex-shrink: 0;">
                  <div class="w-full h-full" style="background-size: contain; background-repeat: no-repeat; background-position: center;" :style="{ backgroundImage: `url(${image})` }"></div>
                </figure>
              </template>
            </Column>

            <Column header="Product" style="width: 15%">
              <template #body="{ data: { name } }">
                <div class="flex align-items-center">
                  <div class="flex flex-column">
                    {{ name }}
                  </div>
                </div>
              </template>
            </Column>

            <Column header="SKU" style="width: 15%">
              <template #body="{ data: { sku } }">
                {{ sku }}
              </template>
            </Column>

            <Column header="Quantity" style="width: 15%">
              <template #body="{ data: { quantity } }">
                {{ quantity }}
              </template>
            </Column>

            <Column header="Value" style="width: 15%">
              <template #body="{ data: { price } }">
                <span class="tabular-nums">
                  {{ formatCurrency(price) }}
                </span>
              </template>
            </Column>

            <Column header="Commission" style="width: 20%">
              <template #body="{ data: { commission, commission_type, commission_value } }">
                <span class="tabular-nums display-commission">
                  + {{ formatCommission(commission_type, commission) }}
                  <span class="ml-1">({{ formatCommission(commission_type, commission_value) }})</span>
                </span>
              </template>
            </Column>

            <Column header="Payable" style="width: 15%">
              <template #body="{ data: { payable } }">
                <span class="tabular-nums">
                  {{ formatCurrency(payable) }}
                </span>
              </template>
            </Column>
          </DataTable>
        </template>
      </DataTable>
    </template>
  </CardWrapper>

  <!-- Order Details -->
  <OrderDetails v-if="isViewOrderDetailsRequested" :order="order" :showControls="false" />
</template>
