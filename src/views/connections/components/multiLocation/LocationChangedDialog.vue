<script setup>
/* ----- Data ----- */
const {
  location,
  isLocationChanged,
  fetchConnections,
} = toRefs(useConnectionsStore());

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isLocationChanged.value = false;
  location.value = null;
};

const okHandler = async () => {
  isLocationChanged.value = false;
  await fetchConnections.value();
}
</script>

<template>
  <DialogWrapper
    :isVisible="isLocationChanged"
    title="Location Changed"
    width="550px"
    @closeDialog="closeDialogHandler">
    <template #body>
      <section class="mt-1 text-lg text-center">
        <div class="pb-4">
          <i class="pi pi-check-circle text-6xl" style="color: #1ea97c;"></i>
        </div>
        <p class="mt-0 px-2 line-height-3"><Strong>{{ location.store }}'s</Strong> products will be resynced to reflect the new location's inventory quantity.</p>
        <p>This may take up to 24 hours.</p>
        <p class="mb-0">An e-mail will be sent to you once the resync is completed.</p>
      </section>
    </template>

    <template #footer>
      <div class="flex justify-content-end">
        <Button label="Ok" class="mr-1" @click="okHandler"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
