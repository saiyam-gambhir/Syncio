<script setup>
import { useRouter } from 'vue-router';
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  fetchCurrentPlan,
  fetchPlans,
  isOnboarding,
  loadingPlans,
  plan,
  plans,
  selectedPlan,
} = toRefs(usePlanStore());

const {
  userId,
} = toRefs(useAuthStore());

const {
  fetchCurrentStore,
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
  await fetchCurrentPlan.value(userId.value);
  setSelectedPlan();
  isOnboarding.value = true;
});

/* ----- Methods ----- */
const setSelectedPlan = () => {
  selectedPlan.value = JSON.parse(JSON.stringify(plans.value[0]));
};

const fetchPlansHandler = async () => {
  await fetchCurrentStore.value();
  await fetchPlans.value();
};
</script>

<template>
  <section class="mx-auto md:my-8" id="onboarding-plan-selection" style="max-width: 100%;">
    <PageDetails title="Select Plan" content="Upgrade or downgrade anytime. <a href='javascript:void(0);' class='intercom-custom-launcher btn-link font-semibold md:text-2xl text-lg line-height-3 mt-1 mb-6 pointer'>Contact us</a> for help" />

    <aside class="auth-wrapper text-900">

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
            <Summary isRouteShopifySelectPlan />
          </div>
        </section>
      </article>
    </aside>

  </section>
</template>

<style>
.plan-block {
  border: 1px solid transparent;
  padding: 1rem !important;
  transition: .35s border-color;
}

.current-plan.surface-card {
  background: #e3f2ff !important;
  pointer-events: none;
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
