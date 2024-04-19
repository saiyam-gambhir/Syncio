<script setup>
import * as routes from '@/routes';

/* ----- Components ----- */
const MetafieldsDialog = defineAsyncComponent(() => import('./MetafieldsDialog.vue'));

/* ----- Data ----- */
const {
  addons,
} = toRefs(usePlanStore());

const {
  isDestinationStore,
  isSourceStore,
} = toRefs(useConnectionsStore());

const {
  destinationProductSettings,
  isMetaFieldsRequested,
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
    'unpublish_at_product_creation': true,
  };

  return destinationProductSettings.value?.filter(({ key }) => syncSetting[key]);
});

const ongoingSyncSettings = computed(() => {
  const syncSetting = {
    'd_sync_metafields': true,
    'product_publish_sync': true,
    'sync_hs_code_and_country_origin': true,
    'sync_product_description': true,
    'sync_product_images': true,
    'sync_product_tags': true,
    'sync_product_title': true,
    'sync_product_type': true,
    'sync_product_vendor': true,
    'sync_product_status': true,
  };

  return destinationProductSettings.value?.filter(({ key }) => syncSetting[key]);
});

const onChangeHandler = ({ is_active, key }) => {
  if(is_active) return;
  if(key === 'd_sync_metafields' && !is_active) {
    isMetaFieldsRequested.value = true;
  }
}
</script>

<template>
  <section v-if="isDestinationStore">
    <p v-if="!addons.isSettingsModulePaid" class="m-0 mb-2 text-lg">Locked settings (<i class="pi pi-lock" style="font-size: 1rem; font-weight: bold;"></i>) are available with Product Settings PRO - <router-link :to="routes.PLAN_AND_BILLINGS" class="btn-link text-lg">Upgrade</router-link> </p>
    <div class="grid">
      <div class="col-5">
        <ul class="list-none p-0 m-0">
          <li class="py-4 flex align-items-center text-2xl">
            <h3 class="m-0">Initial sync</h3>
            <i class="pi pi-question-circle text-2xl ml-3" style="transform: translateY(1px);" v-tooltip.right="'Syncs once, the first time you connect to a specific store'"></i>
          </li>
          <li v-for="setting in initialSyncSettings" :key="setting.key" class="py-5 border-bottom-1 surface-border">
            <div class="flex align-items-center justify-content-between w-full">
              <div class="w-85">
                <p class="m-0 font-semibold text-lg">
                  {{ setting.key === 'sync_product_metafield' ? 'SEO Metafields' : setting.label }}
                </p>
                <p class="mt-2 mb-0 text-lg">
                  <span v-if="setting.key === 'sync_product_handler'">
                    URL Handle in the Website SEO section of your Shopify Product.
                  </span>
                  <span v-else-if="setting.key === 'sync_product_metafield'">
                    Copy from Source store, including Page title and Description.
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

      <div class="col-5 col-offset-1">
        <ul class="list-none p-0 m-0">
          <li class="py-4 flex align-items-center text-2xl">
            <h3 class="m-0">Ongoing sync</h3>
            <i class="pi pi-question-circle text-2xl ml-3" style="transform: translateY(1px);" v-tooltip.right="'Syncs in real time on an ongoing basis'"></i>
          </li>
          <li v-for="setting in ongoingSyncSettings" :key="setting.key" class="py-5 border-bottom-1 surface-border">
            <div class="flex align-items-center justify-content-between w-full">
              <div class="w-85">
                <p class="m-0 font-semibold text-lg">
                  {{ setting.key === 'sync_product_images' ? 'Images (Beta)' : setting.label }}
                </p>
                <p class="mt-2 mb-0 text-lg">
                  <span v-if="setting.key === 'sync_product_title'">
                    Name of the product as the customer would see it.
                  </span>
                  <span v-else-if="setting.key === 'sync_product_description'">
                    Descriptions for each product.
                  </span>
                  <span v-else-if="setting.key === 'sync_product_images'">
                    Sync product and variant images. For more information please see this <AppLink label="article" link="https://help.syncio.co/en/articles/9202762-product-settings-images-and-videos" class="text-lg" />.
                    <ul class="p-0 pl-3 m-0 mt-3">
                      <li>Videos are not supported. If the source store product has videos do not use this feature.</li>
                      <li>For a reliable image sync please ensure image file size is 200Kb or under.</li>
                    </ul>
                  </span>
                  <span v-else-if="setting.key === 'sync_product_tags'">
                    When a new tag is added on the Source store, Syncio will add that tag to the Destination store.
                    Tags that are removed on the Source store will not be removed on the Destination store.
                  </span>
                  <span v-else-if="setting.key === 'sync_hs_code_and_country_origin'">
                    Found in the customs information section of the product in Shopify.
                  </span>
                  <span v-else-if="setting.key === 'product_publish_sync'">
                    Found in Shopify under Sales Channels and Apps.
                    It's not possible to set sales channel availability for individual product variants.
                  </span>
                  <span v-else-if="setting.key === 'sync_product_vendor'">
                    Ongoing sync of the Vendor field from the source product.
                  </span>
                  <span v-else-if="setting.key === 'sync_product_type'">
                    Ongoing sync of product type field from the source product.
                  </span>
                  <span v-else-if="setting.key === 'sync_product_status'">
                    <p>Ongoing sync of the Draft/Active status on Shopify</p>
                    <p>What will be synced:</p>
                    <ul class="p-0 pl-3 m-0 mt-3">
                      <li>Synced products will be set to <strong class="font-semibold">Draft</strong>, if the source store sets their product to Draft.</li>
                      <li>Synced products will be set to <strong class="font-semibold">Active</strong>, if the source store sets their product to Active.</li>
                    </ul>
                    <p class="mb-0">Useful option to prevent draft products from being sold.</p>
                  </span>
                  <span v-else-if="setting.key === 'd_sync_metafields'">
                    Ongoing sync of product and variant metafields from connected Source stores.
                    <br><br>
                    ⚠️ Turning on will mirror supported metafields to the Destination store and remove any that don't exist in the original source product/variant.
                    <br><br>
                    For a list of supported Metafields and more, <AppLink label="read Metafields Syncing Guide" link="https://help.syncio.co/en/articles/8418976-metafields-syncing-guide" class="text-lg" />
                    <br><br>
                    <strong>Note:</strong> Requires connected Source stores to turn on Metafields in their Product Settings
                  </span>
                </p>
              </div>

              <InputSwitch
                :class="{ 'metafields-switch' : setting.key === 'd_sync_metafields' }"
                @click="onChangeHandler(setting)"
                v-if="addons.isSettingsModulePaid"
                v-model="setting.is_active">
              </InputSwitch>

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
                  <span v-if="setting.key === 'sync_cost_per_item'">
                    Allow connected stores to sync the <i>Cost Per Item</i> field
                    <br><br>
                    <strong>Note: </strong> Requires connected Destination stores to turn on Cost Per Item in their Product Settings
                  </span>
                  <span v-else-if="setting.key === 's_sync_metafields'">
                    Allow Destination stores to sync product and variant metafields.
                    <br><br>
                    What connected Destination stores will have permission to sync:
                    <ul class="p-0 pl-3 m-0 mt-3">
                      <li>Custom product and variant metafield data (supported fields only*)</li>
                      <li>Includes: metafields definitions and metaobjects related to the above fields.</li>
                    </ul>
                    <br>
                    * For a full list of supported metafields, see: <AppLink label="metafields syncing guide" link="https://help.syncio.co/en/articles/8418976-metafields-syncing-guide" class="text-lg" />
                    <br><br>
                    <strong>Note: </strong> Requires connected Destination stores to turn on Metafields in their Product Settings
                  </span>
                </p>
              </div>
              <InputSwitch v-model="setting.is_active" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!----- Meta Fields ----->
  <MetafieldsDialog v-if="isMetaFieldsRequested" />

</template>
