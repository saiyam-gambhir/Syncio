<script setup>
/* ----- Data ----- */
const {
  clickedStore,
  isLocationPendingDialogRequested,
} = toRefs(useConnectionsStore());

/* ----- Methods ----- */
const closeDialogHandler = async () => {
  isLocationPendingDialogRequested.value = false;
};
</script>

<template>
  <DialogWrapper
    :isVisible="isLocationPendingDialogRequested"
    title=" Store connection is pending"
    :closable="false"
    width="550px"
    @closeDialog="closeDialogHandler">
    <template #body>
      <section class="mt-1">
        <p class="m-0 text-center text-lg line-height-4">There is no location assigned to <span class="font-semi">{{ clickedStore?.store_domain }}</span>.</p>
        <p class="m-0 text-center text-lg line-height-4">To continue syncing products, please assign a location to this Source Store.</p>
      </section>
    </template>

    <template #footer>
      <div class="flex justify-content-end">
        <Button label="Assign Location" class="mr-1" @click="closeDialogHandler"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
