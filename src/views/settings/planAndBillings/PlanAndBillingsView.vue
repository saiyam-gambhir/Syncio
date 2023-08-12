<script setup>
import { computed, onMounted, ref, toRefs } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useConnectionsStore } from '@/stores/connections';
import { useFilters } from '@/composables/filters';

/* ----- Components ----- */
import AppLink from '@/components/shared/AppLink.vue';
import CardWrapper from '@/components/shared/CardWrapper.vue';
import PageHeader from '@/components/shared/PageHeader.vue';
import Plan from './components/Plan.vue';

/* ----- Data ----- */
const { fetchPlans, plan, plans, getCurrentPlanId, selectedPlan } = toRefs(useAuthStore());
const { formatCurrency } = useFilters();

onMounted(async () => {
  await fetchPlansHandler();
  setSelectedPlan()
})

const setSelectedPlan = () => {
  if(plan.value && !selectedPlan.value) {
    selectedPlan.value = JSON.parse(JSON.stringify(plan.value.syncio_plan));
    return;
  }
}

const fetchPlansHandler = async () => {
  await fetchPlans.value()
}

const selectPlanHandler = (plan) => {
  selectedPlan.value = plan;
}
</script>

<template>
  <PageHeader content="Upgrade or downgrade anytime. <a href='#' class='btn-link'>Contact us</a> for help"
    title="Plan and Billings">
  </PageHeader>

  <article class="mt-4">
    <section class="grid">
      <div class="col-12 md:col-12 lg:col-9">
        <CardWrapper>
          <template #content>
            <Tag severity="info" style="text-transform: uppercase !important;" class="mb-3">Step 1: select a base plan</Tag>
            <h2>Select how many products you need to sync</h2>
            <p>
              All base plans include real time and ongoing inventory syncing, and have a <strong>14 day free trial</strong>.
              <AppLink label="Learn more about our pricing" link="https://www.syncio.co/pricing"></AppLink>
            </p>

            <div class="grid mt-4">
              <div class="lg:col-3 relative p-3" v-for="_plan in plans" :key="plan?.id">
                <Plan :plan="_plan" class="pointer" @click="selectPlanHandler(_plan)" :style="{ 'background': getCurrentPlanId === _plan.id ? '#f4f4f4 !important' : '' }" />
                <i v-if="getCurrentPlanId === _plan.id" class="pi pi-check-circle absolute" style="font-size: 2rem; top: 2.15rem; right: 2.15rem;"></i>
              </div>
            </div>
          </template>
        </CardWrapper>

        <CardWrapper class="mt-5">
          <template #content>
            <Tag severity="info" style="text-transform: uppercase !important;" class="mb-3">Step 2: upgrade add-ons</Tag>
            <h2>Upgrade add-ons to suit your needs</h2>
            <p>Downgrade at any time. All add-ons have a <strong>14 day free trial</strong>.</p>

            <div class="grid mt-4">
            </div>
          </template>
        </CardWrapper>
      </div>
      <div class="col-12 md:col-12 lg:col-3">
        <CardWrapper>
          <template #content>
            <Tag severity="info" style="text-transform: uppercase !important;" class="mb-3">Step 3: Review and approve subscription</Tag>
            <p class="m-0">For paid plans, cancel any time within your <strong>14 day free trial</strong> period and you won't be charged. Free plans are free forever.</p>
            <Divider />
            <h2>Plan Summary</h2>
            <h4 class="mt-5 uppercase">Base Plan</h4>
            <div class="flex justify-content-between uppercase">
              <span>{{ plan?.name }}</span>
              <span class="tabular-nums">{{ formatCurrency(plan?.price_per_month) }}</span>
            </div>
          </template>
        </CardWrapper>
      </div>
    </section>
  </article>
</template>
