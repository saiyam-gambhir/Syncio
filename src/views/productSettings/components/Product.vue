<script setup>
import { useProductSettingsStore } from '@/stores/productSettings'

/* ===== DATA ===== */
const productSettings = useProductSettingsStore()
</script>

<template>
  <ul class="list-none p-0 m-0">
    <li class="border-bottom-1 surface-border" v-for="setting in productSettings.destinationProductSettings" :key="setting.key">
      <div class="surface-0 p-2 pb-0">
        {{ setting.label }}
        <p class="mb-0" v-html="setting.description"></p>
      </div>
    </li>
  </ul>
</template>