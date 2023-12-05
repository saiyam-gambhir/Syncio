<script setup>
/* ----- Data ----- */
const {
  storeName,
} = toRefs(useConnectionsStore());

const {
  isDuplicateSkuFound
} = toRefs(useProductsStore());

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isDuplicateSkuFound.value = false;
};
</script>

<template>
  <DialogWrapper :isVisible="isDuplicateSkuFound" title="Use Map instead of Sync" width="500px" @closeDialog="closeDialogHandler">
    <template #body>
      <p class="m-0 line-height-3 text-lg">
        Two or more products have the same SKU in <strong class="font-semibold">{{ storeName }}</strong>, so this product can't be synced accurately.
      </p>

      <p class="mt-4 mb-0 line-height-3 text-lg">Use <strong class="font-semibold">Map</strong> to choose the correct product.</p>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <Button
          @click="closeDialogHandler"
          class="p-button-secondary"
          label="Cancel">
        </Button>

        <Button
          class="mr-0"
          label="Map">
        </Button>
      </div>
    </template>
  </DialogWrapper>
</template>
