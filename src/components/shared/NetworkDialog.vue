<script setup>
/* ----- Data ----- */
const auth = useAuthStore();

/* ----- Props ----- */
const props = defineProps({
  online: {
    type: Boolean,
    required: true,
  },
});

/* ----- Methods ----- */
const closeDialogHandler = () => {
  auth.isNetworkDialogVisible = false;
};
</script>

<template>
  <DialogWrapper :isVisible="!online && auth.isNetworkDialogVisible" title="OOPS!" width="600px" @closeDialog="closeDialogHandler" :showFooter="false">
    <template #body>
      <div class="text-center">
        <i class="pi pi-exclamation-triangle text-primary text-6xl mb-4" style="color: #d9342b !important"></i>
        <h1 class="text-primary mt-2">You are not connected to the internet</h1>
      </div>
    </template>
  </DialogWrapper>
</template>
