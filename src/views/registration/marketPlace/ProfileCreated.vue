<script setup>
import * as routes from '@/routes';
import router from '@/router';

/* ----- Data ----- */
const loading = ref(false);

/* ----- Methods ----- */
const nextStepHandler = async () => {
  loading.value = true;
  await router.push({ name: routes.SHOPIFY_PLAN_APPROVAL });
  loading.value = false;
};
</script>

<template>
  <section class="mx-auto" style="width: 650px; max-width: 100%;">
    <aside class="auth-wrapper text-900 text-center">
      <i class="pi pi-check-circle text-7xl pb-4" style="color: #1ea97c;"></i>
      <h3 class="text-900 text-4xl mb-4">Awesome work</h3>
      <p class="text-xl line-height-3 mb-4">Your profile set up is complete.</p>
      <p class="text-xl line-height-3 mb-2">Check out Marketplace in the app to browse and connect <br> with quality partner stores </p>

      <Divider />

      <div class="text-right">
        <Button
          :loading="loading"
          @click="nextStepHandler"
          class="mt-2 font-bold justify-content-center p-button-lg"
          label="Finish Installation">
        </Button>
      </div>
    </aside>
  </section>
</template>
