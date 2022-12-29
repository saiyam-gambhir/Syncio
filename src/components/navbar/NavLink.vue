<script setup>
const props = defineProps({
  href: {
    type: String,
    default: '/'
  },
  iconClass: {
    type: String,
    default: 'pi-th-large'
  },
  linkText: {
    type: String,
    required: true
  }
})
</script>

<template>
  <router-link :to="href" v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple no-underline">
    <i class="pi mr-3" :class="iconClass"></i>
    <span>{{ linkText }}</span>
  </router-link>
</template>