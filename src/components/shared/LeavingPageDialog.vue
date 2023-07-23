<script setup>
import { toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

/* ----- Components ----- */
import DialogWrapper from '@/components/shared/DialogWrapper.vue';

/* ----- Data ----- */
const { showLeavingPageDialog } = toRefs(useAuthStore());
const route = useRoute();
const router = useRouter();

/* ----- Methods ----- */
const closeDialogHandler = () => {
  showLeavingPageDialog.value = false;
}

const leavePageHandler = () => {
  debugger
}
</script>

<template>
  <DialogWrapper :isVisible="showLeavingPageDialog" title="Unsaved Changes" width="500px" @closeDialog="closeDialogHandler">
    <template #body>
      <p class="text-xl m-0 py-3" style="line-height: 2rem;">Leaving this page without saving any changes may result in the loss of unsaved data.</p>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <Button label="Cancel" outlined class="mr-0" @click="closeDialogHandler"></Button>
        <Button label="Leave page" class="mr-0" @click="leavePageHandler"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
