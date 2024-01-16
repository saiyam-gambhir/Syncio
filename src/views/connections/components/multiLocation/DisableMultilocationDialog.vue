<script setup>
/* ----- Data ----- */
const {
  isDisableMultilocationRequested,
  isMultilocationEnabled,
  loadingConnections,
  storeName,
  toggleMultilocation,
} = toRefs(useConnectionsStore());

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isDisableMultilocationRequested.value = false;
  isMultilocationEnabled.value = 'On';
};

const disableMultilocationHandler = async () => {
  await toggleMultilocation.value();
  isDisableMultilocationRequested.value = false;
};
</script>

<template>
  <DialogWrapper
    :isVisible="isDisableMultilocationRequested"
    title="Disable Multilocation?"
    width="550px"
    @closeDialog="closeDialogHandler">
    <template #body>
      <section class="mt-1 text-center">
        <p class="mt-0 mb-4 text-lg">Are you sure you want to disable multilocation for</p>
        <p class="mt-0">
          <Tag severity="danger" :value="storeName" style="text-transform: none !important; font-size: 1rem !important;"></Tag>
        </p>
        <p class="text-lg mt-4 mb-1">All settings will be removed.</p>
      </section>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <Button label="Cancel" class="p-button-secondary ml-1" @click="closeDialogHandler"></Button>
        <Button label="Disable" class="mr-1" @click="disableMultilocationHandler" :loading="loadingConnections"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
