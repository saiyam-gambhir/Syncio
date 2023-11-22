<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  destinationVariantSettings,
  settingsUpdated,
  stringifyDestinationVariantSettings,
} = toRefs(useProductSettingsStore());

const {
  addons,
} = toRefs(usePlanStore());

/* ----- Watcher ----- */
watch(destinationVariantSettings, (newSettings, oldSettings) => {
  settingsUpdated.value = stringifyDestinationVariantSettings.value !== JSON.stringify(newSettings);
},{ deep: true });
</script>

<template>
  <p v-if="!addons.isSettingsModulePaid" class="m-0 mb-2 text-lg">Locked settings (<i class="pi pi-lock" style="font-size: 1rem; font-weight: bold;"></i>) are available with Product Settings PRO - <router-link :to="routes.PLAN_AND_BILLINGS" class="btn-link text-lg">Upgrade</router-link> </p>
  <div class="grid">
    <div class="col-5">
      <ul class="list-none p-0 m-0">
        <li class="py-5 border-bottom-1 surface-border">
          <h3 class="m-0 text-xl">Ongoing sync</h3>
          <p class="mt-2 mb-0 text-lg">Syncs in real time on an ongoing basis</p>
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
            <InputSwitch v-if="addons.isSettingsModulePaid || setting.key === 'auto_remove_product_variant'" v-model="setting.is_active" />
            <i v-else class="pi pi-lock" style="font-size: 1.5rem"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
