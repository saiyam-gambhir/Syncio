<script setup>
import { useRouter } from 'vue-router';
import * as routes from '@/routes';

/* ----- Components ----- */
const AddonsDowngradeDialog = defineAsyncComponent(() => import('./AddonsDowngradeDialog.vue'));

const props = defineProps({
  isRouteShopifySelectPlan: {
    type: Boolean,
    default: false,
  }
})

/* ----- Data ----- */
const {
  formatCurrency,
} = useFilters();

const {
  generateCharge,
  isOnboarding,
  loadingPayment,
  plan,
  selectedAddonIds,
  selectedPlan,
  shouldShowAddonsDowngradeDialog,
} = toRefs(usePlanStore());

const {
  isUniversalStore,
} = toRefs(useConnectionsStore());

const areAddonsChanged = ref(false);
const clonedSelectedAddonIds = ref(null);
const isBasePlanChanged = ref(false);
const totalCartValue = ref(0);

const router = useRouter();

/* ----- Mounted ----- */
onMounted(() => {
  clonedSelectedAddonIds.value = JSON.parse(JSON.stringify(selectedAddonIds.value));
  calculateTotalCartValue();
});

/* ----- Watchers ----- */
watch(selectedPlan, () => {
  calculateTotalCartValue();
  const newValueClone = Object.assign({}, selectedPlan.value);
  delete newValueClone.addonsSummary;
  const _selectedPlan = JSON.stringify(newValueClone);
  const activePlan = JSON.stringify(plan?.value?.syncio_plan);
  isBasePlanChanged.value = _selectedPlan !== activePlan;
}, { deep: true });

watch(selectedAddonIds, () => {
  areAddonsChanged.value = JSON.stringify(clonedSelectedAddonIds.value) !== JSON.stringify(selectedAddonIds.value);
}, { deep: true });

/* ----- Computed ----- */
const allowToProceed = computed(() => {
  return (isBasePlanChanged.value || areAddonsChanged.value) && !isOnboarding.value || !plan.value;
});

/* ----- Methods ----- */
const calculateTotalCartValue = () => {
  let addonsPrice = 0;
  let basePlanPrice = +selectedPlan?.value?.price_per_month;
  if(selectedPlan?.value?.addonsSummary) {
    Object.values(selectedPlan.value.addonsSummary).forEach(addon => {
      if(addon) {
        addonsPrice += addon?.price_per_month;
      }
    });
  }
  totalCartValue.value = basePlanPrice + addonsPrice;
};

const generateChargeHandler = async () => {
  const paidAddonModuleIds = plan?.value?.active_addons.filter(addon => +addon.price_per_month > 0).map(addon => addon.module_id);
  if(selectedAddonIds.value) {
    const selectedAddonsIdsList = Object.values(selectedAddonIds.value);
    const areAllPaidAddonsSelected = paidAddonModuleIds?.every(id => selectedAddonsIdsList.includes(id));

    if(!areAllPaidAddonsSelected && plan.value) {
      shouldShowAddonsDowngradeDialog.value = true;
      return;
    }
  }

  await generateCharge.value();

  if (isOnboarding.value && totalCartValue.value === 0) {
    router.push({
      path: routes.SHOPIFY_INSTALLATION_COMPLETE,
    });
  }
}
</script>

<template>
  <CardWrapper style="position: sticky; top: 2rem;">
    <template #content>
      <Tag severity="warning" style="text-transform: uppercase !important;" class="mb-3">Step 3: Review and approve subscription</Tag>

      <p v-if="isUniversalStore" class="mt-0 mb-5">
        This will be additional to your current Source store plan.
        <br><br>
        You'll move to a new billing cycle starting today and any usage from your previous cycle will be billed separately.
      </p>

      <p v-else class="m-0">For paid plans, cancel any time within your <strong>14 day free trial</strong> period and you won't be charged. <br> Free plans are free forever.</p>

      <h2 class="mt-3 mb-0">Plan Summary</h2>

      <Divider />

      <h4 class="uppercase mt-0">Base Plan</h4>

      <div v-if="plan?.syncio_plan && plan?.store_type !== 'source'" class="flex justify-content-between uppercase font-semibold" :class="{ 'strike-through': plan?.syncio_plan?.price_per_month !== selectedPlan?.price_per_month }">
        <span>{{ plan.syncio_plan.name }} <span v-if="!plan.syncio_plan.is_active" class="legacy">(legacy)</span></span>
        <span class="tabular-nums">{{ formatCurrency(plan.syncio_plan?.price_per_month) }}</span>
      </div>

      <div class="flex justify-content-between uppercase font-semibold mt-2" v-if="(plan?.syncio_plan?.id !== selectedPlan?.id)">
        <span>{{ selectedPlan?.name }}</span>
        <span class="tabular-nums">{{ formatCurrency(selectedPlan?.price_per_month) }}</span>
      </div>

      <Divider />

      <h4 class="uppercase mt-0">Add-ons</h4>
      <div v-for="(addon, key) in selectedPlan?.addonsSummary" :key="key">
        <div v-if="addon" class="flex justify-content-between uppercase font-semibold mb-3">
          <div>
            <span v-if="key === 'order'">Orders</span>
            <span v-else-if="key === 'product'">Product Settings</span>
            <span v-else-if="key === 'payout'">Payouts</span>
            -
            <span v-if="addon?.price_per_month === 0">Free</span>
            <span v-else>Pro</span>
          </div>
          <span class="tabular-nums">{{ formatCurrency(addon?.price_per_month) }}</span>
        </div>
      </div>

      <Divider />

      <div class="flex justify-content-between uppercase font-semibold">
        <h2 class="my-0">Total</h2>
        <h2 class="mb-0 tabular-nums">{{ formatCurrency(totalCartValue) }} <span class="text-base lowercase">/ month</span></h2>
      </div>

      <Button label="Next" :disabled="!allowToProceed && !isRouteShopifySelectPlan" @click="generateChargeHandler" :loading="loadingPayment" class="p-button-lg w-full mt-5"></Button>
    </template>
  </CardWrapper>

  <AddonsDowngradeDialog v-if="shouldShowAddonsDowngradeDialog" />
</template>
