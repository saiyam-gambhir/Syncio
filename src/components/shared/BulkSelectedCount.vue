<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: [],
  },
  itemType: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <transition name="fade">
    <section v-if="items.length > 0" :class="{ 'slide-down': items.length > 0 }" class="bluk-selection-widget flex align-items-center">
      <h3 class="m-0 mr-4">
        {{ items.length }}
        {{ items.length <= 1 ? itemType : `${itemType}s` }} selected
      </h3>
      <slot></slot>
      <slot name="clear"></slot>
    </section>
  </transition>
</template>
