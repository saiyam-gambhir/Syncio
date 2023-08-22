<script setup>
import { computed, onMounted, ref, toRefs, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useFilters } from '@/composables/filters';

/* ----- Components ----- */
import CardWrapper from '@/components/shared/CardWrapper.vue';

/* ----- Data ----- */
const { isOnboarding, plan, selectedAddonIds, selectedPlan } = toRefs(useAuthStore());
const { formatCurrency } = useFilters();
const totalCartValue = ref(0);
const isBasePlanChanged = ref(false);
const areAddonsChanged = ref(false);
const clonedSelectedAddonIds = ref(null);

/* ----- Mounted ----- */
onMounted(() => {
  clonedSelectedAddonIds.value = JSON.parse(JSON.stringify(selectedAddonIds.value));
});

/* ----- Watchers ----- */
watch(selectedPlan, () => {
  calculateTotalCartValue();
  const newValueClone = Object.assign({}, selectedPlan.value);
  delete newValueClone.addonsSummary;
  const _selectedPlan = JSON.stringify(newValueClone);
  const activePlan = JSON.stringify(plan.value.syncio_plan);
  isBasePlanChanged.value = _selectedPlan !== activePlan;
}, { deep: true });

watch(selectedAddonIds, () => {
  areAddonsChanged.value = JSON.stringify(clonedSelectedAddonIds.value) !== JSON.stringify(selectedAddonIds.value);
}, { deep: true });

/* ----- Computed ----- */
const allowToProceed = computed(() => {
  return (isBasePlanChanged.value || areAddonsChanged.value) && !isOnboarding.value;
});

/* ----- Methods ----- */
const calculateTotalCartValue = () => {
  let addonsPrice = 0;
  let basePlanPrice = +selectedPlan.value.price_per_month;
  Object.values(selectedPlan.value.addonsSummary).forEach(addon => {
    addonsPrice += +addon.price_per_month;
  });
  totalCartValue.value = basePlanPrice + addonsPrice;
};
</script>

<template>
  <CardWrapper style="position: sticky; top: 2rem;">
    <template #content>
      <Tag severity="warning" style="text-transform: uppercase !important;" class="mb-3">Step 3: Review and approve subscription</Tag>
      <p class="m-0">For paid plans, cancel any time within your <strong>14 day free trial</strong> period and you won't be charged. Free plans are free forever.</p>
      <h2 class="mt-3">Plan Summary</h2>
      <Divider />
      <h4 class="uppercase">Base Plan</h4>
      <div v-if="plan.syncio_plan" class="flex justify-content-between uppercase font-semibold" :class="{ 'strike-through': plan.syncio_plan.id !== selectedPlan?.id }">
        <span>{{ plan.syncio_plan.name }} <span v-if="!plan.syncio_plan.is_active" class="legacy">(legacy)</span></span>
        <span class="tabular-nums">{{ formatCurrency(plan.syncio_plan.price_per_month) }}</span>
      </div>

      <div class="flex justify-content-between uppercase font-semibold mt-2" v-if="(plan.syncio_plan?.id !== selectedPlan?.id)">
        <span>{{ selectedPlan?.name }}</span>
        <span class="tabular-nums">{{ formatCurrency(selectedPlan?.price_per_month) }}</span>
      </div>

      <Divider />

      <h4 class="uppercase">Add-ons</h4>
      <div class="flex justify-content-between uppercase font-semibold mb-3" v-for="(addon, key) in selectedPlan.addonsSummary" :key="key">
        <div>
          <span v-if="key === 'order'">Orders</span>
          <span v-else-if="key === 'product'">Product Settings</span>
          <span v-else-if="key === 'payout'">Payouts</span>
          -
          <span v-if="addon.price_per_month === 0">Free</span>
          <span v-else>Pro</span>
        </div>
        <span class="tabular-nums">{{ formatCurrency(addon.price_per_month) }}</span>
      </div>

      <Divider />

      <div class="flex justify-content-between uppercase font-semibold">
        <h2 class="mb-0">Total</h2>
        <h2 class="mb-0 tabular-nums">{{ formatCurrency(totalCartValue) }} <span class="text-base lowercase">/ month</span></h2>
      </div>

      <Button label="Next" :disabled="!allowToProceed" class="p-button-lg w-full mt-5"></Button>
    </template>
  </CardWrapper>
</template>
