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
        Payout {{ payout?.id }}

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
        <CommentsAndEvents />
      </div>
    </div>
  </Sidebar>
</template>
