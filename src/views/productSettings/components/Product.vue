<script setup>
import { computed, toRefs, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useConnectionsStore } from '@/stores/connections';
import { useProductSettingsStore } from '@/stores/productSettings';

/* ----- Data ----- */
const {
  addons,
} = toRefs(useAuthStore());

const {
  isDestinationStore,
  isSourceStore,
} = toRefs(useConnectionsStore());

const {
  destinationProductSettings,
  settingsUpdated,
  sourceProductSettings,
  stringifyDestinationProductSettings,
  stringifySourceProductSettings,
} = toRefs(useProductSettingsStore());

/* ----- Watcher ----- */
watch(destinationProductSettings, (newSettings, oldSettings) => {
  settingsUpdated.value = stringifyDestinationProductSettings.value !== JSON.stringify(newSettings);
},{ deep: true });

watch(sourceProductSettings, (newSettings, oldSettings) => {
  settingsUpdated.value = stringifySourceProductSettings.value !== JSON.stringify(oldSettings);
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
    'product_publish_sync': true,
    'sync_hs_code_and_country_origin': true,
    'sync_product_description': true,
    'sync_product_images': true,
    'sync_product_tags': true,
    'sync_product_title': true,
    'unpublish_at_product_creation': true,
  };

  return destinationProductSettings.value?.filter(({ key }) => syncSetting[key]);
});
</script>

<template>
  <section v-if="isDestinationStore">
    <p v-if="!addons.isSettingsModulePaid" class="m-0 mb-2 text-lg">Locked settings (<i class="pi pi-lock" style="font-size: 1rem; font-weight: bold;"></i>) are available with Product Settings PRO - <router-link to="/settings/plan-and-billings" class="btn-link text-lg">Upgrade</router-link> </p>
    <div class="grid">
      <div class="col-5">
        <ul class="list-none p-0 m-0">
          <li class="py-5 border-bottom-1 surface-border">
            <h3 class="m-0 text-xl">Initial sync</h3>
            <p class="mt-2 mb-0 text-lg">Syncs once, the first time you connect to a specific store</p>
          </li>
          <li v-for="setting in initialSyncSettings" :key="setting.key" class="py-5 border-bottom-1 surface-border">
            <div class="flex align-items-center justify-content-between w-full">
              <div class="w-85">
                <p class="m-0 font-semibold text-lg">
                  {{ setting.key === 'sync_product_metafield' ? 'SEO Metafields' : setting.label }}
                </p>
                <p class="mt-2 mb-0 text-lg">
                  <span v-if="setting.key === 'sync_product_handler'">
                    URL Handle in the Website SEO section of your Shopify Product
                  </span>
                  <span v-else-if="setting.key === 'sync_product_metafield'">
                    Copy from Source store, including Page title and Description
                  </span>
                </p>
              </div>
              <InputSwitch v-if="addons.isSettingsModulePaid" v-model="setting.is_active" />
              <i v-else class="pi pi-lock" style="font-size: 1.5rem"></i>
            </div>
          </li>
        </ul>
      </div>

      <div class="col-5 col-offset-1">
        <ul class="list-none p-0 m-0">
          <li class="py-5 border-bottom-1 surface-border">
            <h3 class="m-0 text-xl">Ongoing sync</h3>
            <p class="mt-2 mb-0 text-lg">Syncs in real time on an ongoing basis</p>
          </li>
          <li v-for="setting in ongoingSyncSettings" :key="setting.key" class="py-5 border-bottom-1 surface-border">
            <div class="flex align-items-center justify-content-between w-full">
              <div class="w-85">
                <p class="m-0 font-semibold text-lg">
                  {{ setting.key === 'sync_product_images' ? 'Images (Beta)' : setting.label }}
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
              <InputSwitch v-if="addons.isSettingsModulePaid" v-model="setting.is_active" />
              <i v-else class="pi pi-lock" style="font-size: 1.5rem"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section v-if="isSourceStore">
    <div class="grid">
      <div class="col-5">
        <ul class="list-none p-0 m-0">
          <li v-for="setting in sourceProductSettings" :key="setting.key" class="py-5 border-bottom-1 surface-border">
            <div class="flex align-items-center justify-content-between w-full">
              <div class="w-85">
                <p class="m-0 font-semibold text-lg">
                  {{ setting.label }}
                </p>
                <p class="mt-2 mb-0 text-lg">
                  {{ setting.description }}
                </p>
              </div>
              <InputSwitch v-model="setting.is_active" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>

</template>
