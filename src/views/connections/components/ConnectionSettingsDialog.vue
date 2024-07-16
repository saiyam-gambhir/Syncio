<script setup>
/* ----- Data ----- */
const {
  clickedStore,
  isConnectionSettingsDialogRequested,
} = toRefs(useConnectionsStore());
</script>

<template>
  <Sidebar v-model:visible="isConnectionSettingsDialogRequested" position="right" class="w-sidebar">
    <template #header>
      <h1 class="text-4xl font-bold mb-0 flex align-items-center">
        {{ clickedStore.store_name ?? clickedStore.store_domain }}
      </h1>
    </template>
  </Sidebar>
</template>
