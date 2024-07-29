<script setup>
import { useUrlSearchParams } from '@vueuse/core';
import * as routes from '@/routes';

/* ----- Data ----- */
const router = useRouter();

const {
  showUpgradeDialogHandler,
} = useUpgradeDialog();

const {
  plan,
} = toRefs(usePlanStore());

const {
  isDestinationStore,
  isShopify,
  isShopline,
  isSourceStore,
} = toRefs(useConnectionsStore());

const {
  fetchDashboardStats,
} = toRefs(useDashboardStore());

const {
  showUpgrade,
  type,
} = useUrlSearchParams();

/* ----- Mounted ----- */
onMounted(() => {
  if (Boolean(showUpgrade)) {
    showUpgradeDialogHandler(type);
  }

  if (!plan.value && (isShopify.value || isShopline.value) && isDestinationStore.value) {
    router.push({ name: routes.SHOPIFY_SELECT_PLAN });
  }

  if(isSourceStore.value) {
    fetchDashboardStats.value();
  }
});
</script>

<template>
  <PageHeader content="Get the most out of Syncio so you can focus on growing your business" title="Welcome">
  </PageHeader>

  <article class="grid mt-2">
    <DashboardStats v-if="isSourceStore" />
    <DashboardLeft />
    <DashboardRight />
  </article>
</template>
