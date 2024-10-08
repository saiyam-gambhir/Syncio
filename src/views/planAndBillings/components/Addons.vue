<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  activeAddons,
  isOnboarding,
  plan,
  plans,
  selectedPlan,
} = toRefs(usePlanStore());

const {
  isShopline,
} = toRefs(useConnectionsStore());

const route = useRoute();

/* ----- Mounted ----- */
onMounted(() => {
  if(selectedPlan.value && !selectedPlan.value.addonsSummary) {
    selectedPlan.value.addonsSummary = structuredClone(toRaw(activeAddons?.value));
  }
});

watch(selectedPlan, (newValue, oldValue) => {
  if(!oldValue) {
    const avaialbleAddons = plans?.value[0].available_addons;
    const _activeAddons = {
      order: avaialbleAddons.order && avaialbleAddons.order[0],
      product: avaialbleAddons.product && avaialbleAddons.product[0],
      payout: avaialbleAddons.payout && avaialbleAddons.payout[0],
    };

    selectedPlan.value.addonsSummary = { ..._activeAddons };
  }
}, { deep: true })
</script>

<template>
  <CardWrapper class="mt-6 pb-2" id="addons-wrapper">
    <template #content>
      <Tag severity="warning" style="text-transform: uppercase !important;" class="mb-3">Step 2: upgrade add-ons</Tag>
      <template v-if="!isShopline">
        <h2 class="my-2">Upgrade add-ons to suit your needs</h2>
        <p class="mt-0">Downgrade at any time. All add-ons have a <strong>14 day free trial</strong>.</p>
      </template>
      <h2 v-if="isShopline" class="pt-2">No add-ons available for above base plan.</h2>

      <Message v-if="!plan?.syncio_plan.is_active && !isOnboarding && route.fullPath !== routes.SHOPIFY_SELECT_PLAN" severity="info" :closable="false" class="mt-5 block message-warning">
        <h3 class="mb-2">To access free plans for add-ons, first select a base plan above.</h3>
        <h4 class="line-height-3 m-0 font-normal" style="text-transform: none !important;">
          Once a base plan is selected, you'll see the free plan options below.
        </h4>
      </Message>

      <div class="grid mt-4 pb-1">
        <div class="md:col-4 lg:col-4 relative md:p-3 p-2" v-for="(options, key) in selectedPlan?.available_addons" :key="key">
          <Addon :options="options" :title="key" :addon="activeAddons[key]" />
        </div>
      </div>
    </template>
  </CardWrapper>
</template>
