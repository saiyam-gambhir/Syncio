<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const loading = ref(false);
const loadingToDashboard = ref(false);

const {
  isDestinationStore,
} = toRefs(useConnectionsStore());

const {
  plan,
  fetchCurrentPlan,
} = toRefs(usePlanStore());

const {
  fetchUser,
} = toRefs(useAuthStore());

/* ----- Mounted ----- */
onMounted(async () => {
  const userId = sessionStorage.getItem('USER_ID');
  loading.value = true;
  await fetchUser.value(userId);
  await fetchCurrentPlan.value(userId);
  loading.value = false;
});
</script>

<template>
  <Loading v-if="loading" />
  <section v-else class="mx-auto" style="width: 500px;">
    <PageDetails :content="isDestinationStore ? `You can now sync up to ${plan?.syncio_plan?.sync_product_limit} products` : 'Start sharing products and inventory with other stores'" title="You're good to go!">
    </PageDetails>

    <aside class="auth-wrapper text-900">
      <h3 class="m-0 text-2xl">What's next?</h3>
      <ul v-if="isDestinationStore" class="p-0 mt-4 mb-6" style="list-style: none;">
        <li class="relative text-lg pl-7 flex align-items-center line-height-3">
          <span class="sequence">1</span>
          Click the “Stores” tab to invite and connect to other stores with Syncio
        </li>
        <li class="relative text-lg pl-7 flex align-items-center line-height-3 mt-4">
          <span class="sequence">2</span>
          Once connected you can use the sync feature to copy and import products.
        </li>
      </ul>

      <ul v-else class="p-0 mt-4 mb-6" style="list-style: none;">
        <li class="relative text-lg pl-7 flex line-height-3">
          <span class="sequence">1</span>
          Click the “Stores” tab to invite and connect to other stores with Syncio
        </li>
        <li class="relative text-lg pl-7 flex line-height-3 mt-4">
          <span class="sequence">2</span>
          Once connected, other stores can sync and sell your products.
        </li>
        <li class="relative text-lg pl-7 flex line-height-3 mt-4">
          <span class="sequence">3</span>
          Syncio can then automatically update stock whenever an order is created.
          <br>
          We can also sync any updates you make too!
        </li>
      </ul>

      <div class="flex flex-column align-items-center justify-content-center">
        <router-link :to="routes.DASHBOARD" @click="loadingToDashboard = true;" class="w-100 text-center">
          <Button
            :loading="loadingToDashboard"
            class="font-bold justify-content-center p-button-lg mb-4 w-100"
            label="Launch Syncio!">
          </Button>
        </router-link>
        <IconRocket />
      </div>
    </aside>
  </section>
</template>

<style scoped>
.sequence {
  align-items: center;
  background: transparent;
  border-radius: 50%;
  border: 2px solid #0E3B4D;
  color: #0E3B4D;
  display: flex;
  font-size: 16px;
  font-weight: 900;
  height: 34px;
  justify-content: center;
  left: 0;
  position: absolute;
  width: 34px;
}
</style>
