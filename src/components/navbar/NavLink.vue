<script setup>
const props = defineProps({
  href: {
    type: String,
    default: '/',
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
    default: false,
  },
});
</script>

<template>
  <router-link
    :class="{ error: isLocationPending }"
    :to="href"
    class="flex align-items-center justify-content-between cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors no-underline"
    v-tooltip.top="isLocationPending ? 'Missing store location' : ''">
    <div>
      <i class="pi mr-3" :class="iconClass"></i>
      <span>{{ linkText }}</span>
    </div>
    <i v-if="isLocationPending" class="pi pi-info-circle pending-icon text-2xl" style="color: red; transform: translateY(-.5px);"></i>
  </router-link>
</template>
