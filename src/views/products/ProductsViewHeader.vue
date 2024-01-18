<script setup>
const {
  fetchProductsHandler,
} = useProducts();

const {
  storeName,
} = toRefs(useConnectionsStore());

const {
  excludeZeroStock,
  loading,
  productTypeOptions,
  queries,
  searchAttribute,
  searchOptions,
  sortOptions,
  statusOption,
  statusOptions,
  storesWithNewFilters,
  totalProductCount,
  vendorOptions,
  visibilityOption,
  visibilityOptions,
} = toRefs(useProductsStore());

/* ----- Computed ----- */
const enableNewFilters = computed(() => {
  return storesWithNewFilters.value.includes(storeName.value) || +totalProductCount.value > 30000;
});

/* ----- Methods ----- */
const searchHandler = searchText => {
  queries.value.search_str = searchText;
  fetchProductsHandler();
};

const searchAttributeHandler = ($event) => {
  if(!$event.value) {
    queries.value.search_str = null;
    fetchProductsHandler();
  }
};

const showProductSearchAttributes = () => {
  const searchAttributesSelector = document.querySelector('#search-attributes');
  if(searchAttributesSelector) {
    searchAttributesSelector.click();
  }
};
</script>

<template>
  <section>
    <div class="grid grid-sm my-0">

      <div v-if="enableNewFilters" class="col-10 flex align-items-center">
        <div class="grid grid-sm w-100">
          <div class="col-3 flex align-items-center">
            <Button
              @click="fetchProductsHandler"
              aria-label="Refresh"
              class="mr-3"
              icon="pi pi-refresh"
              outlined
              style="background: #fff; border: 1px solid #ced4da; flex-shrink: inherit; height: 39px;"
              v-tooltip.top="'Refresh'">
            </Button>

            <div class="p-inputgroup w-100">
              <Dropdown
                id="search-attributes"
                :autoOptionFocus="false"
                :loading="loading"
                :options="searchOptions"
                @change="searchAttributeHandler"
                class="w-full"
                optionLabel="label"
                placeholder="Search products by"
                showClear
                v-model="searchAttribute">
              </Dropdown>
            </div>
          </div>
          <div class="col-9 flex align-items-center pr-0">
            <div class="p-inputgroup relative w-100">
              <span v-if="!searchAttribute" class="w-100 h-100 absolute pointer z-1" @click="showProductSearchAttributes" style="top: 0; left: 0;"></span>
              <SearchFilter
                :disabled="!searchAttribute"
                :loading="loading"
                @update:modelValue="searchHandler"
                placeholder="Your search query"
                v-model="queries.search_str">
              </SearchFilter>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!enableNewFilters" class="col-10 flex align-items-center">
        <Button
          @click="fetchProductsHandler"
          aria-label="Refresh"
          class="mr-3"
          icon="pi pi-refresh"
          outlined
          style="background: #fff; border: 1px solid #ced4da; flex-shrink: inherit; height: 39px;"
          v-tooltip.top="'Refresh'">
        </Button>

        <div class="p-inputgroup w-100">
          <SearchFilter
            :loading="loading"
            @update:modelValue="searchHandler"
            placeholder="Search products by name, ID, tag or SKU"
            v-model="queries.search_str">
          </SearchFilter>
        </div>
      </div>
      <div class="col-2">
        <Dropdown
          :autoOptionFocus="false"
          :loading="loading"
          :options="sortOptions"
          @change="fetchProductsHandler"
          class="w-full"
          optionLabel="label"
          placeholder="Sort products"
          showClear
          v-model="queries.sortBy">
        </Dropdown>
      </div>
    </div>

    <div class="grid grid-sm my-0">
      <div class="col-2">
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
      <div class="col-2">
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
      <div class="col-2">
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
      <div class="col-2">
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
      <div class="col-4 flex align-items-center">
        <InputSwitch
          @change="fetchProductsHandler"
          inputId="hide-zero-stock"
          v-model="excludeZeroStock">
        </InputSwitch>
        <label class="pointer font-semi ml-3" for="hide-zero-stock">Hide 0 stock products</label>
      </div>
    </div>
  </section>
</template>
