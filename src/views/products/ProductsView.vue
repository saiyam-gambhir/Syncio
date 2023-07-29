<script setup>
import { onMounted, toRefs } from 'vue';
import { useConnectionsStore } from '@/stores/connections';
import { useProductsStore } from '@/stores/products';

/* ----- Components ----- */
import PageHeader from '@/components/shared/PageHeader.vue';
import StoresFilter from '@/components/shared/StoresFilter.vue';

/* ----- Data ----- */
const { connections, fetchConnections, partnerStoreType } = toRefs(useConnectionsStore());
const { selectedStore } = toRefs(useProductsStore());

/* ----- Mounted ----- */
onMounted(async () => {
  if (connections.value.length === 0) await fetchConnections.value();
});

/* ----- Methods ----- */
const storeFilterHandler = async storeId => {
  selectedStore.value = storeId;
};
</script>

<template>
  <PageHeader
    content="Sync and manage your inventory"
    title="Products"
    withActions>
    <template #actions>
      <StoresFilter
        @update:modelValue="storeFilterHandler"
        customPlaceholder
        :customPlaceholderText="`Select a ${partnerStoreType}`"
        :showClear="false"
        v-model="selectedStore">
      </StoresFilter>
    </template>
  </PageHeader>
</template>
