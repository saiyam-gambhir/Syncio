<script setup>
import { useConnectionsStore } from '@/stores/connections';
import { useToasts } from '@/composables/toasts';

/* ----- Components ----- */
import DialogWrapper from '@/components/shared/DialogWrapper.vue';

/* ----- Data ----- */
const { showToast } = useToasts();
const connectionsStore = useConnectionsStore();

/* ----- Methods ----- */
const closeDialogHandler = () => {
  connectionsStore.isDisableMultilocationRequested = false;
  connectionsStore.isMultilocationEnabled = 'On';
};

const disableMultilocationHandler = async () => {
  const message = await connectionsStore.toggleMultilocation();
  showToast({ message });
  connectionsStore.isDisableMultilocationRequested = false;
};
</script>

<template>
  <DialogWrapper :isVisible="connectionsStore.isDisableMultilocationRequested" title="Disable Multilocation?"
    width="550px" @closeDialog="closeDialogHandler">
    <template #body>
      <section class="mt-1">
        <p class="mt-0">Are you sure you want to disable multilocation for</p>
        <p class="mt-0">
          <span class="text-danger font-semibold">
            {{ connectionsStore.storeName }}
          </span>
        </p>
        <p class="mt-2 mb-1">All settings will be removed.</p>
      </section>
    </template>

    <template #footer>
      <Button icon="pi pi-times" label="Cancel" class="p-button-secondary ml-1" @click="closeDialogHandler"></Button>
      <Button icon="pi pi-check" label="Disable" class="mr-1" @click="disableMultilocationHandler"
        :loading="connectionsStore.loadingConnections"></Button>
    </template>
  </DialogWrapper>
</template>
