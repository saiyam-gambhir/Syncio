<script setup>
/* ----- Data ----- */
const {
  generateCharge,
  loadingPayment,
  shouldShowAddonsDowngradeDialog,
} = toRefs(usePlanStore());

/* ----- Methods ----- */
const closeDialogHandler = () => {
  shouldShowAddonsDowngradeDialog.value = false;
};
</script>

<template>
  <DialogWrapper :isVisible="shouldShowAddonsDowngradeDialog" title="Are you sure you want to downgrade?" width="550px" @closeDialog="closeDialogHandler">
    <template #body>
      <div>
        <p class="text-xl line-height-3 m-0">You're downgrading part(s) of your plan. Please check to ensure that you don't exceed the limits of the new plan.</p>
        <AppLink label="Learn about our plans" link="https://www.syncio.co/pricing" class="mt-3 mb-5 text-xl" />
        <h3 class="font-semibold text-xl mt-3">Downgrading your add-ons may have the following impacts:</h3>
        <ul class="p-0 text-xl m-0 pt-1 py-3">
          <li class="flex mt-2">
            <i class="pi pi-file text-4xl mr-4 mt-1"></i>
            <p class="line-height-3 m-0">
              <strong>Orders:</strong> Any orders that have already been pushed this month won't be impacted but will be counted towards your usage. If you've exceeded the limit of the new selection, you won't be able to push any more orders.
            </p>
          </li>
          <li class="flex mt-5">
            <i class="pi pi-dollar text-4xl mr-4 mt-1"></i>
            <p class="line-height-3 m-0">
              <strong>Payouts:</strong> Any payouts that have already been created this month won't be impacted but will be counted towards your usage. If you've exceeded the limit of the new selection, you won't be able to create any more payouts.
            </p>
          </li>
          <li class="flex mt-5">
            <i class="pi pi-cog text-4xl mr-4 mt-1"></i>
            <p class="line-height-3 m-0 pr-2">
              <strong>Product settings:</strong> All settings except Auto delete variant will be turned off. If Auto delete variant is currently turned off, it will remain off.
            </p>
          </li>
        </ul>
      </div>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <Button label="Continue" outlined :loading="loadingPayment" @click="generateCharge"></Button>
        <Button label="I changed my mind" @click="closeDialogHandler" class="mr-0"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
