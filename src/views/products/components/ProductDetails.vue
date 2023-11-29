<script setup>
import ProductDescriptionAndVariants from './ProductDescriptionAndVariants.vue';

/* ----- Data ----- */
const {
  isDestinationStore,
  platform,
} = toRefs(useConnectionsStore());

const {
  isViewDetailsRequested,
} = toRefs(useProductsStore());

/* ----- Props ----- */
const props = defineProps({
  product: {
    required: true,
    type: Object,
  }
});
</script>

<template>
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
          <div class="slider__image" :style="{ height: isViewDetailsRequested ? '400px' : '200px' }">
            <div class="image slider-image" :style="{ backgroundImage: `url(${data.src})`, height: isViewDetailsRequested ? '400px' : '200px' }"></div>
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
          <div class="w-1">:</div>
          <div class="text-900 w-8 text-lg">
            {{ product.data.ref_id }}
          </div>
        </li>

        <li class="flex align-items-top py-3 flex-wrap" v-if="isViewDetailsRequested">
          <div class="w-3 font-bold">
            <label for="brandName" class="font-semibold">Product Status</label>
          </div>
          <div class="w-1">:</div>
          <div class="text-900 w-8 capitalize text-lg">
            {{ product.data.status }}
          </div>
        </li>

        <li class="flex align-items-top py-3 flex-wrap">
          <div class="w-3 font-bold">
            <label for="brandName" class="font-semibold">Vendor</label>
          </div>
          <div class="w-1">:</div>
          <div class="text-900 w-8 text-lg" v-if="platform === 'shopify'">
            {{ product.data.meta_fields?.vendor || 'Vendor not available' }}
          </div>
          <div class="text-900 w-8 text-lg" v-else>
            {{ product.data?.vendor || 'Vendor not available' }}
          </div>
        </li>

        <li class="flex align-items-top py-3 flex-wrap">
          <div class="w-3 font-bold">
            <label for="brandName" class="font-semibold">Product Type</label>
          </div>
          <div class="w-1">:</div>
          <div class="text-900 w-8 text-lg" v-if="platform === 'shopify'">
            {{ product.data.meta_fields?.product_type || 'Type not available' }}
          </div>
          <div class="text-900 w-9 text-lg" v-else>
            {{ product.data?.product_type || 'Type not available' }}
          </div>
        </li>

        <li class="flex align-items-top py-3 flex-wrap">
          <div class="w-3 font-bold">
            <label for="brandName" class="font-semibold">Tags</label>
          </div>
          <div class="w-1">:</div>
          <div class="text-900 w-8 text-lg">
            <Tag v-if="product.data.tags.length > 0" severity="info" rounded class="mr-2 mb-2" v-for="tag in product.data?.tags">{{ tag }}</Tag>
            <span v-else>Tags not available</span>
          </div>
        </li>
      </ul>

      <template v-if="isViewDetailsRequested">
        <Divider />
        <ProductDescriptionAndVariants :product="product" />
      </template>
    </div>

    <div class="col-12">
      <ProductDescriptionAndVariants :product="product" v-if="!isViewDetailsRequested" />
    </div>
  </div>
</template>
