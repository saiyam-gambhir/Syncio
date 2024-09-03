<script setup>
/* ----- Data ----- */
const {
  user,
} = toRefs(useAuthStore());

const stripePricingTableID = import.meta.env.VITE_STRIPE_PRICING_TABLE_ID;
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
</script>

<template>
  <section class="mx-auto" style="width: 1400px; max-width: 100%;">
    <PageDetails title="Select your plan" content="Select your Syncio plan to activate your free 14 day trial" />

    <aside class="auth-wrapper text-left md:text-center text-900">
      <stripe-pricing-table
        class="w-100"
        :pricing-table-id="stripePricingTableID"
        :publishable-key="stripePublishableKey"
        :customer-email="`${user?.email}`">
      </stripe-pricing-table>
    </aside>
  </section>
</template>
