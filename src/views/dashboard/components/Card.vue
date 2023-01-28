<script setup>
const props = defineProps({
  description: {
    type: String,
    required: false
  },
  icon: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div class="surface-card p-4 border-round border-1 surface-border">
    <i v-if="icon" :class="`pi pi-${icon} text-2xl font-semibold mb-3`"></i>
    <div v-if="title" class="text-xl font-semibold mb-2">{{ title }}</div>
    <p v-if="description" class="mt-0 mb-4">{{ description }}</p>
    <slot name="links"></slot>
	</div>
</template>
