<script setup>
import { useUrlSearchParams } from '@vueuse/core';

/* ----- Data ----- */
const {
  showUpgradeDialogHandler,
} = useUpgradeDialog();

const {
  showUpgrade,
  type,
} = useUrlSearchParams();

/* ----- Mounted ----- */
onMounted(() => {
  if (Boolean(showUpgrade)) {
    showUpgradeDialogHandler(type);
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
