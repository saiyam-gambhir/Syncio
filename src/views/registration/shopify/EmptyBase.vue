<script setup>
import { useRoute, useRouter } from 'vue-router';
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  shopifyLogin,
} = toRefs(useAuthStore());

const route = useRoute();
const router = useRouter();

/* ----- Mounted ----- */
onMounted(() => {
  shopifyLoginHandler();
});

/* ----- Methods ----- */
const shopifyLoginHandler = async () => {
  const storeName = route.query?.shop;
  const response = await shopifyLogin.value('shopify', storeName);
  if(response.success && typeof response.redirect_url !== 'undefined') {
    let redirectURL = response.redirect_url;
    if(response.is_onboarding) {
      redirectURL += import.meta.env.VITE_SHOPIFY_RESPONSE_REDIRECT_URL;
    }
    window.location.href = redirectURL;
  } else {
    router.push({ path: routes.DASHBOARD });
  }
};
</script>

<template>
  <div class="text-center">
    <Loading />
  </div>
</template>
