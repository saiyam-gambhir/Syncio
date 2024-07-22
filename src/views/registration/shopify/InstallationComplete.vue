<script setup>
import * as routes from '@/routes';
import router from '@/router';

/* ----- Data ----- */
const loading = ref(false);
const loadingToDashboard = ref(false);

const {
  isDestinationStore,
} = toRefs(useConnectionsStore());

const {
  activateCharge,
  isOnboarding,
} = toRefs(usePlanStore());

const route = useRoute();

/* ----- OnMounted ----- */
onMounted(async () => {
  if (isDestinationStore.value) {
    loading.value = true;
    const params = route.query;
    // Check if params is empty
    if (JSON.stringify(params) !== '{}') {
      const response = await activateCharge.value(params);
      if (response.success) {
        if (!Boolean(params.isonboard)) {
          await router.push({ name: routes.PLAN_AND_BILLINGS });
        }
      } else {
        await router.push({ name: routes.SHOPIFY_SELECT_PLAN });
      }
    }
    loading.value = false;
    isOnboarding.value = false;
  }
});

/* ----- Methods ----- */
</script>

<template>
  <Loading v-if="loading" />
  <section v-else class="mx-auto" style="width: 1000px; max-width: 100%;">
    <PageDetails title="Installation Complete!" content="Here are a few guides to help you Sync your first product!" />

    <aside class="auth-wrapper text-900 text-center">

      <div class="grid mb-4">
        <div class="md:col-4 col-12 mb-2">
          <a href="https://www.notion.so/syncio/Syncing-your-first-product-3b831d7cc38640ffb82393dbdcfaa662" target="_blank" class="block text-900">
            <CardWrapper>
              <template #content>
                <div class="flex align-items-center justify-content-between">
                  <h3 class="text-xl m-0">Guide to Syncing</h3>
                  <i class="pi pi-external-link"></i>
                </div>
                <p class="text-left mb-0 mt-4">Read our step by step guide to sync your first product!</p>
              </template>
            </CardWrapper>
          </a>
        </div>

        <div class="md:col-4 col-12 mb-2">
          <a href="https://www.notion.so/syncio/Tips-for-a-healthy-sync-8afc765c9b3f476c93f02422ebc59511" target="_blank" class="block text-900">
            <CardWrapper>
              <template #content>
                <div class="flex align-items-center justify-content-between">
                  <h3 class="text-xl m-0">Best Practices</h3>
                  <i class="pi pi-external-link"></i>
                </div>
                <p class="text-left mb-0 mt-4">Six steps to ensure your inventory syncs properly.</p>
              </template>
            </CardWrapper>
          </a>
        </div>

        <div class="md:col-4 col-12">
          <a href="https://www.notion.so/syncio/Use-Cases-8eb098b60bae4aa083e2d04d8c936476" target="_blank" class="block text-900">
            <CardWrapper>
              <template #content>
                <div class="flex align-items-center justify-content-between">
                  <h3 class="text-xl m-0">Use Cases</h3>
                  <i class="pi pi-external-link"></i>
                </div>
                <p class="text-left mb-0 mt-4">See how other companies use <br> Syncio!</p>
              </template>
            </CardWrapper>
          </a>
        </div>
      </div>

      <Divider />

      <router-link :to="routes.DASHBOARD" @click="loadingToDashboard = true;">
        <Button
          :loading="loadingToDashboard"
          class="mt-4 font-bold justify-content-center p-button-lg w-50"
          icon="pi pi-arrow-right"
          iconPos="right"
          label="Continue to dashboard">
        </Button>
      </router-link>
    </aside>
  </section>
</template>
