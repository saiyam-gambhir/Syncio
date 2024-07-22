<script setup>
/* ----- Data ----- */
const {
  isMetaFieldsRequested,
} = toRefs(useProductSettingsStore());

/* ----- Methods ----- */
const hideMetaFieldsDialog = () => {
  isMetaFieldsRequested.value = false;
};

const cancelHandler = () => {
  const metaFieldSwitch = document.querySelector('.metafields-switch');
  metaFieldSwitch.click();
  hideMetaFieldsDialog();
};
</script>

<template>
  <DialogWrapper :isVisible="isMetaFieldsRequested" title="Turn on Metafields: Product and Variant?" width="575px" :closable="false">
    <template #body>
      <ul class="p-0 pl-3 m-0 mt-1 text-xl">
        <li>Unique metafields on this store will not be updated/ overwritten.</li>
        <li class="mt-1">Syncs new metafield definitions and values from the source store. </li>
        <li class="mt-1">Links matching metafields and update values.</li>
      </ul>
      <p class="text-xl m-0 mt-4 pb-3 line-height-3">
        This is an advanced Shopify feature, and will bulk sync new metafield definitions to your store.
      </p>
      <p class="text-xl m-0 line-height-3">
        If you are unsure we recommend reading <AppLink label="Metafields help" link="https://help.syncio.co/en/articles/8418976-metafields-sync" class="text-xl" />
        <br>
        before proceeding.
      </p>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <Button label="Cancel" class="p-button-secondary"  @click="cancelHandler"></Button>
        <Button label="Turn on" class="mr-0" @click="hideMetaFieldsDialog"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
