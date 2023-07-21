<script setup>
import { useProductSettingsStore } from '@/stores/productSettings';
import { computed, ref, toRefs, watch } from 'vue';

/* ----- Data ----- */
const { destinationProductSettings } = toRefs(useProductSettingsStore());
const settingsUpdated = ref(false);

watch(destinationProductSettings, (newValue, oldValue) => {
  if(JSON.parse(JSON.stringify(newValue)) === JSON.parse(JSON.stringify(oldValue)) || oldValue.length === 0) return;
  settingsUpdated.value = true;
},{ deep: true });

/* ----- Computed ----- */
const initialSyncSettings = computed(() => {
  const syncSetting = {
    'sync_product_handler': true,
    'sync_product_metafield': true,
  };

  return destinationProductSettings.value?.filter(({ key }) => syncSetting[key]);
});

const ongoingSyncSettings = computed(() => {
  const syncSetting = {
    'sync_product_title': true,
    'sync_product_description': true,
    'sync_product_images': true,
    'sync_product_tags': true,
    'sync_hs_code_and_country_origin': true,
    'product_publish_sync': true,
    'unpublish_at_product_creation': true,
  };

  return destinationProductSettings.value?.filter(({ key }) => syncSetting[key]);
});

const checkForUpdate = (setting) => {
}
</script>

<template>
  <ul class="list-none p-0 m-0">
    <li class="py-5 border-bottom-1 surface-border">
      <h3 class="m-0 text-xl">Initial sync</h3>
      <p class="mt-2 mb-0 text-lg">Syncs once, the first time you connect to a specific store</p>
    </li>
    <li v-for="setting in initialSyncSettings" :key="setting.key" class="py-5 border-bottom-1 surface-border">
      <div class="flex align-items-center justify-content-between w-full">
        <div>
          <p class="m-0 font-semibold text-lg">
            {{ setting.key === 'sync_product_metafield' ? 'SEO Metafields' : setting.label }}
          </p>
          <p  class="mt-2 mb-0 text-lg">
            <span v-if="setting.key === 'sync_product_handler'">
              URL Handle in the Website SEO section of your Shopify Product
            </span>
            <span v-else-if="setting.key === 'sync_product_metafield'">
              Copy from Source store, including Page title and Description
            </span>
          </p>
        </div>
        <InputSwitch v-model="setting.is_active" @change="checkForUpdate(setting)" />
      </div>
    </li>
  </ul>

  <ul class="list-none p-0 mt-6">
    <li class="py-5 border-bottom-1 surface-border">
      <h3 class="m-0 text-xl">Ongoing sync</h3>
      <p class="mt-2 mb-0 text-lg">Syncs in real time on an ongoing basis</p>
    </li>
    <li v-for="setting in ongoingSyncSettings" :key="setting.key" class="py-5 border-bottom-1 surface-border">
      <div class="flex align-items-center justify-content-between w-full">
        <div>
          <p class="m-0 font-semibold text-lg">
            {{ setting.label }}
          </p>
          <p class="mt-2 mb-0 text-lg">
            <span v-if="setting.key === 'sync_product_title'">
              Name of the product as the customer would see it
            </span>
            <span v-else-if="setting.key === 'sync_product_description'">
              Descriptions for each product
            </span>
            <span v-else-if="setting.key === 'sync_product_images'">
              <strong class="font-semibold">Product</strong> and <strong class="font-semibold">Variant</strong> images. Syncio doesn't currently sync videos.
              Duplicates may occur if more than 20 images per product exist.
            </span>
            <span v-else-if="setting.key === 'sync_product_tags'">
              When a new tag is added on the Source store, Syncio will add that tag to the Destination store.
              Tags that are removed on the Source store will not be removed on the Destination store.
            </span>
            <span v-else-if="setting.key === 'sync_hs_code_and_country_origin'">
              Found in the customs information section of the product in Shopify
            </span>
            <span v-else-if="setting.key === 'product_publish_sync'">
              Found in Shopify under Sales Channels and Apps.
              It's not possible to set sales channel availability for individual product variants.
            </span>
            <span v-else-if="setting.key === 'unpublish_at_product_creation'">
              If <strong class="font-semibold">Online Store Sales Channel</strong> setting is enabled, this setting will be
              overridden whenever the Source store updates their products.
            </span>
          </p>
        </div>
        <InputSwitch v-model="setting.is_active" />
      </div>
    </li>
  </ul>
</template>
