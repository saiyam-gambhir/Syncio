<script setup>
import { toRaw } from 'vue';
import { useConnections } from '../../composables/connections';
import { useConnectionsStore } from '@/stores/connections';

/* ----- Components ----- */
import DialogWrapper from '@/components/shared/DialogWrapper.vue';

/* ----- Data ----- */
const connections = useConnections();
const connectionsStore = useConnectionsStore();

/* ----- Methods ----- */
const closeDialogHandler = () => {
  connectionsStore.isLocationChangeRequested = false;
  connectionsStore.selectedLocation = null;
  connectionsStore.selectedLocation = structuredClone(toRaw(connectionsStore.currentLocation));
};
</script>

<template>
  <DialogWrapper :isVisible="connectionsStore.isLocationChangeRequested" title="Confirm inventory location change"
    width="475px" @closeDialog="closeDialogHandler">
    <template #body>
      <section>
        <p class="mt-0">You're about to change the inventory receiving location for <br> <strong>{{
          connectionsStore.selectedConnection.store_domain
        }}</strong></p>
        <p><strong>From:</strong> {{ connectionsStore.currentLocation.name }}</p>
        <p class="mb-0"><strong>To:</strong> {{ connectionsStore.selectedLocation.name }}</p>
      </section>
    </template>

    <template #footer>
      <Button label="Cancel" class="p-button-secondary ml-1" @click="closeDialogHandler"></Button>
      <Button label="Confirm" class="mr-0" :loading="connectionsStore.loadingLocationChange"
        @click="connections.locationChangeHandler"></Button>
    </template>
  </DialogWrapper>

  <DialogWrapper :isVisible="connectionsStore.isLocationChangeConfirmationVisible" title="Location Changed" width="475px"
    @closeDialog="connectionsStore.isLocationChangeConfirmationVisible = false">
    <template #body>
      <section class="text-center">
        <p class="mt-0">
          <strong>{{ connectionsStore.selectedConnection.store_domain }}'s</strong> products will be resynced
          to reflect the new location's inventory quantity.
        </p>
        <p>This may take up to 24 hours.</p>
        <p class="mb-0">An e-mail will be sent to you once the resync is completed.</p>
      </section>
    </template>

    <template #footer>
      <Button label="OK" class="mr-0" @click="connectionsStore.isLocationChangeConfirmationVisible = false"></Button>
    </template>
  </DialogWrapper>
</template>
