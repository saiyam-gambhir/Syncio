<script setup>
import { toRefs } from 'vue';
import { useMarketPlaceStore } from '@/stores/marketPlace';

/* ----- Components ----- */
import DialogWrapper from '@/components/shared/DialogWrapper.vue';
import IconSendMessage from '@/icons/IconSendMessage.vue';

/* ----- Data ----- */
const { isMessageDialogVisible, message, selectedProfile } = toRefs(useMarketPlaceStore());

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isMessageDialogVisible.value = false;
};
</script>

<template>
  <DialogWrapper :isVisible="isMessageDialogVisible" width="506px" @closeDialog="closeDialogHandler" withoutTitle>
    <template #body>
      <section class="grid flex-column align-items-center text-center mt-1 px-3">
        <IconSendMessage />
        <h3 class="mt-5">
          Send a message to {{ selectedProfile?.brand_name }}
        </h3>
        <p class="mt-0 mb-4">
          We'll send your message via email with your profile information. You
          <br />
          may want to add a description of your business, why you want to <br />
          work with the other store and relevant contact details.
        </p>
        <Textarea
          :pt="{ root: { rows: 6 } }"
          class="w-full" autoResize
          placeholder="Type your message..."
          v-model="message">
        </Textarea>
      </section>
    </template>

    <template #footer>
      <Button label="Cancel" outlined @click="closeDialogHandler"></Button>
      <Button label="Send" class="m-0"></Button>
    </template>
  </DialogWrapper>
</template>
