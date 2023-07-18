<script setup>
import { useConnectionsStore } from '@/stores/connections';
import { useFilters } from '@/composables/filters';
import { useToasts } from '@/composables/toasts';

/* ----- Components ----- */
import CardWrapper from '@/views/dashboard/components/CardWrapper.vue';
import PageHeader from '@/components/shared/PageHeader.vue';

/* ----- Data ----- */
const { copyToClipBoard, formatDate } = useFilters();
const { showToast } = useToasts();
const { platform, storeCreationDate, storeKey, storeName, storeType } = useConnectionsStore();
</script>

<template>
  <PageHeader
    content="Choose how you'd like to receive communications for your account"
    title="Notification settings">
  </PageHeader>

  <article class="grid mt-4">
  </article>
</template>
