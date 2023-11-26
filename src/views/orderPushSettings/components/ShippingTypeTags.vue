<script setup>
/* ----- Data ----- */
const {
  pushOrderShippingTags,
  stringifyPushOrderShippingTags,
  loadingSettings,
} = toRefs(useOrdersStore());
</script>

<template>
  <CardWrapper v-if="!loadingSettings">
    <template #content>
      <p class="line-height-3 mb-4 mt-0">
        Convert shipping type into tags to be pushed to Source Stores. <AppLink label="Learn more" link="https://help.syncio.co/en/articles/5735293-order-add-on-custom-shipping-type-tags" />
      </p>

      {{ pushOrderShippingTags }}
    </template>
  </CardWrapper>
</template>
