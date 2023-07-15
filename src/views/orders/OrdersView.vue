<script setup>
import { defineAsyncComponent, onMounted, ref, toRefs } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useOrders } from './composables/orders';
import { useOrdersStore } from '@/stores/orders';
import { useRouter } from 'vue-router';

/* ----- Components ----- */
import AppLink from '@/components/shared/AppLink.vue';
import BulkSelectedCount from '@/components/shared/BulkSelectedCount.vue';
import CheckboxWrapper from '@/components/shared/CheckboxWrapper.vue';
import Date from '@/components/shared/Date.vue';
import EnableAutoPushDialog from './components/EnableAutoPushDialog.vue';
import OrdersViewSkeleton from './OrdersViewSkeleton.vue';
import PageHeader from '@/components/shared/PageHeader.vue';
import SearchFilter from '@/components/shared/SearchFilter.vue';
const OrderDetails = defineAsyncComponent(() => import('./components/OrderDetails.vue'));

/* ----- Data ----- */
const {
  fetchOrder,
  fetchOrders,
  fetchPushSettings,
  getOrderStatus,
  orders,
  setAutoPushStatus,
  toggleAutoPush,
} = useOrders();

const {
  bulkPushOrders,
  isAutoPushEnabled,
  isBulkPushActive,
  isEnableAutoPushRequested,
  loadingOrders,
  selectedOrders,
} = toRefs(useOrdersStore());

const auth = useAuthStore();
const options = ref(['Off', 'On']);
const router = useRouter();

/* ----- Mounted ----- */
onMounted(async () => {
  if (!auth.isOrderModuleAvailable) {
    router.push({
      path: '/',
      query: { showUpgrade: 'true', type: 'orders' },
    });
    return;
  }
  fetchOrdersHandler();
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


const fetchOrdersHandler = async () => {
  fetchOrders();
};

const fetchOrderHandler = async orderId => {
  orders.isViewOrderDetailsRequested = true;
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

const isAdded = (row) => {
  if(orders.selectedOrders.includes(row.order_ref_id)) return 'selected';
};
</script>

<template>
  <PageHeader content="Push your orders with synced products to connected source stores" title="Orders" withActions>
    <template #actions>
      <div class="flex align-items-center justify-content-between">
        <h4 class="my-0 mr-4">
          Automated Push
          <br />
          <AppLink link="https://help.syncio.co/en/articles/4163480-orders-add-on" label="Read More" class="mt-1" />
        </h4>
        <SelectButton v-model="orders.isAutoPushEnabled" :options="options" aria-labelledby="single" @click="toggleAutoPushHandler" />
      </div>
      <router-link to="/orders/push-settings">
        <Button label="Push Settings" class="ml-4"></Button>
      </router-link>
    </template>
  </PageHeader>

  <!-- Bulk Push -->
  <BulkSelectedCount v-if="!isBulkPushActive" :items="orders.selectedOrders" itemType="order">
    <Button label="Push Selected Orders" @click="bulkPushOrders()" :loading="loadingOrders"></Button>
  </BulkSelectedCount>

  <!-- Skeleton Loading -->
  <OrdersViewSkeleton v-if="orders.loadingOrders" />

  <!-- Orders Table -->
  <DataTable v-else :value="orders.orders" responsiveLayout="scroll" showGridlines class="mt-4" :rowClass="isAdded">
    <template #empty>
      <div class="px-4 py-8 text-center">
        <h2 class="m-0">No orders found</h2>
      </div>
    </template>

    <template #header>
      <div class="flex align-items-center justify-content-between">
        <div class="p-inputgroup w-35">
          <SearchFilter
            placeholder="Search by exact order number (eg: #1234)">
          </SearchFilter>
        </div>

        <Dropdown
          placeholder="Sort by">
          <template #value>Sort by</template>
          <template #option="{ option }">
            <div class="flex align-items-center justify-content-between">
              {{ option.label }}
              <i :class="option.icon"></i>
            </div>
          </template>
        </Dropdown>
      </div>
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

    <Column header="Date" style="width: 20%">
      <template #body="{ data: { created_at } }">
        <Date :date="created_at" />
      </template>
    </Column>

    <Column header="Customer" style="width: 30%">
      <template #body="{ data: { customer_name } }">
        {{ customer_name ?? 'Customer name not available' }}
      </template>
    </Column>

    <Column header="Push Status" style="width: 15%">
      <template #body="{ data: { order_fail_reason, order_ref_id, push_status } }">
        <div class="flex align-items-center">
          <Tag v-if="getOrderPushStatus(order_ref_id, push_status)" severity="warning" rounded>Pending</Tag>
          <template v-else>
            <Tag :severity="getOrderStatus(push_status)" rounded>{{ push_status.replace('_', ' ') }}</Tag>
            <i v-if="order_fail_reason" class="pi pi-question-circle ml-3 text-xl" v-tooltip.right="order_fail_reason"></i>
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
          label="View Details"
          outlined>
        </Button>
      </template>
    </Column>
  </DataTable>

  <!-- Order Details -->
  <OrderDetails
    v-if="orders.isViewOrderDetailsRequested"
    :order="orders.order">
  </OrderDetails>

  <!-- Enable Auto Push Dialog -->
  <EnableAutoPushDialog />
</template>
