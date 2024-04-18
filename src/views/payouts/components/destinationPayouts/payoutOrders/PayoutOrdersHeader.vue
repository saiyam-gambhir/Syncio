<script setup>
/* ----- Data ----- */
const {
  arePayableOrdersVisible,
  selectedPayoutOrders,
  selectedPayoutOrdersStoreDetails,
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
    <span class="pr-3 pointer flex align-items-center" style="color: #3b82f6;" @click="goToStoresHandler">
      <i class="pi pi-arrow-left mr-2"></i> Stores
    </span>
    <span class="font-light text-xl">|</span>
    <span class="font-light pl-3 mr-1">Payable orders for</span>
    <template v-if="selectedPayoutOrdersStoreDetails?.store_name">
      <span>{{ selectedPayoutOrdersStoreDetails.store_name }} <span class="font-normal">({{ selectedPayoutOrdersStoreDetails.store_domain }})</span></span>
    </template>
    <template v-else>
      {{ selectedPayoutOrdersStoreDetails?.store_domain }}
    </template>
  </div>
</template>
