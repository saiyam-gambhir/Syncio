<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  loginWoo,
} = toRefs(useAuthStore());

const route = useRoute();
const router = useRouter();

/* ----- Mounted ----- */
onMounted(async () => {
  const store = route.query.store;
  const jwt = route.query.jwt;
  const response = await loginWoo.value({ jwt, store });
  if (response.success === false) {
    await router.push({ name: routes.LOGIN });
  }

  return await router.push({ name: routes.WOO_INSTALLATION_COMPLETED });
});
</script>

<template>
  <Loading />
</template>
