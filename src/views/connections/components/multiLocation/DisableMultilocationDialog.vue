<script setup>
/* ----- Data ----- */
const {
  customStoreName,
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
          <Tag v-if="customStoreName" severity="danger" style="text-transform: none !important; font-size: 1rem !important;" class="flex-inline flex-column">
            <span>{{ customStoreName }}</span>
            <span style="font-size: .9rem;" class="font-normal">{{ storeName }}</span>
          </Tag>
          <Tag v-else severity="danger" style="text-transform: none !important; font-size: 1rem !important;">
            {{ storeName }}
          </Tag>
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
