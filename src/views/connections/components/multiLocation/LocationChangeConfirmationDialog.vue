<script setup>
/* ----- Data ----- */
const {
  isLocationChangeRequested,
  location,
  fetchDestinationLocations,
} = toRefs(useConnectionsStore());

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isLocationChangeRequested.value = false;
  location.value = null;

  fetchDestinationLocations.value();
};
</script>

<template>
  <DialogWrapper
    :isVisible="isLocationChangeRequested"
    title="Confirm location change?"
    width="550px"
    @closeDialog="closeDialogHandler">
    <template #body>
      <section class="mt-1" v-if="location">
        <p class="m-0 text-center text-lg">
          <span class="block mt-2">You're about to change the inventory receiving location for:</span> <br>
          <Tag class="mb-3" severity="info" style="font-size: 1.15rem !important;">{{ location.store }}</Tag> <br>
          <Strong class="inline-block" style="width: 4rem;">FROM:</Strong> <br>
          <Tag class="my-3" style="font-size: 1.15rem !important;" severity="info">{{ location?.current.name }}</Tag> <br>
          <Strong class="inline-block" style="width: 4rem;">TO:</Strong> <br>
          <Tag class="mt-3 mb-2" severity="info" style="font-size: 1.15rem !important;">{{ location?.new.name }}</Tag></p>
      </section>
    </template>

    <template #footer>
      <div class="flex justify-content-between">
        <Button label="Cancel" class="p-button-secondary ml-1" @click="closeDialogHandler"></Button>
        <Button label="Change Location" class="mr-1" @click=""></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
