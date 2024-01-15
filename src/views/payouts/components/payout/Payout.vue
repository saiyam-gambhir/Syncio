<script setup>
/* ----- Data ----- */
const {
  isViewPayoutDetailsRequested,
} = toRefs(usePayoutsStore());

/* ----- Props ----- */
const props = defineProps({
  payout: {
    type: Object,
    default: {},
  },
});

/* ----- Methods ----- */
const printHandler = () => {
  window.print();
}
</script>

<template>
  <Sidebar v-model:visible="isViewPayoutDetailsRequested" position="right" class="w-sidebar">
    <template #header>
      <h1 class="text-4xl font-bold mb-0 flex align-items-center justify-content-between">
        <div class="flex">
          Payout {{ payout?.id }}
          <Tag class="ml-3" rounded v-if="payout?.status === 'payment_confirmed'" severity="success">
            <StatusIcon />
            Received
          </Tag>
          <Tag class="ml-3" rounded v-else-if="payout?.status === 'payout_created'" severity="warning">
            <StatusIcon />
            Unpaid
          </Tag>
          <Tag class="ml-3" rounded v-else-if="payout?.status === 'paid'" severity="success">
            <StatusIcon />
            Paid
          </Tag>
        </div>

        <Button
          @click="printHandler"
          class="mr-6"
          label="Print details"
          outlined>
        </Button>
      </h1>
    </template>

    <div class="grid mt-4">
      <div class="col-12 md:col-12" v-if="payout">
        <PayoutDetails :payout="payout" />
        <OrdersInvoiced :orders="payout.data" />
        <CommentsAndEvents :payout="payout" />
      </div>
    </div>
  </Sidebar>
</template>
