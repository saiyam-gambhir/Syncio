<script setup>
import { useDebounceFn } from '@vueuse/core';

/* ----- Data ----- */
const searchString = ref(null);
const loadingProduct = ref(false);

const {
  platform,
  storeName,
} = toRefs(useConnectionsStore());

const {
  isProductDetailsDialogRequested,
  isViewDetailsRequested,
  productDetails,
  searchedProducts,
  searchProduct,
  searchStoreProducts,
  selectedStore,
} = toRefs(useProductsStore());

/* ----- Computed ----- */
const sourceProduct = computed(() => {
  const data = productDetails.value?.sourceProduct;
  const imagesCount = productDetails.value?.sourceProduct?.images.length;

  return {
    data,
    imagesCount,
  };
});

const destinationProduct = computed(() => {
  const data = productDetails.value?.destinationProduct;
  const imagesCount = productDetails.value?.destinationProduct?.images.length;

  return {
    data,
    imagesCount,
  };
});

/* ----- Methods -----*/
const debouncedSearchProducts = async () => {
  await searchStoreProducts.value(searchString.value);
};

const searchProductHandler = async ($event) => {
  await searchProduct.value($event.value?.ref_id);
};
</script>

<template>
  <Sidebar v-model:visible="isProductDetailsDialogRequested" position="right" class="w-sidebar">
    <template #header>
      <h1 class="text-4xl font-bold mb-0 flex align-items-center justify-content-between">
        <span v-if="isViewDetailsRequested">Product details</span>
        <span v-else>Map with Existing</span>
      </h1>
    </template>

    <!----- Product Details ----->
    <template v-if="isViewDetailsRequested">
      <ProductDetails :product="sourceProduct" />
    </template>

    <template v-else>
      <div class="grid">
        <div class="col-5" style="width: 47.5%;">
          <ProductStoreInfo
            :backgroundInfo="'background: rgba(252, 176, 87, .15);'"
            :platform="selectedStore.platform"
            :storeName="selectedStore.store_domain"
            :styleInfo="'background: rgba(252, 176, 87, .75); color: #0e3b4d; width: 6rem;'"
            title="From">
          </ProductStoreInfo>
          <div></div>
          <ProductDetails :product="sourceProduct" style="margin-top: 5.5rem;" />
        </div>
        <div class="col-2" style="width: 5%;">
          <Divider layout="vertical" class="m-0" />
        </div>
        <div class="col-5" style="width: 47.5%;">
          <ProductStoreInfo
            :backgroundInfo="'background: rgba(250, 117, 123, .15);'"
            :platform="platform"
            :storeName="storeName"
            :styleInfo="'background: rgba(250, 117, 123, .75); color: #0e3b4d; width: 6rem;'"
            title="To">
          </ProductStoreInfo>

          <!----- Mapper ----->
          <div class="w-full my-4">
            <AutoComplete
              @item-select="searchProductHandler($event)"
              dropdown
              :suggestions="searchedProducts"
              @complete="debouncedSearchProducts"
              class="p-inputtext-lg w-100"
              optionLabel="title"
              placeholder="Search using Title or Product ID"
              v-model="searchString">
            </AutoComplete>
          </div>

          <div v-if="!destinationProduct.data" class="text-center text-light text-xl font-semi line-height-3 py-8 px-2">
            <span v-if="!searchString && !loadingProduct">
              Search for the Destination store <br> product you wish to map the <br> Source store product to
            </span>

            <span v-if="loadingProduct">
            </span>
          </div>
          <!----- Mapper ----->

          <ProductDetails :product="destinationProduct" v-if="destinationProduct.data" />
        </div>
      </div>
    </template>
  </Sidebar>
</template>


<style lang="scss">
.slider {
  background: var(--white);
  border-radius: var(--border-radius);
  border: 0.0625rem solid transparent;
  position: relative;
  transition: 0.25s;

  .p-carousel-prev,
  .p-carousel-next {
    position: absolute;
    z-index: 11;
  }

  .p-carousel-prev {
    left: 0rem;
  }

  .p-carousel-next {
    right: 0rem;
  }

  &:hover {
    z-index: 1;
  }

  &__image {
    background-color: var(--image-placeholder-background);
    border-radius: var(--border-radius);
  }
}

.slider-image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.description {
  p {
    line-height: 2rem;
    margin-bottom: 0;
  }
}
</style>
