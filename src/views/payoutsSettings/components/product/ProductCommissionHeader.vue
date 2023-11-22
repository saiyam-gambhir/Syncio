<script setup>
/* ----- Data ----- */
const {
  connectionFilterItems,
} = toRefs(useConnectionsStore());

const {
  fetchByProduct,
  searchString,
} = toRefs(usePayoutsSettingsStore());

/* ----- Methods ----- */
const getStoreName = (id) => {
  const store = connectionFilterItems.value?.find(store => store.id === id);
  return store?.store_domain;
};

const searchHandler = async searchText => {
  searchString.value = searchText;
  await fetchByProduct.value();
};
</script>

<template>
  <div class="flex align-items-center justify-content-between">
    <div class="p-inputgroup w-35">
      <SearchFilter
        @update:modelValue="searchHandler"
        placeholder="Search by product name"
        v-model="searchString">
      </SearchFilter>
    </div>

    <div class="flex w-50 align-items-center justify-content-end">
      <div class="p-inputgroup w-35">
        <!-- <StoresFilter
          @update:modelValue="storeFilterHandler"
          v-model="productQueries.partner_store_id">
        </StoresFilter> -->
      </div>
    </div>
  </div>
</template>
