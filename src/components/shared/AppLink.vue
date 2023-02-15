<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
})
</script>

<template>
  <a :href="link" target="_blank" class="btn-link font-normal inline-block">
    {{ label }}
    <i class="pi pi-external-link"></i>
  </a>
</template>
