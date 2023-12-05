<script setup>
const {
  fetchProducts,
  queries,
} = toRefs(useProductsStore());

const visiblityOption = ref(null);

const visibilityOptions = [
  { key: 'All', value: 'all' },
  { key: 'Online Store', value: 'published' },
  { key: 'Unavailable', value: 'unpublished' },
];

/* ----- Methods ----- */
const fetchProductsHandler = async () => {
  queries.value.filters = [];
  if(visiblityOption.value) {
    queries.value.filters.push(visiblityOption.value);
  }
  await fetchProducts.value();
};

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
          @update:modelValue="searchHandler"
          placeholder="Search products by name, ID, tag or SKU"
          v-model="queries.search_str">
        </SearchFilter>
      </div>
    </div>
    <div class="col-3">
      <Dropdown
        :autoOptionFocus="false"
        :options="visibilityOptions"
        @change="fetchProductsHandler"
        class="w-full"
        optionLabel="key"
        optionValue="value"
        placeholder="Sort products"
        showClear
        v-model="visiblityOption">
      </Dropdown>
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
          placeholder="Sales channel visibility"
          showClear
          v-model="visiblityOption">
        </Dropdown>
      </div>
    </div>
    <div class="col-3">
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
          v-model="visiblityOption">
        </Dropdown>
      </div>
    </div>
    <div class="col-3">
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
          v-model="visiblityOption">
        </Dropdown>
      </div>
    </div>
    <div class="col-3">
      <div class="p-inputgroup w-100">
        <Dropdown
          :autoOptionFocus="false"
          :options="visibilityOptions"
          @change="fetchProductsHandler"
          class="w-full"
          optionLabel="key"
          optionValue="value"
          placeholder="Status"
          showClear
          v-model="visiblityOption">
        </Dropdown>
      </div>
    </div>
  </div>
</template>
