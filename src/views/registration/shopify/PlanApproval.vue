<script setup>
import * as routes from '@/routes';
import router from '@/router';

/* ----- Data ----- */
const {
  fetchPlans,
  generateUsageCharge,
} = toRefs(usePlanStore());

/* ----- OnMounted ----- */
onMounted(async () => {
  await fetchPlans.value();
});
</script>

<template>
  <section class="mx-auto" style="width: 1200px; max-width: 100%;">
    <PageDetails title="Confirm plan details" content="" />

    <aside class="grid grid-sm text-900" id="plan-approval">
      <div class="md:col-9 col-12 auth-grid-column">
        <div class="grid-column">
          <h3 class="my-0">Every month starts free</h3>
          <p class="text-lg mt-2 line-height-3">
            You'll only ever pay when you sell more than 10 products in the monthly billing period. <br> If you have less than 10 sales in the monthly billing period then it remains free.
          </p>
          <h3 class="mt-5 mb-0">Usage tiers</h3>
          <p class="text-lg mt-2 line-height-3">At the end of the month we'll determine the tier based on the synced products sold during the billing cycle.</p>

          <ul class="flex source-plans list-none p-0 m-0 mt-6">
            <SourcePlan planName="" price="" blank class="first" />
            <SourcePlan planName="Free" price="$0" limit="0-10" highlight />
            <SourcePlan planName="Starter" price="$19" limit="11-100" />
            <SourcePlan planName="Pro" price="$49" limit="101-1000" />
            <SourcePlan planName="Enterprise" price="$99" limit="1001+" />
          </ul>

          <p style="color: #757575" class="text-sm mt-3">*Synced Products Sold: The number of products synced to connected Destination stores that are sold by that store</p>

          <h3 class="mt-6">All tiers include the following</h3>
          <ul class="m-0 p-0 list-none mb-4 text-sm">
            <li>
              <i class="pi pi-check-circle text-green-600 mr-1" style="transform: translateY(1px);"></i>
              Unlimited store connections
            </li>
            <li class="mt-2">
              <i class="pi pi-check-circle text-green-600 mr-1" style="transform: translateY(1px);"></i>
              Unlimited synced products
            </li>
            <li class="mt-2">
              <i class="pi pi-check-circle text-green-600 mr-1" style="transform: translateY(1px);"></i>
              Unlimited customer support
            </li>
            <li class="mt-2">
              <i class="pi pi-check-circle text-green-600 mr-1" style="transform: translateY(1px);"></i>
              Product settings
            </li>
            <li class="mt-2">
              <i class="pi pi-check-circle text-green-600 mr-1" style="transform: translateY(1px);"></i>
              Access to Marketplace to find quality partners
            </li>
          </ul>
        </div>
      </div>
      <div class="md:col-3 col-12">
        <div class="grid-column">
          <h3 class="my-0 line-height-3">Approve your subscription to complete installation</h3>
          <p>Shopify requires you to pre-authorise the highest tier.</p>
          <strong>Rest assured, you'll only be billed for what you use each monthly billing period.</strong>
          <Button class="w-100 mt-5 mb-0" label="Go To Shopify Approval" @click="generateUsageCharge"></Button>
        </div>
      </div>
    </aside>
  </section>
</template>

<style scoped lang="scss">
.grid-column {
  background: var(--white);
  padding: 1.5rem !important;
  border-radius: var(--border-radius);
}

.source-plans li {
  flex-basis: 20%;
}

@media screen and (max-width: 850px) {
  .first {
    display: none;
  }

  .source-plans {
    display: block !important;
  }
}
</style>
