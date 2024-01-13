<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  productsSynced,
  productsSyncedLimit,
  shouldShowProductSyncLimitDialog,
} = toRefs(usePlanStore());

/* ----- Props ----- */
const props = defineProps({
  selectedProducts: {
    required: true,
    type: String,
  }
});

/* ----- Methods ----- */
const closeDialogHandler = () => {
  shouldShowProductSyncLimitDialog.value = false;
};
</script>

<template>
  <DialogWrapper :isVisible="shouldShowProductSyncLimitDialog" title="Selection exceeds your plan limit" width="550px" @closeDialog="closeDialogHandler">
    <template #body>
      <p class="text-xl m-0 pb-3 line-height-3">
        Your are trying to sync <span class="font-bold">{{ selectedProducts }}</span> {{ selectedProducts > 1 ? 'products' : 'product' }}. You can sync <span class="font-bold">{{ productsSyncedLimit - productsSynced }}</span> more products within your plan limit.
      </p>
      <p class="text-lg mb-0 line-height-3">
        Upgrade your syncio plan to sync above your current plan's limit or, Unsync some products to free up your plan limit.
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
