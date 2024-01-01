<script setup>
/* ----- Data ----- */
const loading = ref(false);

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
  loading.value = true;
  const storeName = route.query?.shop;
  await shopifyLogin.value('shopify', storeName);
  loading.value = false;
};
</script>

<template>
  <Loading />
</template>
