<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  partnerStoreType
} = toRefs(useConnectionsStore());

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
    <div class="grid filters mt-0">
      <div class="col-3">
        <Dropdown
          :loading="loading"
          :options="countries"
          optionLabel="name"
          @change="fetchProfiles"
          class="w-full"
          filter
          filterIcon="pi pi-search"
          placeholder="Location"
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
          noWrap
          :pagination="pagination"
          @updateCurrentPage="updateCurrentPageHandler"
          class="border-0">
        </Pagination>
      </div>
    </div>

    <Divider />

    <div class="flex align-items-center justify-content-between">
      <h2 class="m-0 border-bottom">All {{ partnerStoreType }}s ({{ pagination?.total_count }})</h2>
      <div>
        <router-link :to="routes.MARKETPLACE_SETTINGS">
          <Button class="mr-3 p-button-sm" label="Settings" outlined></Button>
        </router-link>
        <a href="https://us18.list-manage.com/survey?u=d3876b95496c25d2e8d7568bb&amp;id=38b4962d37" target="_blank" style="text-decoration: none;">
          <Button size="small" label="Give feedback" outlined></Button>
        </a>
      </div>
    </div>

    <Divider />
  </div>
</template>
