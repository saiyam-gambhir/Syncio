<script setup>
import { useAuthStore } from '@/stores/auth'

/* ----- Components ----- */
import DialogWrapper from '@/components/shared/DialogWrapper.vue'

/* ----- Data ----- */
const auth = useAuthStore()

/* ----- Props ----- */
const props = defineProps({
  level: {
    type: [Number, String],
    required: true
  }
})

/* ----- Methods ----- */
const closeDialogHandler = () => {
  auth.isBatteryLowDialogVisible = false
}
</script>

<template>
  <DialogWrapper :isVisible="auth.isBatteryLowDialogVisible" title="OOPS!" width="600px" @closeDialog="closeDialogHandler"
    :showFooter="false">
    <template #body>
      <div class="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" baseProfile="tiny" version="1.2"
          viewBox="0 0 24 24" class="mb-2">
          <path fill="#d9342b"
            d="M6 16a1 1 0 0 1-1-1v-4a1 1 0 1 1 2 0v4a1 1 0 0 1-1 1zm13-6c0-1.654-1.346-3-3-3H5c-1.654 0-3 1.346-3 3v6c0 1.654 1.346 3 3 3h11c1.654 0 3-1.346 3-3a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm-2 6c0 .552-.449 1-1 1H5c-.551 0-1-.448-1-1v-6c0-.552.449-1 1-1h11c.551 0 1 .448 1 1v6z" />
        </svg>
        <h1 class="text-primary mt-2">Battery Low at {{ (level * 100).toFixed(0) }}%</h1>
        <p class="text-xl line-height-3 mb-6">Please connect your device to power supply <br> and continue using Syncio
        </p>
      </div>
    </template>
</DialogWrapper></template>
