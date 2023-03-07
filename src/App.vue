<script setup>
import { ref, watch } from 'vue'
import { useOnline } from '@vueuse/core'

/* ===== COMPONENTS ===== */
import DialogWrapper from '@/components/shared/DialogWrapper.vue'

/* ===== DATA ===== */
const isNetworkDialogVisible = ref(false)
const online = useOnline()

watch(online, () => {
  if(!online.value) {
    isNetworkDialogVisible.value = true
  }
})

const closeDialogHandler = () => {
  isNetworkDialogVisible.value = false
}
</script>

<template>
  <component :is="$route.meta.layout"></component>
  <DialogWrapper :isVisible="!online && isNetworkDialogVisible" title="OOPS!" width="600px" @closeDialog="closeDialogHandler" :showFooter="false">
    <template #body>
      <div class="text-center">
        <i class="pi pi-exclamation-triangle text-primary text-6xl mb-4"></i>
        <h1 class="text-primary mt-2">You are not connected to the internet</h1>
        <p class="text-xl line-height-3">Reload to check your connection status <br> or check back after sometime.</p>
      </div>
    </template>
  </DialogWrapper>
</template>
