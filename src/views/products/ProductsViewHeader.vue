<script setup>
import { useProducts } from './composables/products';

const {
  fetchProductsHandler,
} = useProducts();

const {
  loading,
  productTypeOptions,
  queries,
  selectedStoreId,
  sortOptions,
  statusOption,
  statusOptions,
  vendorOptions,
  visibilityOption,
  visibilityOptions,
} = toRefs(useProductsStore());

/* ----- Methods ----- */
const searchHandler = searchText => {
  queries.value.search_str = searchText;
  fetchProductsHandler();
};
</script>

<template>
  <section v-if="selectedStoreId">
    <div class="grid my-0">
      <div class="col-9">
        <div class="p-inputgroup w-100">
          <SearchFilter
            :loading="loading"
            @update:modelValue="searchHandler"
            placeholder="Search products by name, ID, tag or SKU"
            v-model="queries.search_str">
          </SearchFilter>
        </div>
      </div>
      <div class="col-3">
        <Dropdown
          :autoOptionFocus="false"
          :loading="loading"
          :options="sortOptions"
          @change="fetchProductsHandler"
          class="w-full"
          optionLabel="label"
          showClear
          v-model="queries.sortBy">
          <template #value>Sort Products</template>
            <template #option="{ option }">
              <div class="flex align-items-center justify-content-between">
                {{ option.label }}
                <i :class="option.icon"></i>
              </div>
            </template>
        </Dropdown>
      </div>
    </div>

    <div class="grid my-0">
      <div class="col-3">
        <div class="p-inputgroup w-100">
          <Dropdown
            :autoOptionFocus="false"
            :loading="loading"
            :options="visibilityOptions"
            @change="fetchProductsHandler"
            class="w-full"
            optionLabel="key"
            optionValue="value"
            placeholder="Sales channel visibility"
            showClear
            v-model="visibilityOption">
          </Dropdown>
        </div>
      </div>
      <div class="col-3">
        <div class="p-inputgroup w-100">
          <Dropdown
            :autoOptionFocus="false"
            :loading="loading"
            :options="productTypeOptions"
            @change="fetchProductsHandler"
            class="w-full"
            optionLabel="value"
            optionValue="value"
            placeholder="Product type"
            showClear
            v-model="queries.productType">
          </Dropdown>
        </div>
      </div>
      <div class="col-3">
        <div class="p-inputgroup w-100">
          <Dropdown
            :autoOptionFocus="false"
            :loading="loading"
            :options="vendorOptions"
            @change="fetchProductsHandler"
            class="w-full"
            optionLabel="value"
            optionValue="value"
            placeholder="Vendor"
            showClear
            v-model="queries.vendor">
          </Dropdown>
        </div>
      </div>
      <div class="col-3">
        <div class="p-inputgroup w-100">
          <Dropdown
            :autoOptionFocus="false"
            :loading="loading"
            :options="statusOptions"
            @change="fetchProductsHandler"
            class="w-full"
            optionLabel="key"
            optionValue="value"
            placeholder="Status"
            showClear
            v-model="statusOption">
          </Dropdown>
        </div>
      </div>
    </div>
  </section>
</template>
