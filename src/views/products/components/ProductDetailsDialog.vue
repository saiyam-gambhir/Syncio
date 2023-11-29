<script setup>
/* ----- Data ----- */
const {
  platform,
  storeName,
} = toRefs(useConnectionsStore());

const {
  isProductDetailsDialogRequested,
  isViewDetailsRequested,
  productDetails,
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
            :platform="selectedStore[0].platform"
            :storeName="selectedStore[0].store_domain"
            :styleInfo="'background: rgba(252, 176, 87, .75); color: #0e3b4d; width: 6rem;'"
            title="From">
          </ProductStoreInfo>
          <ProductDetails :product="sourceProduct" />
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
          <ProductDetails :product="destinationProduct" />
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
