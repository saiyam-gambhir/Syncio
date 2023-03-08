<script setup>
import Loading from '@/Loading.vue'
</script>

<template>
  <component :is="$route.meta.layout ?? Loading"></component>
</template>
