<script setup>
import { useAuthStore } from 'auth';

/* ----- Data ----- */
const { fetchPlans, loadingPlans, plan, selectedPlan } = toRefs(useAuthStore());

/* ----- Mounted ----- */
onMounted(async () => {
  await fetchPlansHandler();
  setSelectedPlan();
});

/* ----- Methods ----- */
const setSelectedPlan = () => {
  if(plan.value && !selectedPlan.value) {
    selectedPlan.value = JSON.parse(JSON.stringify(plan.value.syncio_plan));
    return;
  }
};

const fetchPlansHandler = async () => {
  await fetchPlans.value();
};
</script>

<template>
  <PageHeader content="Upgrade or downgrade anytime. <a href='#' class='btn-link'>Contact us</a> for help" title="Plan and Billings" />

  <PlanAndBillingsSkeleton v-if="loadingPlans" />

  <article v-else class="mt-5 pt-1">
    <section class="grid">
      <div class="col-12 md:col-12 lg:col-9">
        <div class="pr-2">
          <Plans />
          <Addons />
        </div>
      </div>

      <div class="col-12 md:col-12 lg:col-3">
        <Summary />
      </div>
    </section>
  </article>
</template>

<style>
.plan-block {
  border: 1px solid transparent;
  padding: 1rem !important;
  transition: .35s border-color;
}

.current-plan.surface-card {
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
