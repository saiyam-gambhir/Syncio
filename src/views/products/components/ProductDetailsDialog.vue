<script setup>
/* ----- Data ----- */
const {
  isDestinationStore,
} = toRefs(useConnectionsStore());

const {
  isProductDetailsDialogRequested,
  productDetails,
} = toRefs(useProductsStore());

/* ----- Computed ----- */
const product = computed(() => {
  const data = productDetails.value?.sourceProduct;
  const imagesCount = productDetails.value?.sourceProduct.images.length;

  return {
    data,
    imagesCount,
  };
});

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isProductDetailsDialogRequested.value = false;
};
</script>

<template>
  <Sidebar v-model:visible="isProductDetailsDialogRequested" position="right" class="w-sidebar">
    <template #header>
      <h1 class="text-4xl font-bold mb-0 flex align-items-center justify-content-between">
        Product details
      </h1>
    </template>

    <div class="grid pt-5">
      <div class="col-4">
        <Carousel
          :numScroll="1"
          :numVisible="1"
          :showIndicators="product.imagesCount > 1"
          :showNavigators="product.imagesCount > 1"
          :value="product.data?.images" circular
          class="slider">
          <template #previousicon>
            <IconPrevious />
          </template>
          <template #item="{ data }">
            <div class="slider__image">
              <div class="image slider-image" :style="{ backgroundImage: `url(${data.src})` }"></div>
            </div>
          </template>
          <template #nexticon>
            <IconNext />
          </template>
        </Carousel>
      </div>

      <div class="col-8" v-if="product.data">
        <h2 class="text-4xl">{{ product.data.title }}</h2>

        <ul class="list-none p-0 m-0">
          <li class="flex align-items-top py-3 flex-wrap">
            <div class="w-3 font-bold">
              <label for="brandName" class="font-semibold">Product ID</label>
            </div>
            <div class="text-900 w-9 text-lg">
              {{ product.data.ref_id }}
            </div>
          </li>
          <li class="flex align-items-top py-3 flex-wrap">
            <div class="w-3 font-bold">
              <label for="brandName" class="font-semibold">Product Status</label>
            </div>
            <div class="text-900 w-9 capitalize text-lg">
              {{ product.data.status }}
            </div>
          </li>
          <li class="flex align-items-top py-3 flex-wrap">
            <div class="w-3 font-bold">
              <label for="brandName" class="font-semibold">Vendor</label>
            </div>
            <div class="text-900 w-9 text-lg">
              {{ product.data.meta_fields?.vendor ?? 'Vendor not available' }}
            </div>
          </li>
          <li class="flex align-items-top py-3 flex-wrap">
            <div class="w-3 font-bold">
              <label for="brandName" class="font-semibold">Tags</label>
            </div>
            <div class="text-900 w-9 text-lg">
              <Tag v-if="product.data.tags.length > 0" severity="info" rounded class="mr-2 mb-3" v-for="tag in product.data?.tags">{{ tag }}</Tag>
              <span v-else>Tags not available</span>
            </div>
          </li>
        </ul>

        <Divider />

        <div class="py-2">
          <h2>Description</h2>
          <div class="text-lg description" v-html="product.data?.description"></div>
        </div>

        <Divider />

        <div class="py-2">
          <h2>Variants count: <Tag severity="info" class="ml-2" style="transform: translateY(-2px);">{{ product.data.variants?.length }}</Tag></h2>
          <DataTable :value="product.data.variants" responsiveLayout="scroll" showGridlines>
            <Column header="Title" style="width: 40%;">
              <template #body="{ data: { title } }">
                <strong class="font-semibold py-2 block">{{ title }}</strong>
              </template>
            </Column>

            <Column header="SKU" style="width: 40%;">
              <template #body="{ data: { sku } }">
                {{ sku }}
              </template>
            </Column>

            <Column style="width: 20%;">
              <template #header>
                Quantity
                <i v-if="isDestinationStore" class="pi pi-question-circle ml-3 text-xl pointer" v-tooltip.top="'Quantities are from Shopify totals. Synced Stock Buffer and locations may not be applied.'"></i>
              </template>
              <template #body="{ data: { inventory_quantity } }">
                {{ inventory_quantity }}
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>

    <divider />
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
      height: 400px;
    }
  }

  .image {
    height: 400px;
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
