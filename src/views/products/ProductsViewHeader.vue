<script setup>
import { useProducts } from './composables/products';

const {
  fetchProductsHandler,
} = useProducts();

const {
  loading,
  queries,
  statusOption,
  statusOptions,
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
      <!-- <Dropdown
        :autoOptionFocus="false"
        :options="visibilityOptions"
        @change="fetchProductsHandler"
        :loading="loading"
        class="w-full"
        optionLabel="key"
        optionValue="value"
        placeholder="Sort products"
        showClear
        v-model="visibilityOption">
      </Dropdown> -->
    </div>
  </div>

  <div class="grid my-0">
    <div class="col-3">
      <div class="p-inputgroup w-100">
        <Dropdown
          :autoOptionFocus="false"
          :options="visibilityOptions"
          @change="fetchProductsHandler"
          class="w-full"
          optionLabel="key"
          optionValue="value"
          placeholder="`Sales channel visibility"
          showClear
          v-model="visibilityOption">
        </Dropdown>
      </div>
    </div>
    <!-- <div class="col-3">
      <div class="p-inputgroup w-100">
        <Dropdown
          :autoOptionFocus="false"
          :options="visibilityOptions"
          @change="fetchProductsHandler"
          class="w-full"
          optionLabel="key"
          optionValue="value"
          placeholder="Product type"
          showClear
          v-model="visibilityOption">
        </Dropdown>
      </div>
    </div> -->
    <!-- <div class="col-3">
      <div class="p-inputgroup w-100">
        <Dropdown
          :autoOptionFocus="false"
          :options="visibilityOptions"
          @change="fetchProductsHandler"
          class="w-full"
          optionLabel="key"
          optionValue="value"
          placeholder="Vendor"
          showClear
          v-model="visibilityOption">
        </Dropdown>
      </div>
    </div> -->
    <div class="col-3">
      <div class="p-inputgroup w-100">
        <Dropdown
          :autoOptionFocus="false"
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
</template>
