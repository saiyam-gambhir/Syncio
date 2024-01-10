<script setup>
const props = defineProps({
  icon: {
    type: Boolean,
    default: true,
  },
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
    <i v-if="icon" class="pi pi-external-link"></i>
  </a>
</template>
