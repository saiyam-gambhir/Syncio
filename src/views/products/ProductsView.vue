<script setup>
import { onMounted, toRefs } from 'vue';
import { useConnectionsStore } from '@/stores/connections';
import { useProductsStore } from '@/stores/products';

/* ----- Components ----- */
import PageHeader from '@/components/shared/PageHeader.vue';
import StoresFilter from '@/components/shared/StoresFilter.vue';

/* ----- Data ----- */
const { connections, fetchConnections, partnerStoreType } = toRefs(useConnectionsStore());
const { fetchProducts, selectedStoreId } = toRefs(useProductsStore());

/* ----- Mounted ----- */
onMounted(async () => {
  if (connections.value.length === 0) await fetchConnections.value();
});

/* ----- Methods ----- */
const storeFilterHandler = async storeId => {
  selectedStoreId.value = storeId;
};

const fetchProductsHandler= () => {
  fetchProducts.value();
}
</script>

<template>
  <PageHeader
    content="Sync and manage your inventory"
    title="Products"
    withActions>
    <template #actions>
      <StoresFilter
        :customPlaceholderText="`Select a ${partnerStoreType}`"
        :showClear="false"
        @change="fetchProductsHandler()"
        @update:modelValue="storeFilterHandler"
        customPlaceholder
        v-model="selectedStoreId">
      </StoresFilter>
    </template>
  </PageHeader>
</template>
