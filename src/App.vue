<script setup>
/* ===== IMPORTS ===== */
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageNotFound from '@/PageNotFound.vue'

/* ===== DATA ===== */
const route = useRoute()
const router = useRouter()
const currentRoute = ref(null)

/* ===== MOUNTED ===== */
onMounted(async () => {
  await router.isReady()
  currentRoute.value = route.name
})
</script>

<template>
  <component :is="$route.meta.layout || PageNotFound"></component>
</template>
