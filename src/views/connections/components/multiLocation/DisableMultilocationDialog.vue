<script setup>
import { useConnectionsStore } from '@/stores/connections'
import DialogWrapper from '@/components/shared/DialogWrapper.vue'

/* ===== DATA ===== */
const connectionsStore = useConnectionsStore()

/* ===== METHODS ===== */
const closeDialogHandler = () => {
  connectionsStore.isDisableMultilocationRequested = false
  connectionsStore.isMultilocationEnabled =  'On'
}
</script>

<template>
  <DialogWrapper :isVisible="connectionsStore.isDisableMultilocationRequested" title="Disable Multilocation?" width="550px" @closeDialog="closeDialogHandler">
    <template #body>
      <section class="mt-1 px-3 text-center">
        <p class="mt-0">Are you sure you want to disable multilocation for</p>
        <p class="mt-0">
          <span class="text-danger font-semibold">
            {{ connectionsStore.storeName }}
          </span>
        </p>
        <p class="mt-2">All settings will be removed.</p>
        <div class="flex justify-content-center mt-6 w-full">
          <Button label="Disable" class="mr-2"></Button>
          <Button label="Cancel" class="p-button-secondary" @click="closeDialogHandler"></Button>
        </div>
      </section>
    </template>
  </DialogWrapper>
</template>
