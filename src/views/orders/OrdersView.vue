<script setup>
import { useRouter } from 'vue-router';
import * as routes from '@/routes';

/* ----- Components ----- */
const OrderDetails = defineAsyncComponent(() => import('./components/OrderDetails.vue'));

/* ----- Data ----- */
const {
  addons,
  isOrderModulePaid,
} = toRefs(usePlanStore());

const {
  fetchOrder,
  fetchPushSettings,
  getOrderStatus,
  orders,
  setAutoPushStatus,
  toggleAutoPush,
} = useOrders();

const {
  bulkPushOrders,
  fetchOrders,
  isAutoPushEnabled,
  isBulkPushActive,
  isEnableAutoPushRequested,
  isViewOrderDetailsRequested,
  loadingMoreOrders,
  loadingOrders,
  order,
  pagination,
  selectedOrders,
} = toRefs(useOrdersStore());

const options = ref(['Off', 'On']);
const router = useRouter();

/* ----- Mounted ----- */
onMounted(async () => {
  if (!addons.value.isOrderModuleAvailable) {
    router.push({
      path: routes.DASHBOARD,
      query: { showUpgrade: 'true', type: 'orders' },
    });
    return;
  }

  fetchOrders.value();
  await fetchPushSettings();
  setAutoPushStatus();
});

/* ----- Methods ----- */
const getOrderPushStatus = (order_ref_id, pushStatus) => {
  const _selectedOrders = selectedOrders.value;
  const index = _selectedOrders.indexOf(order_ref_id);
  const isOrderSelected = index !== -1;

  if (isOrderSelected && isBulkPushActive.value) {
    if (pushStatus !== 'pushed') {
      return true;
    } else {
      selectedOrders.splice(index, 1);
      return false;
    }
  }

  return false;
};

const fetchOrderHandler = async orderId => {
  isViewOrderDetailsRequested.value = true;
  await fetchOrder(orderId);
};

const toggleAutoPushHandler = async () => {
  if(isAutoPushEnabled.value === 'On') {
    isEnableAutoPushRequested.value = true;
    return;
  }
  toggleAutoPush();
};

const onInputHandler = ({ order_ref_id }) => {
  if (orders.selectedOrders.includes(order_ref_id)) {
    const index = orders.selectedOrders.indexOf(order_ref_id);
    orders.selectedOrders.splice(index, 1);
    return;
  }

  orders.selectedOrders.push(order_ref_id);
};

const isChecked = ({ order_ref_id }) => {
  return orders.selectedOrders.length > 0 && orders.selectedOrders.includes(order_ref_id);
};

const isSelected = (row) => {
  if(orders.selectedOrders.includes(row.order_ref_id)) return 'selected';
};
</script>

<template>
  <PageHeader content="Push your orders with synced products to connected source stores" title="Orders" withActions>
    <template #actions>
      <div class="flex align-items-center justify-content-between" v-if="isOrderModulePaid">
        <h4 class="my-0 mr-4">
          Automated Push
          <br />
          <AppLink link="https://help.syncio.co/en/articles/4163480-orders-add-on" label="Read More" class="mt-1" />
        </h4>
        <SelectButton v-model="orders.isAutoPushEnabled" :options="options" aria-labelledby="single" @change="toggleAutoPushHandler" />
      </div>
      <div class="flex justify-content-between" v-else>
        <h4 class="my-0 mr-4 ml-2">
          Automated Push <i class="pi pi-lock ml-2 text-lg"></i>
          <span class="block font-semi" style="margin-top: .35rem;">Pro feature - <router-link :to="routes.PLAN_AND_BILLINGS" class="btn-link">Upgrade</router-link></span>
        </h4>
      </div>
      <router-link :to="routes.ORDER_PUSH_SETTINGS">
        <Button label="Push settings" outlined class="ml-4"></Button>
      </router-link>
    </template>
  </PageHeader>

  <!-- Bulk Push -->
  <BulkSelectedCount v-if="!isBulkPushActive" :items="orders.selectedOrders" itemType="order">
    <Button label="Push Selected Orders" @click="bulkPushOrders()" :loading="loadingOrders"></Button>
  </BulkSelectedCount>

  <!-- Skeleton Loading -->
  <OrdersViewSkeleton v-if="loadingOrders" />

  <!-- Orders Table -->
  <DataTable v-else :value="orders.orders" responsiveLayout="scroll" showGridlines class="mt-2" :rowClass="isSelected">
    <template #empty>
      <div class="px-4 py-8 text-center">
        <h2 class="m-0">No orders found</h2>
      </div>
    </template>

    <template #header>
      <OrdersViewHeader />
    </template>

    <Column header="" style="width: 3rem; min-width: 42.5px">
      <template #body="{ data }">
        <CheckboxWrapper :isChecked="isChecked(data)" :disabled="data.push_status === 'pushed' || isBulkPushActive" @onInput="onInputHandler(data)" />
      </template>
    </Column>

    <Column header="Order #" style="width: 10%">
      <template #body="{ data: { name } }">
        {{ name }}
      </template>
    </Column>

    <Column header="Date" style="width: 17.5%">
      <template #body="{ data: { created_at } }">
        <Date :date="created_at" />
      </template>
    </Column>

    <Column header="Customer" style="width: 25%">
      <template #body="{ data: { customer_name } }">
        {{ customer_name ?? 'Customer name not available' }}
      </template>
    </Column>

    <Column header="Push Status" style="width: 22.5%">
      <template #body="{ data: { order_fail_reason, order_ref_id, push_status } }">
        <div class="flex align-items-center">
          <Tag v-if="getOrderPushStatus(order_ref_id, push_status)" severity="warning" rounded>
            <StatusIcon />
            Pending
          </Tag>
          <template v-else-if="push_status === 'not_pushed'">
            <Tag :severity="getOrderStatus(push_status)" rounded :pt="{root: { style: { background: '#eee', color: '#333', border: '1px solid #333' }}}">
              <StatusIcon />
              {{ push_status.replace('_', ' ') }}
            </Tag>
            <i v-if="order_fail_reason" class="pi pi-question-circle ml-3 text-xl pointer" v-tooltip.right="order_fail_reason"></i>
          </template>
          <template v-else>
            <Tag :severity="getOrderStatus(push_status)" rounded>
              <StatusIcon />
              {{ push_status.replace('_', ' ') }}
            </Tag>
            <i v-if="order_fail_reason" class="pi pi-question-circle ml-3 text-xl pointer" v-tooltip.right="order_fail_reason"></i>
          </template>
        </div>
      </template>
    </Column>

    <Column header="Synced Items" style="width: 10%;" class="text-center">
      <template #body="{ data: { line_items } }">
        <Tag severity="info">{{ line_items?.length }}</Tag>
      </template>
    </Column>

    <Column header="Actions" style="width: 15%" class="text-right">
      <template #body="{ data: { id } }">
        <Button
          @click="fetchOrderHandler(id)"
          class="p-button-sm"
          label="View details"
          outlined>
        </Button>
      </template>
    </Column>
  </DataTable>

  <!-- Pagination -->
  <div v-if="!orders.loadingOrders" class="text-center mt-5 mb-2">
    <h3 class="font-semibold" v-if="(pagination?.current_page === pagination?.last_page) && orders.orders.length > 0">
      No more orders to see. We only display orders upto 60 days.
    </h3>

    <Button
      :loading="loadingMoreOrders"
      @click="fetchOrders(pagination?.current_page + 1, true)"
      class="p-button-lg font-semibold"
      outlined
      label="Load More Orders"
      v-if="(pagination?.current_page !== pagination?.last_page)">
    </Button>
  </div>

  <!-- Order Details -->
  <OrderDetails v-if="isViewOrderDetailsRequested" :order="order" />

  <!-- Enable Auto Push Dialog -->
  <EnableAutoPushDialog />
</template>
