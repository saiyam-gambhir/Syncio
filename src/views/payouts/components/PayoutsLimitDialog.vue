<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  shouldShowPayoutsLimitDialog,
} = toRefs(usePlanStore());

/* ----- Props ----- */
const props = defineProps({
  selectedPayouts: {
    required: true,
    type: String,
  }
});

/* ----- Methods ----- */
const closeDialogHandler = () => {
  shouldShowPayoutsLimitDialog.value = false;
};
</script>

<template>
  <DialogWrapper :isVisible="shouldShowPayoutsLimitDialog" title="Selection exceeds your plan limit" width="550px" @closeDialog="closeDialogHandler">
    <template #body>
      <p class="text-xl m-0 pb-3 line-height-3">
        You can't create any more Payouts, as you've reached your plan limit.
      </p>
      <p class="text-lg mb-0 line-height-3">
        Upgrade your Payouts add-on to Pro to create more payouts. <br> Your current limit of 5 renews on 1st of next month.
      </p>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <Button label="Cancel" class="p-button-secondary mr-0" @click="closeDialogHandler"></Button>
        <router-link :to="routes.PLAN_AND_BILLINGS">
          <Button label="Upgrade" class="mr-0"></Button>
        </router-link>
      </div>
    </template>
  </DialogWrapper>
</template>
