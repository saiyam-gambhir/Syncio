<script setup>
import { useConnectionsStore } from 'connections';
import { useMarketPlaceStore } from 'marketPlace';
import * as routes from '@/routes';

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
  <div class="filters-wrapper mb-4">
    <div class="pt-4 flex align-items-center justify-content-between">
      <h2 class="m-0 border-bottom">All {{ partnerStoreType }}s ({{ pagination?.total_count }})</h2>
      <router-link :to="routes.MARKETPLACE_SETTINGS">
        <Button label="Marketplace settings" outlined></Button>
      </router-link>
    </div>

    <Divider></Divider>

    <div class="grid filters mt-4">
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
          @updateCurrentPage="updateCurrentPageHandler"
          class="border-0">
        </Pagination>
      </div>
    </div>
  </div>
</template>
