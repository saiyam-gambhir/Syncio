<script setup>
import { defineAsyncComponent, onMounted, ref, toRaw } from 'vue'
import { useFilters } from '@/composables/filters'
import { useOrders } from './composables/orders'

/* ===== COMPONENTS ===== */
import AppLink from '@/components/shared/AppLink.vue'
import OrdersViewSkeleton from './OrdersViewSkeleton.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
const OrderDetails = defineAsyncComponent(() => import('./components/OrderDetails.vue'))

/* ===== DATA ===== */
const { fetchOrder, fetchOrders, getOrderStatus, orders } = useOrders()
const { formatDate } = useFilters()
const isAutomaticPushActive = ref('Off')
const options = ref(['Off', 'On'])
let currentOrder = ref({})

/* ===== MOUNTED ===== */
onMounted(() => {
  fetchOrdersHandler()
})

/* ===== METHODS ===== */
const fetchOrdersHandler = async () => {
  fetchOrders()
}

const fetchOrderHandler = async orderId => {
  orders.isViewOrderDetailsRequested = true
  await fetchOrder(orderId)
  currentOrder.value = structuredClone(toRaw(orders.order))
}
</script>

<template>
	<PageHeader
		content="Push your orders with synced products to connected source stores"
		title="Orders"
    withActions>

    <template #actions>
      <div class="flex align-items-center justify-content-between">
        <h4 class="my-0 mr-4">
          Automated Push
          <br />
          <AppLink link="https://help.syncio.co/en/articles/5842693-multilocations-for-destination-stores" label="Read More" class="mt-1" />
        </h4>
        <SelectButton v-model="isAutomaticPushActive" :options="options" aria-labelledby="single" />
      </div>
      <Button label="Push Settings" class="ml-5" icon="pi pi-cog" iconPos="right" />
    </template>
  </PageHeader>

  <OrdersViewSkeleton v-if="orders.loadingOrders" />
  <DataTable v-else :value="orders.orders" responsiveLayout="scroll" showGridlines class="mt-4">

    <template #empty>
      <div class="px-4 py-8 text-center">
        <h2 class="m-0">No orders found</h2>
      </div>
    </template>

    <Column header="Order #" style="width: 10%;">
      <template #body="{ data: { name } }">
        {{ name }}
      </template>
    </Column>

    <Column header="Date" style="width: 20%;">
      <template #body="{ data: { created_at } }">
        {{ formatDate(created_at) }}
      </template>
    </Column>

    <Column header="Customer" style="width: 35%;">
      <template #body="{ data: { customer_name } }">
        {{ customer_name }}
      </template>
    </Column>

    <Column header="Push Status" style="width: 15%;">
      <template #body="{ data: { push_status } }">
        <Tag :severity="getOrderStatus(push_status)" rounded>{{ push_status }}</Tag>
      </template>
    </Column>

    <Column header="Synced Items" style="width: 10%;">
      <template #body="{ data: { line_items } }">
        {{ line_items?.length }}
      </template>
    </Column>

    <Column header="Actions" style="width: 10%;" class="text-right">
      <template #body="{ data: { id } }">
        <Button icon="pi pi-window-maximize" class="p-button-rounded p-button-outlined p-button-info" v-tooltip.top="'View Details'" @click="fetchOrderHandler(id)" />
      </template>
    </Column>

  </DataTable>

  <OrderDetails v-if="orders.isViewOrderDetailsRequested" :order="currentOrder" />
</template>
