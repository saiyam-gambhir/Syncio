<script setup>
import { computed, onMounted, ref, toRefs } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useConnectionsStore } from '@/stores/connections';
import { useFilters } from '@/composables/filters';

/* ----- Components ----- */
import Addon from './components/Addon.vue';
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
            <h2 class="my-2">Select how many products you need to sync</h2>
            <p class="mt-0">
              All base plans include real time and ongoing inventory syncing, and have a <strong>14 day free trial</strong>.
              <AppLink label="Learn more about our pricing" link="https://www.syncio.co/pricing"></AppLink>
            </p>

            <div class="grid mt-4">
              <div class="md:col-3 lg:col-3 relative p-3" v-for="_plan in plans" :key="plan?.id">
                <Plan :plan="_plan" class="plan-block pointer" @click="selectPlanHandler(_plan)" :class="{ 'current-plan': (plan.syncio_plan.id === _plan.id), 'selected-plan': getCurrentPlanId === _plan.id }" />
                <i v-if="getCurrentPlanId === _plan.id" class="pi pi-check-circle absolute"></i>
              </div>
            </div>
          </template>
        </CardWrapper>

        <CardWrapper class="mt-5">
          <template #content>
            <Tag severity="info" style="text-transform: uppercase !important;" class="mb-3">Step 2: upgrade add-ons</Tag>
            <h2 class="my-2">Upgrade add-ons to suit your needs</h2>
            <p class="mt-0">Downgrade at any time. All add-ons have a <strong>14 day free trial</strong>.</p>

            <div class="grid mt-4">
              <div class="md:col-4 lg:col-4 relative p-3" v-for="(options, key) in plan.syncio_plan.available_addons" :key="key">
                 <Addon :options="options" :title="key" />
              </div>
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
            <h4 class="uppercase mt-5">Base Plan</h4>
            <div v-if="plan.syncio_plan" class="flex justify-content-between uppercase font-semibold" :class="{ 'strike-through': plan.syncio_plan.id !== selectedPlan?.id }">
              <span>{{ plan.syncio_plan.name }}</span>
              <span class="tabular-nums">{{ formatCurrency(plan.syncio_plan.price_per_month) }}</span>
            </div>

            <div class="flex justify-content-between uppercase font-semibold mt-2" v-if="(plan.syncio_plan?.id !== selectedPlan?.id)">
              <span>{{ selectedPlan?.name }}</span>
              <span class="tabular-nums">{{ formatCurrency(selectedPlan?.price_per_month) }}</span>
            </div>

            <h4 class="uppercase mt-5">Add-ons</h4>
          </template>
        </CardWrapper>
      </div>
    </section>
  </article>
</template>

<style scoped>
.plan-block {
  border: 1px solid transparent;
  padding: 1rem !important;
  transition: .35s border-color;
}

.current-plan {
  background: #e3f2ff !important;
}

.selected-plan {
  border: 1px solid #0052aa;
}

.strike-through {
  text-decoration: line-through;
  color: #999;
}

.pi-check-circle {
  border-radius: 20px;
  font-size: 1.75rem;
  right: 2rem;
  top: 1.7rem;
}
</style>
