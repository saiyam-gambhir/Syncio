<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  fetchPlans,
  loadingPlans,
  plan,
  plans,
  selectedPlan,
  isOnboarding,
} = toRefs(usePlanStore());

const {
  isSourceStore,
  isWoocommerce,
} = toRefs(useConnectionsStore());

const router = useRouter();

/* ----- Mounted ----- */
onMounted(async () => {
  if (isSourceStore.value || isWoocommerce.value) {
    router.push({
      path: routes.DASHBOARD,
    });
    return;
  }

  await fetchPlansHandler();
  setSelectedPlan();
});

/* ----- Methods ----- */
const setSelectedPlan = () => {
  // Check if selectedPlan.value doesn't exist
  if (!selectedPlan.value) {
    // Assign the value based on whether plan.value exists
    selectedPlan.value = plan.value ? JSON.parse(JSON.stringify(plan.value.syncio_plan)) : JSON.parse(JSON.stringify(plans.value[0]));
  }
};

const fetchPlansHandler = async () => {
  await fetchPlans.value();
};
</script>

<template>
  <PageHeader content="Upgrade or downgrade anytime. <a href='javascript:void(0);' class='intercom-custom-launcher btn-link'>Contact us</a> for help" title="Plan and Billings" />

  <PlanAndBillingsSkeleton v-if="loadingPlans" />

  <article v-else class="mt-2">
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
