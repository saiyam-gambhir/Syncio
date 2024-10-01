<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  isUninstallDialogVisible,
  uninstallStore,
} = toRefs(useConnectionsStore());

const text = ref('');
const uninstall = 'uninstall';
const router = useRouter();

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isUninstallDialogVisible.value = false;
};

const handleUninstall = async () => {
  await uninstallStore.value();
  logout();
};

const logout = async () => {
  sessionStorage.clear();
  await router.push({ name: routes.LOGIN });
};
</script>

<template>
  <DialogWrapper :isVisible="isUninstallDialogVisible" @closeDialog="closeDialogHandler" title="Confirm Uninstall" width="500px">
    <template #body>
      <p class="text-lg m-0 pb-4 line-height-3">
        Are you sure you want to uninstall Syncio?
      </p>
      <p class="text-lg m-0 pb-4 line-height-3">
        You'll lose any store connections and product syncs, <br> and will need to set these up again if you reinstall the app.
      </p>
      <p class="text-lg m-0 pb-2 line-height-3">
        Type <span class="font-semibold">"uninstall"</span> to confirm
      </p>
      <InputText placeholder="Enter text" v-model="text" class="text-lg w-full"></InputText>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <Button class="p-button-secondary" @click="closeDialogHandler" label="Cancel"></Button>
        <Button :disabled="text !== uninstall" class="p-button-danger mr-0" @click="handleUninstall" label="Uninstall"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
