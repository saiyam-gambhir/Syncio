<script setup>
import * as routes from '@/routes';
import router from '@/router';

/* ----- Data ----- */
const {
  fetchPlans,
  generateUsageCharge,
} = toRefs(usePlanStore());

/* ----- OnMounted ----- */
onMounted(() => {
  fetchPlans.value();
});
</script>

<template>
  <section class="mx-auto" style="width: 1200px; max-width: 100%;">
    <PageDetails title="Confirm plan details" content="" />

    <aside class="grid grid-sm text-900">
      <div class="md:col-8 col-12 auth-grid-column">
        <div class="grid-column">
          <h3 class="my-0">Pay as you grow usage plan</h3>
          <p class="text-lg mt-2 line-height-3">Our tiered pricing model ensures you get the best value based on your usage.</p>
          <AppLink label="Learn about Source store pricing" link="" class="mt-3" />
          <h3 class="mt-5 mb-0">Plan tiers</h3>
          <p class="text-lg mt-2 line-height-3">Plan tiers and charges are automatically determined at the end of each calendar month and charged on the next Shopify billing date.</p>

          <div class="flex justify-content-between mt-6">
            <div style="flex-basis: 25%;">
              <h3>&nbsp;</h3>
              <p>&nbsp;</p>
              <p class="text-sm mt-0 mb-3 pl-3" style="transform: translateY(-4px);">Synced products sold*</p>
            </div>
            <div style="flex-basis: 18.75%;">
              <h3 class="mb-0">Free</h3>
              <p class="mt-2 text-lg font-semi">$0 <span class="text-sm font-normal text-600">/month</span></p>
              <p class="text-sm mt-0 mb-3">0-10</p>
            </div>
            <div style="flex-basis: 18.75%;">
              <h3 class="mb-0">Starter</h3>
              <p class="mt-2 text-lg font-semi">$19 <span class="text-sm font-normal text-600">/month</span></p>
              <p class="text-sm mt-0 mb-3">11-100</p>
            </div>
            <div style="flex-basis: 18.75%;">
              <h3 class="mb-0">Pro</h3>
              <p class="mt-2 text-lg font-semi">$49 <span class="text-sm font-normal text-600">/month</span></p>
              <p class="text-sm mt-0 mb-3">101-1,000</p>
            </div>
            <div style="flex-basis: 18.75%;">
              <h3 class="mb-0">Enterprise</h3>
              <p class="mt-2 text-lg font-semi">$99 <span class="text-sm font-normal text-600">/month</span></p>
              <p class="text-sm mt-0 mb-3">1000+</p>
            </div>
          </div>

          <p style="color: #757575" class="text-sm mt-1">*Synced Products Sold: The number of products synced to connected Destination stores that are sold by that store(s)</p>
          <h4 class="my-6">All tiers include the following</h4>
          <div class="flex justify-content-between mt-5">
            <div>
              <h5 class="my-0">Store connections</h5>
              <p class="text-sm my-5">Unlimited</p>
            </div>
            <div>
              <h5 class="my-0">Synced products</h5>
              <p class="text-sm my-5">Unlimited</p>
            </div>
            <div>
              <h5 class="my-0">Product settings</h5>
              <p class="text-sm my-5">
                <i class="pi pi-check text-lg text-green-500"></i>
              </p>
            </div>
            <div>
              <h5 class="my-0">Payouts</h5>
              <p class="text-sm my-5">Unlimited</p>
            </div>
            <div>
              <h5 class="my-0">Marketplace</h5>
              <p class="text-sm my-5">
                <i class="pi pi-check text-lg text-green-500"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="md:col-4 col-12">
        <div class="grid-column">
          <h3 class="my-0 line-height-3">Approve your subscription to complete installation</h3>
          <p style="color: #757575;">We recommend you don't set a spending limit in the next step, as it may cause issues with your billing and restricted access to the Syncio app.</p>
          <Button class="w-100 mt-2 mb-4" label="Go To Shopify Approval" @click="generateUsageCharge"></Button>
        </div>
      </div>
    </aside>
  </section>
</template>

<style lang="scss">
.grid-column {
  background: var(--white);
  padding: 1.5rem !important;
  border-radius: var(--border-radius);
}
</style>
