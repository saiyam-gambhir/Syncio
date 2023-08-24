<script setup>
import { toRefs } from 'vue';
import { useAuthStore } from '@/stores/auth';

/* ----- Components ----- */
import DialogWrapper from '@/components/shared/DialogWrapper.vue';

/* ----- Data ----- */
const { showLeavingPageDialog } = toRefs(useAuthStore());

/* ----- Emits ----- */
const emits = defineEmits(['leaveCurrentPage']);

/* ----- Methods ----- */
const closeDialogHandler = () => {
  showLeavingPageDialog.value = false;
};

const leaveCurrentPageHandler = () => {
  emits('leaveCurrentPage');
}
</script>

<template>
  <DialogWrapper :isVisible="showLeavingPageDialog" title="Unsaved changes" width="500px" @closeDialog="closeDialogHandler">
    <template #body>
      <p class="text-xl m-0 py-3" style="line-height: 2rem;">Leaving this page without saving changes may result in the loss of unsaved data.</p>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <Button label="Cancel" outlined class="mr-0" @click="closeDialogHandler"></Button>
        <Button label="Leave page" class="mr-0" @click="leaveCurrentPageHandler"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
