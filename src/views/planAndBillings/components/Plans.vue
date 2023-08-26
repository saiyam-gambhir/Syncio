<script setup>
import { useAuthStore } from '@/stores/auth';

/* ----- Data ----- */
const { activeAddons, isOnboarding, plan, plans, currentPlanId, selectedPlan, selectedAddonIds } = toRefs(useAuthStore());

/* ----- Methods ----- */
const selectPlanHandler = (plan) => {
  selectedPlan.value = plan;
  selectedPlan.value.addonsSummary = structuredClone(activeAddons.value);
  document.getElementById('addons-wrapper').scrollIntoView({ behavior: 'smooth' });

  /* Setting the selectedPlan active addons module id to selectedAddonIds */
  Object.keys(selectedAddonIds.value).forEach(key => {
    selectedAddonIds.value[key] = selectedPlan.value.addonsSummary[key].module_id;
  });
};
</script>

<template>
  <CardWrapper class="pb-2">
    <template #content>
      <Tag severity="warning" style="text-transform: uppercase !important;" class="mb-3">Step 1: select a base plan</Tag>
      <h2 class="my-2">Select how many products you need to sync</h2>
      <p class="mt-0">
        All base plans include real time and ongoing inventory syncing, and have a <strong>14 day free trial</strong>.
        <AppLink label="Learn more about our pricing" link="https://www.syncio.co/pricing"></AppLink>
      </p>

      <Message v-if="!plan.syncio_plan.is_active && !isOnboarding" severity="info" :closable="false" class="mt-5 block message-warning">
        <h3 class="mb-2">New Free Plans Available</h3>
        <h3 class="line-height-3 m-0 font-normal" style="text-transform: none !important;">
          We haven't made any changes to your account but there are new <span class="font-semibold">FREE</span> plans that could suit your needs.
          <br>
          To view, simply click on any plan option on the page.
        </h3>
      </Message>

      <div class="grid mt-4 pb-1">
        <div class="md:col-3 lg:col-3 relative p-3" v-for="_plan in plans" :key="plan?.id">
          <Plan :plan="_plan" class="plan-block pointer" @click="selectPlanHandler(_plan)" :class="{ 'current-plan': (plan.syncio_plan.id === _plan.id), 'selected-plan': currentPlanId === _plan.id }" />
          <i v-if="currentPlanId === _plan.id" class="pi pi-check-circle absolute"></i>
        </div>
      </div>
    </template>
  </CardWrapper>
</template>
