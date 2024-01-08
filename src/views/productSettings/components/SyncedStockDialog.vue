<script setup>

/* ----- Data ----- */
const {
  isSyncedStockDialogVisible,
} = toRefs(useProductSettingsStore());

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isSyncedStockDialogVisible.value = false;
};
</script>
<template>
  <DialogWrapper :isVisible="isSyncedStockDialogVisible" @closeDialog="closeDialogHandler"
    title="Synced Stock Buffer triggers a full re-sync" :showFooter="false">
    <template #body>
      <div class="mb-4">
        <p class="text-lg m-0 pb-3 line-height-3">
          Saving any changes to this setting will trigger a full re-sync of synced products.
        </p>
        <p class="text-lg m-0 pb-3 line-height-3">
          This can take some time to apply and you won't be able to make additional changes to this setting until
          the
          re-sync is complete.
        </p>
        <p class="text-lg m-0 line-height-3">
          We recommend saving changes during less busy sales times.
        </p>
      </div>
      <div class="flex justify-content-end">
        <AppLink class="text-lg mt-3 mr-4" label="Learn More"
          link="https://help.syncio.co/en/articles/8462424-synced-stock-buffer" />
        <Button class="text-lg" @click="closeDialogHandler">I understand</Button>
      </div>
    </template>
  </DialogWrapper>
</template>