<script setup>
const props = defineProps({
  content: {
    type: String
  },
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <section class="border-round-md page-header">
    <h1 class="mb-0 text-4xl">{{ title }}</h1>
    <p v-if="content" class="mb-0 mt-2">{{ content }}</p>
  </section>
</template>
