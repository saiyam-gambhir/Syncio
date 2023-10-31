<script setup>
import { useProductSettingsStore } from 'productSettings';

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
  <DialogWrapper :isVisible="isMetaFieldsRequested" title="Turn on Metafields: Product and Variant?" width="500px" :closable="false">
    <template #body>
      <p class="text-xl m-0 pb-3 line-height-3">
        Turning this setting on will only sync new metafield data to the your store and won't overwrite any existing metafields.
      </p>
      <p class="text-xl m-0 pb-3 line-height-3">
        This is an advanced Shopify feature, and is best suited for stores requiring a perfect metafield match between source and destination.
      </p>
      <p class="text-xl m-0 line-height-3">
        If you are unsure we recommend reading <AppLink label="Metafields help" link="https://help.syncio.co/en/articles/8418976-metafields-sync" class="text-xl" /> before proceeding.
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
