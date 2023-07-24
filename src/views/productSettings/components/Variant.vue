<script setup>
import { useProductSettingsStore } from '@/stores/productSettings';
import { toRefs, watch } from 'vue';

/* ----- Data ----- */
const { destinationVariantSettings, stringifyDestinationVariantSettings, settingsUpdated } = toRefs(useProductSettingsStore());

/* ----- Watcher ----- */
watch(destinationVariantSettings, (newSettings, oldSettings) => {
  settingsUpdated.value = stringifyDestinationVariantSettings.value !== JSON.stringify(newSettings);
},{ deep: true });
</script>

<template>
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
              <p class="mt-2 mb-0 text-lg" v-html="setting.description"></p>
            </div>
            <InputSwitch v-model="setting.is_active" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
