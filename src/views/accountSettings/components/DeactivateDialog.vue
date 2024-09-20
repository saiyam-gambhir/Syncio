<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  DELETE_STORE,
  fetchCurrentStore,
  isDeactivateStoreDialogVisible,
  isStoreDeactivated,
  storeType,
} = toRefs(useConnectionsStore());

const router = useRouter();

const loading = ref(false);

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isDeactivateStoreDialogVisible.value = false;
};

const deleteStoreHandler = async () => {
  try {
    loading.value = true;
    await DELETE_STORE.value();
    isStoreDeactivated.value = true;
    loading.value = false;
    await fetchCurrentStore.value();
  } catch(error) {
    loading.value = false;
  }
};

const loadCurrentStoreHandler = async () => {
  loading.value = true;
  setTimeout(() => {
    isStoreDeactivated.value = isDeactivateStoreDialogVisible.value = loading.value = false;
  }, 1000);
};
</script>

<template>
  <DialogWrapper :class="{ 'without-title' : isStoreDeactivated }" :isVisible="isDeactivateStoreDialogVisible" :withoutTitle="isStoreDeactivated" @closeDialog="closeDialogHandler" title="Confirm deactivation" width="525px">
    <template #body>
      <div v-if="isStoreDeactivated" class="text-center mt-2">
        <i class="pi pi-check-circle text-7xl text-green-500"></i>
        <h3 class="mt-4 mb-0">Store is being deactivated</h3>
        <p class="text-lg mt-4 mb-0 line-height-3">
          This may take several minutes.
        </p>
        <p class="text-lg mt-4 mb-0 line-height-3">
          You will no longer be billed for this store type.
        </p>
        <p class="text-lg mt-4 mb-0 line-height-3">
          Once the deactivation is complete, you can enable this store <br> type again at any time via <span class="capitalize font-semibold">Enable {{ storeType }}</span>.
        </p>
        <p class="text-lg my-4 line-height-3">You'll now be taken into your remaining store in Syncio.</p>
      </div>
      <div v-else>
        <p class="text-lg m-0 line-height-3">
          Deactivating will remove this store type from your account. You'll still keep your remaining store type.
        </p>
        <ul class="m-0 ml-3 p-0 py-5 text-lg">
          <li>Product, inventory and order sync with connected stores will be ended</li>
          <li class="mt-3">No changes will be made to products in your store</li>
        </ul>
        <p class="text-lg m-0 line-height-3">
          Make sure you inform any connected stores, so they can prepare for the sync disconnection.
        </p>
      </div>
    </template>

    <template #footer>
      <div v-if="isStoreDeactivated" class="flex align-items-center justify-content-end">
        <Button class="mr-0" label="Next" :loading="loading" @click="loadCurrentStoreHandler"></Button>
      </div>
      <div v-else class="flex align-items-center justify-content-between">
        <Button class="p-button-secondary" @click="closeDialogHandler" label="Cancel"></Button>
        <Button :loading="loading" class="p-button-danger mr-0" label="Deactivate" @click="deleteStoreHandler"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
