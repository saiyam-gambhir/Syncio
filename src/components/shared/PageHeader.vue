<script setup>
const props = defineProps({
  content: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  withActions: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="flex align-items-end justify-content-between border-bottom-1 surface-border pb-4">
    <section class="border-round-md page-header">
      <h1 class="text-5xl mb-0 ">{{ title }}</h1>
      <p v-if="content" class="mb-0 mt-1">{{ content }}</p>
    </section>
    <section v-if="withActions" class="flex align-items-end justify-content-between">
      <slot name="actions"></slot>
    </section>
  </div>
</template>
