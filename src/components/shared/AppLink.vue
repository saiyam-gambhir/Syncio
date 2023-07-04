<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  strong: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <a :href="props.link" target="_blank" class="btn-link font-normal inline-block" :class="{ 'font-semibold': props.strong }">
    {{ props.label }}
    <i class="pi pi-external-link"></i>
  </a>
</template>
