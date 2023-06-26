<script setup>
import { toRaw } from 'vue';
import { useConnections } from '../../composables/connections';
import { useConnectionsStore } from '@/stores/connections';

/* ----- Components ----- */
import AppLink from '@/components/shared/AppLink.vue';
import DialogWrapper from '@/components/shared/DialogWrapper.vue';

/* ----- Data ----- */
const connections = useConnections();
const connectionsStore = useConnectionsStore();

/* ----- Methods ----- */
const closeDialogHandler = () => {
  connectionsStore.isLocationChangeRequested = false;
  connectionsStore.selectedLocation = null;
  connectionsStore.selectedLocation = structuredClone(toRaw(connectionsStore.currentLocation));
  /* Todo: Do not set current location to null here infact on location change set the currentvalue to the new location changed value */
};
</script>

<template>
  <DialogWrapper :isVisible="connectionsStore.isLocationChangeRequested"
    title="Are you sure you want to change locations?" width="550px" @closeDialog="closeDialogHandler">
    <template #body>
      <section class="mt-1">
        <p class="mt-0">You cannot undo this action.</p>
        <p class="mt-0">
          We recommend you to back up your inventory quantity before proceeding.
        </p>
        <p class="mt-1">
          <AppLink link="https://help.syncio.co/en/articles/5791417-multi-locations-destination-store"
            label="Check out our guide" />
        </p>
      </section>
    </template>

    <template #footer>
      <Button label="Cancel" class="p-button-secondary ml-1" @click="closeDialogHandler"></Button>
      <Button label="Change Location" class="mr-0" @click="connections.locationChangeHandler"></Button>
    </template>
  </DialogWrapper>
</template>
