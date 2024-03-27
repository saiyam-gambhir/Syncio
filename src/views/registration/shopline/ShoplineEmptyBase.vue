<script setup>
/* ----- Data ----- */
const loading = ref(false);

const {
  shoplineLogin
} = toRefs(useAuthStore());

const route = useRoute();

/* ----- Mounted ----- */
onMounted(() => {
  shoplineLoginHandler();
});

/* ----- Methods ----- */
const shoplineLoginHandler = async () => {
  loading.value = true;
  const storeName = route.query?.handle + '.myshopline.com';
  await shoplineLogin.value('shopline', storeName);
  loading.value = false;
};
</script>

<template>
  <Loading />
</template>
