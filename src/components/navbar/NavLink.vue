<script setup>
/* ----- Data ----- */
const {
  currentStore,
  isSourceStore,
} = toRefs(useConnectionsStore());

const props = defineProps({
  href: {
    type: String,
    default: '/',
  },
  iconClass: {
    type: String,
    required: true,
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
    class="flex align-items-center justify-content-between cursor-pointer px-3 border-round text-700 hover:surface-200 no-underline relative"
    v-tooltip.top="isLocationPending ? 'Missing store location' : ''"
    style="padding-top: .85rem; padding-bottom: .85rem;">
    <div>
      <i class="pi mr-3" :class="iconClass"></i>
      <span>{{ linkText }}</span>
    </div>
    <i v-if="isLocationPending" class="pi pi-info-circle pending-icon text-2xl" style="color: var(--primary); transform: translateY(-.5px);"></i>
    <Tag
      class="absolute"
      rounded
      style="right: 1rem; width: 2rem; height: 2rem;"
      v-if="+currentStore.payout_count > 0 && isSourceStore && href === '/payouts'">
        {{ currentStore.payout_count }}
    </Tag>
  </router-link>
</template>
