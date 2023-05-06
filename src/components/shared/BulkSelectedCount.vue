<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: []
  },
  itemType: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <section v-if="items.length > 0" class="flex align-items-center mt-4">
    <h3 class="m-0 mr-4">{{ items.length }} {{ items.length <= 1 ? itemType : `${itemType}s` }} selected</h3>
    <slot></slot>
  </section>
</template>
