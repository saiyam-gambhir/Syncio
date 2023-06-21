<script setup>
const props = defineProps({
  href: {
    type: String,
    default: '/',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  iconClass: {
    type: String,
    default: 'pi-th-large',
  },
  linkText: {
    type: String,
    required: true,
  },
  isLocationPending: {
    type: Boolean,
    required: false,
  },
});
</script>

<template>
  <router-link :to="href"
    class="flex align-items-center justify-content-between cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors no-underline"
    :class="{ error: isLocationPending, disabled: disabled }"
    v-tooltip.top="isLocationPending ? 'Missing store location' : ''">
    <div>
      <i class="pi mr-3" :class="iconClass"></i>
      <span>{{ linkText }}</span>
    </div>
    <i v-if="isLocationPending" class="pi pi-info-circle pending-icon"></i>
    <i v-if="disabled" class="pi pi-lock pending-icon-reverse"></i>
  </router-link>
</template>
