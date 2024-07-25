<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  highlightedAddon,
  ordersAvailableToPush,
  shouldShowOrderPushLimitDialog,
} = toRefs(usePlanStore());

/* ----- Props ----- */
const props = defineProps({
  selectedOrders: {
    required: true,
    type: String,
  }
});

/* ----- Methods ----- */
const closeDialogHandler = () => {
  shouldShowOrderPushLimitDialog.value = false;
};
</script>

<template>
  <DialogWrapper :isVisible="shouldShowOrderPushLimitDialog" title="Selection exceeds your plan limit" width="550px" @closeDialog="closeDialogHandler">
    <template #body>
      <p class="text-xl m-0 pb-3 line-height-3">
        Your are trying to push <span class="font-bold">{{ selectedOrders }}</span> {{ selectedOrders > 1 ? 'orders' : 'order' }}. You can push <span class="font-bold">{{ ordersAvailableToPush }}</span> more orders within your plan limit.
      </p>
      <p class="text-lg mb-0 line-height-3">
        Upgrade your Orders add-on to Pro to push the selected orders. <br>
        Your current limit of 5 renews on 1st of next month.
      </p>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <Button label="Cancel" class="p-button-secondary mr-0" @click="closeDialogHandler"></Button>
        <router-link :to="routes.PLAN_AND_BILLINGS" @click="highlightedAddon = 'order'">
          <Button label="Upgrade" class="mr-0"></Button>
        </router-link>
      </div>
    </template>
  </DialogWrapper>
</template>
