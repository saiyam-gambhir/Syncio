<script setup>
import { useFilters } from '@/composables/filters'
import { useOrders } from '../composables/orders'

/* ===== DATA ===== */
const { orders } = useOrders()
const { formatDate } = useFilters()

/* ===== PROPS ===== */
const props = defineProps({
  order: {
    type: Object,
    default: {}
  }
})
</script>

<template>
  <Sidebar v-model:visible="orders.isViewOrderDetailsRequested" position="right">
    <template #header>
      <h1 class="text-4xl font-bold mb-0">Order Summary</h1>
    </template>

    <ProgressSpinner v-if="orders.loadingOrder" strokeWidth="1.5" animationDuration="1" />
    <div v-else class="grid mt-4">

      <div v-if="order.edited" class="col-12 mb-2 py-0">
        <Message severity="warn" class="col-12 mt-0" :closable="false">
          <p class="my-0">This order has been edited. Last edited <span class="font-semibold">{{ formatDate(order.edited_at) }}</span></p>
          <p class="my-0">The line item / quantity edits have been pushed to the source store. Please verify if the Source Store has received the right items and quantities.</p>
        </Message>
      </div>

      <div class="col-7">
        <div class="surface-card border-round border-1 surface-border p-4">
          <h2 class="text-xl font-bold">My order details: #{{ order.syncio_order_id }}</h2>
	      </div>
      </div>
      <div class="col-5">
        <div class="surface-card border-round border-1 surface-border p-4">
          <h2 class="text-xl font-bold">Notes</h2>
	      </div>

        <div class="surface-card border-round border-1 surface-border p-4 mt-4">
          <h2 class="text-xl font-bold">Additional Notes</h2>
	      </div>

        <div class="surface-card border-round border-1 surface-border p-4 mt-4">
          <h2 class="text-xl font-bold">Tags</h2>
	      </div>
      </div>
    </div>
  </Sidebar>
</template>
