<script setup>
/* ----- Data ----- */
const {
  connectionFilterItems,
} = toRefs(useConnectionsStore());

const {
  fetchByProduct,
  productQueries,
  searchString,
} = toRefs(usePayoutsSettingsStore());

/* ----- Methods ----- */
const searchHandler = async searchText => {
  searchString.value = searchText;
  await fetchByProduct.value();
};

const storeFilterHandler = async storeId => {
  const connectionId = connectionFilterItems.value.find(connection => connection.id === storeId)?.connection_id;
  productQueries.value = {
    connection_id: connectionId,
    source_store_id: storeId,
  };
  await fetchByProduct.value();
};
</script>

<template>
  <div class="grid grid-sm">
    <div class="col-9">
      <div class="p-inputgroup">
        <SearchFilter
          @update:modelValue="searchHandler"
          placeholder="Search by product name"
          v-model="searchString">
        </SearchFilter>
      </div>
    </div>
    <div class="col-3">
      <div class="p-inputgroup">
        <StoresFilter
          @update:modelValue="storeFilterHandler"
          v-model="productQueries.source_store_id">
        </StoresFilter>
      </div>
    </div>
  </div>
</template>
