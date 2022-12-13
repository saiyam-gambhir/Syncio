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
  <router-link :to="href" v-ripple class="no-underline flex align-items-center cursor-pointer p-3 text-primary hover:bg-primary-50 transition-duration-150 transition-colors p-ripple">
    <i class="pi mr-3" :class="iconClass"></i>
    <span>{{ linkText }}</span>
  </router-link>
</template>