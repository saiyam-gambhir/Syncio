<script setup>
import * as routes from '@/routes';

/* ----- Components ----- */
const SyncedStockDialog = defineAsyncComponent(() => import('./SyncedStockDialog.vue'));

/* ----- Data ----- */
const {
  destinationVariantSettings,
  isSafetyNetModified,
  isSyncedStockDialogVisible,
  safetyNetQuantity,
  settingsUpdated,
  sourceVariantSettings,
  stringifyDestinationVariantSettings,
  stringifySourceVariantSettings,
} = toRefs(useProductSettingsStore());

const {
  isDestinationStore,
  isSourceStore,
} = toRefs(useConnectionsStore());

const {
  addons,
} = toRefs(usePlanStore());

const quantity = ref(null);

/* ----- Mounted ----- */
onMounted(() => {
  quantity.value = safetyNetQuantity.value;
});

/* ----- Methods ----- */
const changeSwitchHandler = (setting) => {
  if (setting.key === 'inventory_safety_net_sync') {
    isSyncedStockDialogVisible.value = true;
    isSafetyNetModified.value = !isSafetyNetModified.value;
  }
};

/* ----- Watcher ----- */
watch(destinationVariantSettings, (newSettings, oldSettings) => {
  settingsUpdated.value = stringifyDestinationVariantSettings.value !== JSON.stringify(newSettings);
}, { deep: true });

watch(sourceVariantSettings, (newSettings, oldSettings) => {
  settingsUpdated.value = stringifySourceVariantSettings.value !== JSON.stringify(newSettings);
}, { deep: true });

watch(safetyNetQuantity, (newValue, oldValue) => {
  settingsUpdated.value = newValue && newValue !== quantity.value;
  isSafetyNetModified.value = newValue !== quantity.value;
}, { deep: true });
</script>

<template>
  <section v-if="isDestinationStore">
    <p v-if="!addons.isSettingsModulePaid" class="m-0 mb-2 text-lg">Locked settings (<i class="pi pi-lock" style="font-size: 1rem; font-weight: bold;"></i>) are available with Product Settings PRO - <router-link :to="routes.PLAN_AND_BILLINGS" class="btn-link text-lg">Upgrade</router-link> </p>
    <div class="grid">
      <div class="col-5">
        <ul class="list-none p-0 m-0">
          <li class="py-4 flex align-items-center text-2xl">
            <h3 class="m-0">Ongoing sync</h3>
            <i class="pi pi-question-circle text-2xl ml-3" style="transform: translateY(1px);" v-tooltip.right="'Syncs in real time on an ongoing basis'"></i>
          </li>
          <li v-for="setting in destinationVariantSettings" :key="setting.key" class="py-5 border-bottom-1 surface-border">
            <div class="flex align-items-center justify-content-between w-full">
              <div class="w-85">
                <p class="m-0 font-semibold text-lg">{{ setting.label }}</p>
                <p class="mt-2 mb-0 text-lg">
                  <span v-if="setting.key === 'auto_add_product_variant'">
                    Ongoing sync of new variants.
                    <br>
                    When a new variant is added to a synced product on the Source store, Syncio will auto-add the variant to the corresponding product on the Destination store.
                    <br><br>
                    <strong>Note:</strong> Syncio does not add/remove.
                  </span>

                  <span v-if="setting.key === 'sync_inventory_policy'">
                    Ongoing sync of the Track quantity and Continue selling when out of stock under the Inventory section for each variant.
                  </span>

                  <span v-if="setting.key === 'auto_remove_product_variant'">
                    Ongoing sync of removed variants.
                    <br><br>
                    When a variant is removed from a synced product on the Source store, Syncio will auto-remove the variant from the corresponding product on the Destination store.
                    <br><br>
                    <strong>Note:</strong> Syncio does not add.
                  </span>

                  <span v-if="setting.key === 'd_sync_cost_per_item'">
                    Ongoing Sync of the "Cost Per Item" field.
                    <br><br>
                    <strong>Note:</strong> Your source store needs to grant permission first. Do not use if currency is different.
                  </span>

                  <span v-if="setting.key === 'sync_variant_title'">
                    Ongoing sync of variant name which is a combination of option values separated by "/".
                    Example: Grey T-Shirt / XS
                    <br><br>
                    <strong>Note:</strong> Syncio is not able to add/remove product options.
                  </span>

                  <span v-if="setting.key === 'price_sync'">
                    Ongoing sync of both the Price and Compare at Price for the product.
                    <br><br>
                    <strong>Note:</strong> Compare at price value must be greater than price.
                  </span>

                  <span v-if="setting.key === 'sync_product_variant_weight'">
                    Ongoing sync of a variant's weight data from the source product.
                  </span>
                </p>
              </div>
              <InputSwitch v-if="addons.isSettingsModulePaid || setting.key === 'auto_remove_product_variant'"
                v-model="setting.is_active" />
              <i v-else class="pi pi-lock" style="font-size: 1.5rem"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section v-if="isSourceStore">
    <p class="text-lg">Switch on any product attributes that you would like to sync across all connected source stores.
    </p>
    <div class="grid">
      <div class="col-5">
        <ul class="list-none p-0 m-0">
          <li v-for="setting in sourceVariantSettings" :key="setting.key" class="py-5 border-bottom-1 surface-border">
            <div class="flex justify-content-between w-full">
              <div class="w-85">
                <p class="m-0 font-semibold text-lg">
                  {{ setting.label }}
                  <div class="mt-4" v-if="setting.key === 'inventory_safety_net_sync' && setting.is_active">
                    <InputText placeholder="Enter quantity" v-model="safetyNetQuantity" class="w-75" />
                    <p class="font-normal text-sm m-0 mt-2">Quantity entered will be removed from stock made available to connected Destination stores.</p>
                    <p class="font-normal text-sm m-0">Changes usually take effect within 24 hours.</p>
                  </div>
                </p>
                <div v-if="setting.key === 'inventory_safety_net_sync'" class="mt-3 mb-0 text-lg">
                  <p>
                    Note: Synced Stock Buffer will only apply to Shopify connections.
                  </p>
                  <p>
                    Set a quantity of stock that you want to reserve for your own store. The synced stock buffer quantity
                    will not be made available to connected Destination stores.
                  </p>
                  <p>
                    This helps prevent oversell and ensures you have enough stock to sell through your own store.
                  </p>
                  <p>
                    For example, if you have a product with 100 qty in your store and you apply a synced stock buffer of
                    5, then connected Destination stores will see 95 units available.
                  </p>
                  <p>
                    Saving any changes to this setting will trigger a full re-sync of synced products.
                  </p>
                </div>
              </div>
              <div class="col-4 text-right">
                <InputSwitch @change="changeSwitchHandler(setting)" v-model="setting.is_active" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!----- Safety Net ----->
  <SyncedStockDialog v-if="isSyncedStockDialogVisible" />
</template>
