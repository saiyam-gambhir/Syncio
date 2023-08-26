<script setup>
import { useConnectionsStore } from 'connections';
import { useMarketPlaceStore } from 'marketPlace';

/* ----- Data ----- */
const { partnerStoreType } = toRefs(useConnectionsStore());
const {
  categories,
  countries,
  fetchProfiles,
  loading,
  pagination,
  productsRange,
  queries,
} = toRefs(useMarketPlaceStore());

/* ----- Methods ----- */
const updateCurrentPageHandler = page => {
  fetchProfiles.value(page);
};
</script>

<template>
  <div class="filters-wrapper mb-6">
    <h2 class="pt-4 mt-0 border-bottom">All {{ partnerStoreType }}s ({{ pagination?.total_count }})</h2>

    <Divider></Divider>

    <div class="grid filters">
      <div class="col-3">
        <Dropdown
          :autoOptionFocus="false"
          :loading="loading"
          :options="countries"
          @change="fetchProfiles"
          class="w-full"
          editable placeholder="Location"
          showClear
          v-model="queries['filters[country_name]']">
        </Dropdown>
      </div>

      <div class="col-3">
        <Dropdown
          :autoOptionFocus="false"
          :loading="loading"
          :options="productsRange"
          @change="fetchProfiles"
          class="w-full"
          placeholder="Number of products"
          showClear
          v-model="queries['filters[product_count]']">
        </Dropdown>
      </div>

      <div class="col-3">
        <Dropdown
          :autoOptionFocus="false"
          :loading="loading"
          :options="categories"
          @change="fetchProfiles"
          class="w-full"
          placeholder="Category"
          showClear
          v-model="queries['filters[category]']">
        </Dropdown>
      </div>

      <div class="col-3">
        <Pagination
          :pagination="pagination"
          :showInfo="false"
          @updateCurrentPage="updateCurrentPageHandler">
        </Pagination>
      </div>
    </div>
  </div>
</template>
