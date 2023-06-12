<script setup>
import { useConnectionsStore } from '@/stores/connections'
import { useMarketPlaceStore } from '@/stores/marketPlace'

/* ----- Components ----- */
import Pagination from '@/components/shared/Pagination.vue'

/* ----- Data ----- */
const connections = useConnectionsStore()
const marketPlace = useMarketPlaceStore()

/* ----- Methods ----- */
const updateCurrentPageHandler = page => {
  marketPlace.fetchProfiles(page)
}
</script>

<template>
  <div class="filters-wrapper mb-6">
    <h2 class="pt-4 mt-0 mb-4 border-bottom">All {{ connections.storeType }} stores ({{ marketPlace.pagination?.total_count }})</h2>

    <div class="grid filters">
      <div class="col-3">
        <Dropdown
          :autoOptionFocus="false"
          :options="marketPlace.countries"
          @hide="marketPlace.fetchProfiles"
          class="w-full"
          editable
          placeholder="Location"
          v-model="marketPlace.queries['filters[country_name]']">
        </Dropdown>
      </div>

      <div class="col-3">
        <Dropdown
          :autoOptionFocus="false"
          :options="marketPlace.productsRange"
          @hide="marketPlace.fetchProfiles"
          class="w-full"
          placeholder="Number of products"
          v-model="marketPlace.queries['filters[product_count]']">
        </Dropdown>
      </div>

      <div class="col-3">
        <Dropdown
          :autoOptionFocus="false"
          :options="marketPlace.categories"
          @hide="marketPlace.fetchProfiles"
          class="w-full"
          placeholder="Category"
          v-model="marketPlace.queries['filters[category]']">
        </Dropdown>
      </div>

      <div class="col-3">
        <Pagination :pagination="marketPlace.pagination" @updateCurrentPage="updateCurrentPageHandler" />
      </div>
    </div>
  </div>
</template>
