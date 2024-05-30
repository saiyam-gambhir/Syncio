<script setup>
/* ----- Data ----- */
const {
  fetchConnections,
  isDestinationStore,
  isLocationChangeRequested,
  isSourceStore,
  loadingLocationChange,
  location,
  updateLocation,
} = toRefs(useConnectionsStore());

/* ----- Methods ----- */
const closeDialogHandler = async () => {
  isLocationChangeRequested.value = false;
  location.value = null;
  await fetchConnections.value();
};

const updateLocationHandler = () => {
  updateLocation.value(location.value.params);
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
          <span class="block mt-2" v-if="isDestinationStore">You're about to change the inventory receiving location for:</span> <br>
          <div v-if="isSourceStore && location?.status !== 'pending'">
            <span class="block mt-2">You are about to change the inventory location of:</span> <br>
          </div>
          <div v-if="isSourceStore && location?.status === 'pending'">
            <span class="block mt-2">You are about to set the inventory location for:</span> <br>
          </div>
          <div class="mb-3">
            <Tag v-if="location?.storeName" severity="info" style="font-size: 1.15rem !important;" class="flex-inline flex-column">
              <span>{{ location.storeName }}</span>
              <span style="font-size: .9rem;" class="font-normal">{{ location.store }}</span>
            </Tag>
            <Tag v-else severity="info" style="text-transform: none !important; font-size: 1rem !important;">
              {{ location.store }}
            </Tag>
          </div>
          <div v-if="location?.status !== 'pending'">
            <div>
              <Strong class="inline-block" style="width: 4rem;">FROM:</Strong> <br>
            </div>
            <div>
              <Tag class="my-3" style="font-size: 1.15rem !important;" severity="info" >
                {{ location?.current?.name ?? 'Location Unassigned' }}
              </Tag> <br>
            </div>
          </div>
          <Strong class="inline-block" style="width: 4rem;">TO:</Strong> <br>
          <Tag class="mt-3 mb-2" severity="info" style="text-transform: none !important; font-size: 1.15rem !important;">{{ location?.new?.name }}</Tag>
        </p>
      </section>
    </template>

    <template #footer>
      <div class="flex justify-content-between">
        <Button label="Cancel" class="p-button-secondary ml-1" @click="closeDialogHandler"></Button>
        <Button label="Change Location" class="mr-1" @click="updateLocationHandler" :loading="loadingLocationChange"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
