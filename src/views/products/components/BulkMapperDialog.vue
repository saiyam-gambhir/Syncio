<script setup>
/* ----- Data ----- */
const {
  isBulkMapperDialogRequested,
  loadingBulkMapper,
  selectedStore,
  startBulkMapper,
} = toRefs(useProductsStore());

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isBulkMapperDialogRequested.value = false;
};

const startBulkMapperHandler = async () => {
  await startBulkMapper.value();
};
</script>

<template>
  <DialogWrapper :isVisible="isBulkMapperDialogRequested" title="Bulk Mapper" width="550px" @closeDialog="closeDialogHandler">
    <template #body>
      <p class="m-0 line-height-3">
        Once you click the start button, Syncio will scan through this source store's products and try to find the products that is matched from your store.
      </p>

      <div class="py-6 text-center">
        <Tag v-if="selectedStore?.store_name" severity="info" :pt="{root: { style: { fontSize: '1.1rem !important' } }}" class="flex-inline flex-column">
          <span>{{ selectedStore.store_name }}</span>
          <span style="font-size: .9rem;" class="mt-1 font-normal">{{ selectedStore.store_domain }}</span>
        </Tag>

        <Tag v-else severity="info" :pt="{root: { style: { fontSize: '1.1rem !important' } }}">
          {{ selectedStore.store_domain }}
        </Tag>
      </div>

      <h3 class="m-0">How to use bulk mapper:</h3>
      <ul class="line-height-4 pl-3 mt-3 mb-0">
        <li>Ensure that each SKU is unique per variant.</li>
        <li class="mt-1">Ensure that the SKUs match between the Source and Destination stores.</li>
        <li class="mt-1">When you click "Start", Syncio will search the two stores for SKU matches across the products that are not duplicate SKUs to map. Once mapped, the product status will update to "Synced" in the Sync Products page.</li>
      </ul>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <Button
          @click="closeDialogHandler"
          class="p-button-secondary"
          label="Cancel">
        </Button>

        <Button
          :loading="loadingBulkMapper"
          @click="startBulkMapperHandler"
          class="mr-0"
          label="Start bulk mapper">
        </Button>
      </div>
    </template>
  </DialogWrapper>
</template>
