<script setup>
import { defineAsyncComponent, onMounted, ref, toRaw } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useOrders } from './composables/orders';
import { useRouter } from 'vue-router';

/* ----- Components ----- */
import AppLink from '@/components/shared/AppLink.vue';
import BulkSelectedCount from '@/components/shared/BulkSelectedCount.vue';
import CheckboxWrapper from '@/components/shared/CheckboxWrapper.vue';
import Date from '@/components/shared/Date.vue';
import OrdersViewSkeleton from './OrdersViewSkeleton.vue';
import PageHeader from '@/components/shared/PageHeader.vue';
const OrderDetails = defineAsyncComponent(() =>
  import('./components/OrderDetails.vue')
);

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
const auth = useAuthStore();
const options = ref(['Off', 'On']);
const router = useRouter();

/* ----- MOUNTED ----- */
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
const fetchOrdersHandler = async () => {
  fetchOrders();
};

const fetchOrderHandler = async orderId => {
  orders.isViewOrderDetailsRequested = true;
  await fetchOrder(orderId);
  //set(orders.currentOrder, structuredClone(toRaw(orders.order)))
};

const toggleAutoPushHandler = async () => {
  toggleAutoPush();
};

const onInputHandler = ({ id }) => {
  if (orders.selectedOrders.includes(id)) {
    const index = orders.selectedOrders.indexOf(id);
    orders.selectedOrders.splice(index, 1);
    return;
  }

  orders.selectedOrders.push(id);
};

const isChecked = ({ id }) => {
  return orders.selectedOrders.length > 0 && orders.selectedOrders.includes(id);
};
</script>

<template>
  <PageHeader content="Push your orders with synced products to connected source stores" title="Orders" withActions>
    <template #actions>
      <div class="flex align-items-center justify-content-between">
        <h4 class="my-0 mr-4">
          Automated Push
          <br />
          <AppLink link="https://help.syncio.co/en/articles/5842693-multilocations-for-destination-stores" label="Read More" class="mt-1" />
        </h4>
        <SelectButton v-model="orders.isAutoPushEnabled" :options="options" aria-labelledby="single" @click="toggleAutoPushHandler" />
      </div>
      <router-link to="/orders/push-settings">
        <Button label="Push Settings" class="ml-4"></Button>
      </router-link>
    </template>
  </PageHeader>

  <!-- Bulk Push -->
  <BulkSelectedCount v-if="!orders.loadingOrders" :items="orders.selectedOrders" itemType="order">
    <Button label="Push Selected Orders"></Button>
  </BulkSelectedCount>

  <OrdersViewSkeleton v-if="orders.loadingOrders" />
  <DataTable v-else :value="orders.orders" :rowHover="true" responsiveLayout="scroll" showGridlines class="mt-4">
    <template #empty>
      <div class="px-4 py-8 text-center">
        <h2 class="m-0">No orders found</h2>
      </div>
    </template>

    <Column header="" style="width: 3rem; min-width: 42.5px">
      <template #body="{ data }">
        <CheckboxWrapper :isChecked="isChecked(data)" :disabled="data.push_status === 'pushed'" @onInput="onInputHandler(data)" />
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

    <Column header="Customer" style="width: 35%">
      <template #body="{ data: { customer_name } }">
        {{ customer_name ?? 'Customer name not available' }}
      </template>
    </Column>

    <Column header="Push Status" style="width: 15%">
      <template #body="{ data: { order_fail_reason, push_status } }">
        <div class="flex align-items-center">
          <Tag :severity="getOrderStatus(push_status)" rounded>{{ push_status.replace('_', ' ') }}</Tag>
          <i v-if="order_fail_reason" class="pi pi-question-circle ml-3 text-xl" v-tooltip.right="order_fail_reason"></i>
        </div>
      </template>
    </Column>

    <Column header="Synced Items" style="width: 10%">
      <template #body="{ data: { line_items } }">
        {{ line_items?.length }}
      </template>
    </Column>

    <Column header="Actions" style="width: 10%" class="text-right">
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

  <OrderDetails v-if="orders.isViewOrderDetailsRequested" :order="orders.order" />
</template>
