<script setup>
/* ----- Data ----- */
const {
  arePayableOrdersVisible,
  selectedPayoutOrders,
  selectedPayoutOrdersStoreName,
} = toRefs(usePayoutsStore());

/* ----- Methods ----- */
const goToStoresHandler = () => {
  arePayableOrdersVisible.value = true;
  selectedPayoutOrders.value = [];
};
</script>

<template>
  <DestinationPayoutsHeader />
  <Divider class="pb-2" />
  <div class="text-lg pl-1 py-1 flex align-items-center">
    <span class="pr-3 pointer flex align-items-center" @click="goToStoresHandler">
      <i class="pi pi-arrow-left mr-2"></i> Stores
    </span>
    <span class="font-light text-xl">|</span>
    <span class="font-light pl-3 mr-1">Payable orders for</span> <span>{{ selectedPayoutOrdersStoreName }}</span>
  </div>
</template>
