<script setup>
import { useRouter } from 'vue-router';
import * as IntercomActions from '@/intercom';
import * as routes from '@/routes';

/* ----- Components ----- */
const OrderDetails = defineAsyncComponent(() => import('./components/OrderDetails.vue'));
const OrderPushLimitDialog = defineAsyncComponent(() => import('./components/OrderPushLimitDialog.vue'));
const BulkPushDialog = defineAsyncComponent(() => import('./components/BulkPushDialog.vue'));

/* ----- Data ----- */
const {
  addons,
  highlightedAddon,
  isOrderLimitReached,
  ordersAvailableToPush,
  ordersPushed,
  shouldShowOrderPushLimitDialog,
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
  areOrdersAvailableToPush,
  fetchOrders,
  isAutoPushEnabled,
  isBulkPushActive,
  isBulkPushDialogVisible,
  isEnableAutoPushRequested,
  isViewOrderDetailsRequested,
  loadingMoreOrders,
  loadingOrders,
  order,
  pagination,
  selectedOrders,
} = toRefs(useOrdersStore());

const {
  isShopify,
  isDestinationStore,
} = toRefs(useConnectionsStore());

const options = ref(['Off', 'On']);
const router = useRouter();
let isAllChecked = ref(false);

/* ----- Mounted ----- */
onMounted(async () => {
  if (!addons.value.isOrderModuleAvailable) {
    router.push({
      path: routes.DASHBOARD,
      query: { showUpgrade: 'true', type: 'orders' },
    });
    return;
  }

  await fetchOrders.value();
  await fetchPushSettings();
  setAutoPushStatus();

  // Intercom event - Order module is not paid && Number of orders available to push > 0 && number of order pushed === 0
  if(!addons.value?.isOrderModulePaid && areOrdersAvailableToPush.value && ordersPushed.value === 0 && isShopify.value) {
    Intercom('trackEvent', IntercomActions.FIRST_ORDER_RECEIVED_EVENT);
  }
});

/* ----- Before Route Leave ----- */
onBeforeRouteLeave((to, from, next) => {
  isViewOrderDetailsRequested.value = shouldShowOrderPushLimitDialog.value = false;
  next();
});

/* ----- Computed ----- */
const allPushed = computed(() => {
  return orders.orders.filter(order => order.push_status !== 'pushed').map(({ order_ref_id }) => order_ref_id).length === 0;
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
    isAllChecked.value = false; // Unselect select-all checkbox
    return;
  }

  orders.selectedOrders.push(order_ref_id);

  // Check select all checkbox if all boxes are checked
  if (allChecked()) {
    isAllChecked.value = true;
  }
};

const isChecked = ({ order_ref_id }) => {
  // Check select all checkbox if all boxes are checked
  if (allChecked()) {
    isAllChecked.value = true;
  }
  return orders.selectedOrders.length > 0 && orders.selectedOrders.includes(order_ref_id);
};

const isSelected = (row) => {
  if(orders.selectedOrders.includes(row.order_ref_id)) return 'selected';
};

const clearSelectionHandler = () => {
  isAllChecked.value = false;
  selectedOrders.value = [];
};

const bulkPushOrdersHandler = async () => {
  if(!addons.value.isOrderModulePaid && (isOrderLimitReached.value || (selectedOrders.value.length > ordersAvailableToPush.value))) {
    shouldShowOrderPushLimitDialog.value = true;
    return;
  }

  isBulkPushDialogVisible.value = true;
};

const selectAll = () => {
  isAllChecked.value = !isAllChecked.value; // Toggle select all checkbox

  // If select all is unselected, clear the orders list
  if (!isAllChecked.value) {
    selectedOrders.value = [];
    return;
  }

  orders.selectedOrders = [];
  const notPushed = orders.orders.filter(order => order.push_status !== 'pushed').map(({ order_ref_id }) => order_ref_id);
  orders.selectedOrders.push(...notPushed);
};

const allChecked = () => {
  return orders.selectedOrders.length === orders.orders.filter(order => order.push_status !== 'pushed').map(({ order_ref_id }) => order_ref_id).length;
}

const getErrorMessage = (errorMessages) => {
  if (errorMessages.length <= 0) {
    return null;
  }

  const error = errorMessages.find(errorMessage => {
    return errorMessage['key'] !== 'pushed_qty_edited' &&  errorMessage['key'] !== 'not_pushed_qty_edited';
  });

  if (!error) {
    return errorMessages.find(({ key }) => key === 'pushed_qty_edited' || key === 'not_pushed_qty_edited');
  }

  return error;
};
</script>

<template>
  <PageHeader title="Orders" withActions withLink>
    <template #header>
      Push your orders with synced products to connected source stores. <br>
      <AppLink link="https://help.syncio.co/en/articles/4163480-orders-add-on" label="Learn about orders" />
    </template>

    <template #actions>
      <div class="flex align-items-center justify-content-between" v-if="addons.isOrderModulePaid">
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
          <span class="block font-semi" style="margin-top: .35rem;">Pro feature - <router-link :to="routes.PLAN_AND_BILLINGS" @click="highlightedAddon = 'order'" class="btn-link">Upgrade</router-link></span>
        </h4>
      </div>
      <router-link :to="routes.ORDER_PUSH_SETTINGS">
        <Button label="Push settings" outlined class="ml-4"></Button>
      </router-link>
    </template>
  </PageHeader>

  <!-- Bulk Push -->
  <BulkSelectedCount v-if="!isBulkPushActive" :items="orders.selectedOrders" itemType="order">
    <Button
      :loading="loadingOrders"
      @click="bulkPushOrdersHandler()"
      label="Push Selected Orders">
    </Button>

    <Button
      @click="clearSelectionHandler"
      class="ml-2"
      icon="pi pi-times"
      rounded
      outlined
      style="vertical-align: top !important;"
      size="10px"
      v-tooltip.bottom="'Clear selection'">
    </Button>
  </BulkSelectedCount>

  <!-- Skeleton Loading -->
  <OrdersViewSkeleton v-if="loadingOrders" />

  <!-- Orders Table -->
  <DataTable v-else :value="orders.orders" responsiveLayout="scroll" showGridlines class="mt-2" :rowClass="isSelected">
    <template #empty>
      <div class="px-4 py-8 text-center">
        <h2 class="m-0 text-xl">Expecting an order to show up here?</h2>
        <p class="text-xl line-height-3 mt-5 mb-0">Make sure your order meets the requirements</p>
        <p class="text-xl line-height-3 mt-2">
          <AppLink label="Read about Order requirements" link="https://help.syncio.co/en/articles/3285542-order-add-on-conditions-and-limitations" class="text-xl" />
        </p>
        <p v-if="isDestinationStore" class="text-xl line-height-3 mb-0 mt-6 pt-2">
          🚀 <br>
          <span class="font-semi block mt-2 pt-1">Want to get more sales? </span>
        </p>
        <p class="text-xl line-height-3 mt-2 mb-0 pt-1">Find quality products and partners on <router-link id="marketplace-orders-link" :to="routes.MARKETPLACE" class="text-xl btn-link">Marketplace</router-link></p>
      </div>
    </template>

    <template #header>
      <OrdersViewHeader />
    </template>

    <Column style="width: 2.5%; min-width: 48px;" @row-select-all="selectAll">
      <template #header>
        <CheckboxWrapper :isChecked="isAllChecked" :disabled="allPushed" @onInput="selectAll" />
      </template>
      <template #body="{ data }">
        <CheckboxWrapper :isChecked="isChecked(data)" :disabled="data.push_status === 'pushed' || isBulkPushActive" @onInput="onInputHandler(data)" />
      </template>
    </Column>

    <Column header="Order #" style="width: 10%">
      <template #body="{ data: { id, name } }">
        <div class="flex align-items-center pointer btn-link-parent py-2" @click.prevent="fetchOrderHandler(id)">
          <a href="javascript:void(0);" class="btn-link">{{ name }}</a>
        </div>
      </template>
    </Column>

    <Column header="Date (AEST)" style="width: 12.5%">
      <template #body="{ data: { created_at } }">
        <Date :date="created_at" />
      </template>
    </Column>

    <Column header="Customer" style="width: 15%">
      <template #body="{ data: { customer_name } }">
        {{ customer_name ?? 'Customer name not available' }}
      </template>
    </Column>

    <Column header="Push Status" style="width: 12.5%">
      <template #body="{ data: { order_ref_id, push_status } }">
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
          </template>
          <template v-else>
            <Tag :severity="getOrderStatus(push_status)" rounded>
              <StatusIcon />
              {{ push_status.replace('_', ' ') }}
            </Tag>
          </template>
        </div>
      </template>
    </Column>

    <Column header="Details" style="width: 27.5%">
      <template #body="{ data: { order_fail_reason } }">
        <div v-if="order_fail_reason.length > 0">
          <span class="text-error">
            {{ getErrorMessage(order_fail_reason)['description'] }}
          </span>
          <span v-if="getErrorMessage(order_fail_reason)['href'] !== null">
            <a :href="getErrorMessage(order_fail_reason)['href']" class="btn-link"> Read about how to fix.</a>
          </span>
        </div>
      </template>
    </Column>

    <Column header="Synced Items" style="width: 7.5%;" class="text-center">
      <template #body="{ data: { line_items } }">
        <Tag severity="info">{{ line_items }}</Tag>
      </template>
    </Column>

    <Column header="Actions" style="width: 12.5%" class="text-right">
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
    <h3 class="font-semi" v-if="(pagination?.current_page === pagination?.last_page) && orders.orders.length > 0">
      <div class="px-4 py-2 text-center">
        <h3 class="mt-0 mb-2">That's all your orders for the last 60 days</h3>
        <p class="line-height-3">For fulfilled orders, you can easily keep track of payments to your <br> suppliers using Payouts</p>
        <AppLink class="text-lg" link="https://help.syncio.co/en/articles/7325099-payouts-101" label="Learn about payouts" />
      </div>
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

  <OrderPushLimitDialog v-if="shouldShowOrderPushLimitDialog" :selectedOrders="selectedOrders.length !== 0 ? selectedOrders.length : 1" />

  <BulkPushDialog v-if="isBulkPushDialogVisible" />
</template>
