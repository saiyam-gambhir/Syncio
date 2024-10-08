<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const router = useRouter();

const isBannerVisible = ref(true);

const {
  plan,
} = toRefs(usePlanStore())

const {
  currentStore,
  isShopify,
  isSourceStore,
  requiresSourceStorePlanApproval,
  showUniversalStoreControls,
} = toRefs(useConnectionsStore());

/* ----- Mounted ----- */
onMounted(() => {
  bootIntercom();

  // Check if source store plan approval is pending for Shopify?
  if(isShopify.value && isSourceStore.value && requiresSourceStorePlanApproval.value && !plan.value && plan.value?.active_addons.length === 0) {
    router.push({ name: routes.SHOPIFY_PLAN_APPROVAL });
    return;
  }

  // Check if woo destination plan selection is pending?
  // if(isWoocommerce.value && isDestinationStore.value && !plan.value && router?.currentRoute?.value?.fullPath !== routes.WOO_INSTALLATION_COMPLETED) {
  //   router.push({ name: routes.WOO_PLAN_SELECTION });
  //   return;
  // }

  if(localStorage.getItem('showUniversalStoreBanner') === 'false' ) return;
  localStorage.setItem('showUniversalStoreBanner', 'true');
});

const shouldShowUniversalStoreControls = computed(() => {
  return showUniversalStoreControls.value && localStorage?.showUniversalStoreBanner === 'true' && isBannerVisible.value;
});

/* ----- Methods ----- */
const setIntercomConfigs = (store, createdAt) => {
  const { id, email, platform, store_domain, type } = store;

  window.intercomSettings = {
    app_id: import.meta.env.VITE_INTERCOM_APP_ID,
    created_at: createdAt,
    custom_launcher_selector: '.intercom-custom-launcher',
    email: email,
    name: store_domain,
    platform: platform,
    type: type,
    user_id: id,
  };

  (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget'+import.meta.env.VITE_INTERCOM_APP_ID;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
};

const bootIntercom = () => {
  if(currentStore.value) {
    const createdAt = (new Date(currentStore.value.created_at).getTime()) / 1000;
    setIntercomConfigs(currentStore.value, createdAt);
  }
};

const hideBannerHandler = () => {
  localStorage.setItem('showUniversalStoreBanner', 'false');
  isBannerVisible.value = false;
};
</script>

<template>
  <main class="main">
    <Toast position="top-right" successIcon="pi pi-check-circle" />

    <Alert v-if="shouldShowUniversalStoreControls">
      <div class="flex align-items-center justify-content-center relative">
        <p class="my-0 text-lg line-height-3">
          You can now be both a Source and Destination Store (Universal Store)! 🚀 <br>
          See more details about <a href="https://help.syncio.co/en/articles/9774644-universal-store" target="_blank" class='btn-link dark font-semibold text-lg'>Universal Store beta here</a>, and send any questions or feedback using the <a href='javascript:void(0);' class='intercom-custom-launcher btn-link dark text-lg'>chat button</a>
        </p>
        <Button @click="hideBannerHandler" icon="pi pi-times" rounded text aria-label="Cancel" class="absolute" style="right: .6rem;" />
      </div>
    </Alert>

    <div class="min-h-screen flex relative lg:static">
      <Navbar />

      <div class="min-h-screen flex flex-column relative flex-auto">
        <Header></Header>

        <div class="flex flex-auto flex-column router-view mx-auto">
          <div class="flex-auto surface-section p-5 pt-4">
            <router-view v-slot="{ Component }">
              <component :is="Component" />
            </router-view>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
