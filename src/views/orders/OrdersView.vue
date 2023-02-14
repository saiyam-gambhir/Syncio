<script setup>
import { onMounted, ref } from 'vue'
import { useOrders } from './composables/orders'
import AppLink from '@/components/shared/AppLink.vue'

/* ===== COMPONENTS ===== */
import PageHeader from '@/components/shared/PageHeader.vue'

/* ===== DATA ===== */
const { fetchOrdersHandler, getOrderStatus, orders } = useOrders()
const isAutomaticPushActive = ref('Off')
const options = ref(['Off', 'On'])

/* ===== MOUNTED ===== */
onMounted(() => {
  fetchOrdersHandler()
})
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

  <DataTable :value="orders.orders" responsiveLayout="scroll" showGridlines class="mt-4">

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

    <Column header="Date (AEST)" style="width: 20%;">
      <template #body="{ data: { created_at } }">
        {{ created_at }}
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
      <template #body="{ data: {} }">
        <Button icon="pi pi-window-maximize" class="p-button-rounded p-button-outlined p-button-info" v-tooltip.top="'Details'" />
      </template>
    </Column>

  </DataTable>

</template>
