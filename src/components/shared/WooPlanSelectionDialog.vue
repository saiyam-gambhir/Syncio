<script setup>
/* ----- Data ----- */
const {
  user
} = toRefs(useAuthStore());

const {
  isWooPlanDialogRequested,
} = toRefs(usePlanStore());

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isWooPlanDialogRequested.value = false;
};
</script>

<template>
  <DialogWrapper :isVisible="isWooPlanDialogRequested" title="Manage your plan" width="750px" @closeDialog="closeDialogHandler" withoutTitle :showFooter="false">
    <template #body>
      <stripe-pricing-table
        pricing-table-id="prctbl_1PW6xMBBLFBpkQNsjrMkzFYb"
        publishable-key="pk_test_51H8O8IBBLFBpkQNsek0cYFsf5TWBKznGAKXRRiaEUTvbwLKRLO7KJ8ZyO4ag0s04sHBj1T9j6Q9emAR6UD8SdNzR002vLwlIYi"
        :customer-email="`${user?.email}`">
      </stripe-pricing-table>
    </template>
  </DialogWrapper>
</template>
