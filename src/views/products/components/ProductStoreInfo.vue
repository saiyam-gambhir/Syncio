<script setup>
const props = defineProps({
  backgroundInfo: {
    required: true,
    type: String,
  },

  customStoreName: {
    required: true,
    type: String,
  },

  platform: {
    required: true,
    type: String,
  },

  storeName: {
    required: true,
    type: String,
  },

  styleInfo: {
    required: true,
    type: String
  },

  title: {
    required: true,
    type: String,
  }
});
</script>

<template>
  <div class="flex mt-4" style="height: 4rem;">
    <span class="flex h-100 align-items-center justify-content-center text-xl font-semibold uppercase p-2" :style="styleInfo">
      {{ title }}
    </span>
    <span class="flex align-items-center py-2 px-3 w-100" :style="backgroundInfo">
      <IconShopify v-if="platform === 'shopify'" />
      <IconWoo v-if="platform === 'woocommerce'" />
      <div v-if="customStoreName" class="flex ml-3 flex-column">
        <span class="text-xl font-semi">{{ customStoreName }}</span>
        <span style="margin-left: .1rem;">{{ storeName }}</span>
      </div>
      <span v-else class="ml-3 text-xl font-semi">
        {{ storeName }}
      </span>
    </span>
  </div>
</template>
