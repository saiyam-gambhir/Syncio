<script setup>
const props = defineProps({
  description: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="surface-card p-4 shadow-2 border-round">
    <div class="text-xl font-semibold mb-2">{{ title }}</div>
    <p class="mt-0 mb-4" v-if="description">{{ description }}</p>
    <slot name="links"></slot>
	</div>
</template>
