<script setup>
import { useConnectionsStore } from '@/stores/connections';

/* ----- Components ----- */
const DisconnectAndDeleteDialog = defineAsyncComponent(() => import('./DisconnectAndDeleteDialog.vue'));
const DisconnectAndKeepDialog = defineAsyncComponent(() => import('./DisconnectAndKeepDialog.vue'));
import DialogWrapper from '@/components/shared/DialogWrapper.vue';
import IconLinkOff from '@/icons/IconLinkOff.vue';

/* ----- Data ----- */
const {
  isConnectionDisconnectRequested,
  isDisconnectAndDeleteRequested,
  isDisconnectAndKeepRequested,
} = toRefs(useConnectionsStore());

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isConnectionDisconnectRequested.value = false;
};

const showDisconnectAndDeleteDialog = () => {
  isDisconnectAndDeleteRequested.value = true;
};

const showDisconnectAndKeepDialog = () => {
  isDisconnectAndKeepRequested.value = true;
};
</script>

<template>
  <DialogWrapper
    :isVisible="isConnectionDisconnectRequested"
    :showFooter="false"
    @closeDialog="closeDialogHandler"
    title="Select a disconnect option"
    width="725px">
    <template #body>
      <section class="grid">
        <div class="col-12 md:col-12 lg:col-6">
          <div class="surface-0 shadow-2 border-round text-center p-4 pt-7">
            <IconLinkOff />
            <h2 class="mb-3 mt-4">Disconnect and Keep</h2>
            <p class="mt-0">Unsync without deleting the product from your destination store.</p>
            <Button class="p-button-lg block w-100 font-semibold mt-6" @click="showDisconnectAndKeepDialog">Disconnect and Keep</Button>
          </div>
        </div>

        <div class="col-12 md:col-12 lg:col-6">
          <div class="surface-0 shadow-2 border-round text-center p-4 pt-7">
            <i class="pi pi-trash icon-trash"></i>
            <h2 class="mb-3 mt-4">Disconnect and Delete</h2>
            <p class="mt-0">Unsync and delete the product from your destination store.</p>
            <Button severity="danger" class="p-button-lg block w-100 font-semibold mt-6" @click="showDisconnectAndDeleteDialog">Disconnect and Delete</Button>
          </div>
        </div>
      </section>
    </template>
  </DialogWrapper>

  <DisconnectAndDeleteDialog v-if="isDisconnectAndDeleteRequested" />
  <DisconnectAndKeepDialog v-if="isDisconnectAndKeepRequested" />
</template>

<style scoped>
.icon-trash {
  font-size: 32px;
  height: 40px;
  transform: translateY(2px);
}
</style>
