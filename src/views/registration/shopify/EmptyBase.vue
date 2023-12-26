<script setup>
import { useRoute } from 'vue-router';

/* ----- Data ----- */
const {
  shopifyLogin,
} = toRefs(useAuthStore());

const route = useRoute();

/* ----- Mounted ----- */
onMounted(() => {
  shopifyLoginHandler();
});

/* ----- Methods ----- */
const shopifyLoginHandler = async () => {
  const storeName = route.query?.shop;
  await shopifyLogin.value('shopify', storeName);
};
</script>

<template>
  <div class="text-center">
    <Loading />
  </div>
</template>
