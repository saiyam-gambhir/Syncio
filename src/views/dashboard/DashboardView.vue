<script setup>
import { useUpgradeDialog } from '@/composables/upgradeDialog';
import { useUrlSearchParams } from '@vueuse/core';

/* ----- Components ----- */
import DashboardLeft from '@/views/dashboard/components/DashboardLeft.vue';
import DashboardRight from '@/views/dashboard/components/DashboardRight.vue';
import PageHeader from '@/components/shared/PageHeader.vue';

/* ----- Data ----- */
const { showUpgradeDialogHandler } = useUpgradeDialog();
const { showUpgrade, type } = useUrlSearchParams();

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

  <article class="grid mt-4">
    <DashboardLeft />
    <DashboardRight />
  </article>
</template>
