<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  isUninstallDialogVisible,
  uninstallStore,
} = toRefs(useConnectionsStore());

const text = ref('');
const uninstall = 'uninstall';

const activityCenter = useActivityCenterStore();
const auth = useAuthStore();
const connections = useConnectionsStore();
const marketPlace = useMarketPlaceStore();
const orders = useOrdersStore();
const payouts = usePayoutsStore();
const plan = usePlanStore();
const products = useProductsStore();
const productSettings = useProductSettingsStore();
const router = useRouter();

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isUninstallDialogVisible.value = false;
};

const handleUninstall = async () => {
  await uninstallStore.value();
  logout();
};

const logout = () => {
  activityCenter.$reset();
  auth.$reset();
  connections.$reset();
  marketPlace.$reset();
  orders.$reset();
  payouts.$reset();
  plan.$reset();
  products.$reset();
  productSettings.$reset();
  sessionStorage.removeItem('ID_TOKEN_KEY');
  sessionStorage.removeItem('USER_ID');
  router.push({ name: routes.LOGIN });
};
</script>

<template>
  <DialogWrapper :isVisible="isUninstallDialogVisible" @closeDialog="closeDialogHandler" title="Confirm Uninstall">
    <template #body>
      <p class="text-lg m-0 pb-3 line-height-3">
        Are you sure you want to uninstall Syncio?
      </p>
      <p class="text-lg m-0 pb-3 line-height-3">
        You'll lose any store connections and product syncs, and will need to set these up again if you reinstall the app
      </p>
      <p class="text-lg m-0 line-height-3">
        Type "uninstall" to confirm
      </p>
      <InputText placeholder="Enter text" v-model="text" class="text-lg w-full"></InputText>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-end">
        <Button class="text-lg mr-4" @click="closeDialogHandler">Cancel</Button>
        <Button :disabled="text !== uninstall" class="text-lg" @click="handleUninstall">Uninstall</Button>
      </div>
    </template>
  </DialogWrapper>
</template>
