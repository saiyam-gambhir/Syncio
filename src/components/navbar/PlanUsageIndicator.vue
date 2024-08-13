<script setup>
/* ----- Data ----- */
const {
  plan,
} = toRefs(usePlanStore())

/* ----- Computed ----- */
const getPlanDetails = computed(() => {
  const syncedProductsSold = +plan.value?.synced_products_sold || 0;

  if (syncedProductsSold > 1000) {
    return { title: 'Enterprise', availableLimit: 10000 };
  }
  if (syncedProductsSold > 100) {
    return { title: 'Pro', availableLimit: 1000 };
  }
  if (syncedProductsSold > 10) {
    return { title: 'Starter', availableLimit: 100 };
  }

  return { title: 'Free', availableLimit: 10 };
});
</script>

<template>
  <div class="mt-auto p-3" style="background: #f8f9fa;" v-if="plan?.active_addons.length === 0">
    <div class="border-round shadow-2 surface-0 p-3">
      <PlanUsage :title="getPlanDetails.title" :limitUsed="+plan?.synced_products_sold || 0" :limitAvailable="getPlanDetails.availableLimit"></PlanUsage>
    </div>
  </div>
</template>
