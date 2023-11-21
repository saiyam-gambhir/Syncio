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
      <section class="mt-1">
        <p class="mt-0">Are you sure you want to disable multilocation for</p>
        <p class="mt-0">
          <span class="text-danger font-semibold">
            {{ storeName }}
          </span>
        </p>
        <p class="mt-2 mb-1">All settings will be removed.</p>
      </section>
    </template>

    <template #footer>
      <Button label="Cancel" class="p-button-secondary ml-1" @click="closeDialogHandler"></Button>
      <Button label="Disable" class="mr-1" @click="disableMultilocationHandler" :loading="loadingConnections"></Button>
    </template>
  </DialogWrapper>
</template>
