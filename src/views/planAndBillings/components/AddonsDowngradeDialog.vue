<script setup>
import { toRefs } from 'vue';
import { useAuthStore } from '@/stores/auth';

/* ----- Components ----- */
import AppLink from '@/components/shared/AppLink.vue';
import DialogWrapper from '@/components/shared/DialogWrapper.vue';

/* ----- Data ----- */
const { shouldShowAddonsDowngradeDialog } = toRefs(useAuthStore());

/* ----- Methods ----- */
const closeDialogHandler = () => {
  shouldShowAddonsDowngradeDialog.value = false;
};
</script>

<template>
  <DialogWrapper :isVisible="shouldShowAddonsDowngradeDialog" title="Are you sure you want to downgrade?" width="600px" @closeDialog="closeDialogHandler">
    <template #body>
      <div>
        <p class="text-xl line-height-3 m-0">You're downgrading part(s) of your plan. Please check to ensure that you don't exceed the limits of the new plan.</p>
        <AppLink label="Learn about our plans" link="https://www.syncio.co/pricing" class="mt-4 mb-3 text-xl" />
        <h3 class="font-semibold text-xl mt-3">Downgrading your add-ons may have the following impacts:</h3>
        <ul class="p-0 text-xl m-0 pt-1 py-3">
          <li class="flex mt-2">
            <span class="border-circle surface-card border-1 text-center mr-3" style="width: 40px; height: 40px; flex: none;">
              <i class="pi pi pi-file text-3xl mt-2"></i>
            </span>
            <p class="line-height-3 m-0">
              <strong>Orders:</strong> Any orders that have already been pushed this month won't be impacted but will be counted towards your usage. If you've exceeded the limit of the new selection, you won't be able to push any more orders.
            </p>
          </li>
          <li class="flex mt-4">
            <span class="border-circle surface-card border-1 text-center mr-3" style="width: 40px; height: 40px; flex: none;">
              <i class="pi pi-dollar text-3xl mt-2"></i>
            </span>
            <p class="line-height-3 m-0">
              <strong>Payouts:</strong> Any payouts that have already been created this month won't be impacted but will be counted towards your usage. If you've exceeded the limit of the new selection, you won't be able to create any more payouts.
            </p>
          </li>
          <li class="flex mt-4">
            <span class="border-circle surface-card border-1 text-center mr-3" style="width: 40px; height: 40px; flex: none;">
              <i class="pi pi-cog text-3xl mt-2"></i>
            </span>
            <p class="line-height-3 m-0 pr-2">
              <strong>Product settings:</strong> All settings except Auto delete variant will be turned off. If Auto delete variant is currently turned off, it will remain off.
            </p>
          </li>
        </ul>
      </div>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <Button label="Continue" outlined raised></Button>
        <Button label="I changed my mind" @click="closeDialogHandler" class="mr-0"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
