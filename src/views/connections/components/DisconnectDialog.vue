<script setup>
import { defineAsyncComponent } from 'vue'
import { useConnectionsStore } from '@/stores/connections'

/* ===== COMPONENTS ===== */
import DialogWrapper from '@/components/shared/DialogWrapper.vue'
import IconLinkOff from '@/icons/IconLinkOff.vue'
const DisconnectAndDeleteDialog = defineAsyncComponent(() => import('@/views/connections/components/DisconnectAndDeleteDialog.vue'))
const DisconnectAndKeepDialog = defineAsyncComponent(() => import('@/views/connections/components/DisconnectAndKeepDialog.vue'))

/* ===== DATA ===== */
const connectionsStore = useConnectionsStore()

/* ===== METHODS ===== */
const closeDialogHandler = () => {
  connectionsStore.isConnectionDisconnectRequested = false
}

const showDisconnectAndDeleteDialog = () => {
  connectionsStore.isDisconnectAndDeleteRequested = true
}

const showDisconnectAndKeepDialog = () => {
  connectionsStore.isDisconnectAndKeepRequested = true
}
</script>

<template>
  <DialogWrapper :isVisible="connectionsStore.isConnectionDisconnectRequested" title="Select a disconnect option" width="725px" @closeDialog="closeDialogHandler">
    <template #body>
      <section class="grid">

        <div class="col-12 md:col-12 lg:col-6">
          <div class="surface-card shadow-2 border-round text-center p-4 pt-7">
            <IconLinkOff />
            <h2 class="mb-3 mt-4">Disconnect &amp; Keep</h2>
            <p class="mt-0">Unsync without deleting the product from your destination store.</p>
            <Button class="p-button-primary block w-100 font-semibold mt-6" @click="showDisconnectAndKeepDialog">Disconnect &amp; Keep</Button>
          </div>
        </div>

        <div class="col-12 md:col-12 lg:col-6">
          <div class="surface-card shadow-2 border-round text-center p-4 pt-7">
            <i class="pi pi-trash icon-trash"></i>
            <h2 class="mb-3 mt-4">Disconnect & Delete</h2>
            <p class="mt-0">Unsync and delete the product from your destination store.</p>
            <Button class="p-button-danger block w-100 font-semibold mt-6" @click="showDisconnectAndDeleteDialog">Disconnect &amp; Delete</Button>
          </div>
        </div>

      </section>
    </template>
  </DialogWrapper>

  <DisconnectAndDeleteDialog v-if="connectionsStore.isDisconnectAndDeleteRequested" />
  <DisconnectAndKeepDialog v-if="connectionsStore.isDisconnectAndKeepRequested" />
</template>

<style scoped>
.icon-trash {
  font-size: 32px;
  height: 40px;
  transform: translateY(2px);
}
</style>
