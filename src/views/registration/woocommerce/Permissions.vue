<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  registerWooStore,
  user,
} = toRefs(useAuthStore());

const {
  currentStore,
} = toRefs(useConnectionsStore());

const arePermissionsApproved = ref(false);
const storeType = ref('');
const storeUrl = ref('');
const router = useRouter();

/* ----- Mounted ----- */
onMounted(() => {
  const url = new URL(window.location);
  let searchParams = url.searchParams;
  arePermissionsApproved.value = searchParams.get('success') === '1';
  storeUrl.value = searchParams.get('store');

  if(url.searchParams.get('type')) storeType.value = url.searchParams.get('type');
  else if(currentStore.value && currentStore.value.type) storeType.value = currentStore.value.type;
  else if(window.sessionStorage.getItem('woo-store-type')) storeType.value = window.sessionStorage.getItem('woo-store-type');
});

/* ----- Watch ----- */
watch(storeType, (newVal, oldVal) => {
  if(storeType.value === 'source' && arePermissionsApproved.value) {
    router.push({ name: routes.WOO_INSTALLATION_COMPLETED });
  }
});

/* ----- Methods ----- */
const registerStore = async () => {
  let withoutHttps;
  withoutHttps = storeUrl.value.replace(/^http(s)*:\/\//, '');
  withoutHttps = withoutHttps.replace(/\/$/, '');
  const params = {
    platform_api_version: 'v3',
    platform: 'woocommerce',
    type: storeType.value,
    url: withoutHttps,
    user_id: user.value.id,
  };

  try {
    const response = await registerWooStore.value(params);
    let redirectUrl = response?.redirect_url;
    redirectUrl += import.meta.env.VITE_WOO_REDIRECT_URL + '?store=' + withoutHttps + '&type=' + storeType.value;
    window.location.href = redirectUrl;
  } catch (error) {
  }
};

const navigateToWooPlanSelction = () => {
  router.push({ name: routes.WOO_PLAN_SELECTION });
};
</script>

<template>
  <section class="mx-auto" style="width: 700px; max-width: 100%;">
    <PageDetails v-if="arePermissionsApproved && storeType === 'destination'" title="Syncio installed successfully" content="Select your Syncio plan to activate your free 14 day trial" />

    <aside class="auth-wrapper text-left md:text-center text-900">
      <div v-if="arePermissionsApproved && storeType === 'destination'">
        <ul class="text-900 pl-0 list-none text-xl font-semi m-0">
          <li class="flex">
            <i class="pi pi-check-circle text-2xl text-green-700 font-bold mr-3" style="transform: translateY(-.5px);"></i>
            One click copy and sync products with Woo and Shopify stores
          </li>
          <li class="flex mt-4">
            <i class="pi pi-check-circle text-2xl text-green-700 font-bold mr-3" style="transform: translateY(-.5px);"></i>
            Real time auto-stock syncing between platforms
          </li>
          <li class="flex mt-4">
            <i class="pi pi-check-circle text-2xl text-green-700 font-bold mr-3" style="transform: translateY(-.5px);"></i>
            Connect to unlimited stores
          </li>
        </ul>

        <Button
          @click="navigateToWooPlanSelction"
          label="Pick a plan and activate my free trial"
          class="w-100 p-button-lg mt-6">
        </Button>
      </div>
      <div v-else-if="!arePermissionsApproved">
        <h2 class="m-0">You've denied Syncio access to connect to your store</h2>
        <p class="m-0 mt-5 text-lg font-semi line-height-3">In order to send and receive stock and updates between the stores you've connected to, Syncio requires Read & Write permissions for an API Key and Webhooks.</p>
        <p class="m-0 mt-3 text-lg font-semi line-height-3">Syncio will only use these permissions to perform essential product and order updates.</p>
        <h2 class="m-0 mt-5">Would you like to grant permissions to Syncio now?</h2>
        <Button @click="registerStore" label="Continue to permissions approval" class="w-100 p-button-lg mt-5"></Button>
      </div>
    </aside>

    <div v-if="!arePermissionsApproved && storeType !== 'destination'" class="mt-5 text-center">
      <router-link :to="routes.WOO_CONTINUE_LATER">
        <Button label="Signout, continue later" class="font-bold justify-content-center"></Button>
      </router-link>
    </div>
  </section>
</template>
