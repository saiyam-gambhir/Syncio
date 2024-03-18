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
} = toRefs(useConnectionsStore());

const {
  showUpgrade,
  type,
} = useUrlSearchParams();

/* ----- Mounted ----- */
onMounted(() => {
  if (Boolean(showUpgrade)) {
    showUpgradeDialogHandler(type);
  }

  if(!plan.value && (isShopify.value || isShopline.value) && isDestinationStore.value) {
    router.push({ name: routes.SHOPIFY_SELECT_PLAN });
  }
});
</script>

<template>
  <PageHeader
    content="Get the most out of Syncio so you can focus on growing your business"
    title="Welcome">
  </PageHeader>

  <article class="grid mt-2">
    <DashboardLeft />
    <DashboardRight />
  </article>
</template>
