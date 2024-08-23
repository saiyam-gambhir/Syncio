<script setup>
/* ----- Data ----- */
const {
  user,
} = toRefs(useAuthStore());
</script>

<template>
  <section class="mx-auto" style="width: 1400px; max-width: 100%;">
    <PageDetails title="Select your plan" content="Select your Syncio plan to activate your free 14 day trial" />

    <aside class="auth-wrapper text-left md:text-center text-900">
      <stripe-pricing-table
        class="w-100"
        pricing-table-id="prctbl_1PW6xMBBLFBpkQNsjrMkzFYb"
        publishable-key="pk_test_51H8O8IBBLFBpkQNsek0cYFsf5TWBKznGAKXRRiaEUTvbwLKRLO7KJ8ZyO4ag0s04sHBj1T9j6Q9emAR6UD8SdNzR002vLwlIYi"
        :customer-email="`${user?.email}`">
      </stripe-pricing-table>
    </aside>
  </section>
</template>
