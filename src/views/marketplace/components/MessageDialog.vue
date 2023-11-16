<script setup>
import { useMarketPlaceStore } from 'marketPlace';

/* ----- Data ----- */
const {
  isMessageDialogVisible,
  message,
  selectedProfile,
  sendMessage,
} = toRefs(useMarketPlaceStore());

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isMessageDialogVisible.value = false;
};
</script>

<template>
  <DialogWrapper :isVisible="isMessageDialogVisible" width="506px" @closeDialog="closeDialogHandler" withoutTitle>
    <template #body>
      <section class="grid flex-column align-items-center mt-1 px-3">
        <IconSendMessage />
        <h3 class="mt-5">
          Invite {{ selectedProfile?.brand_name }} to connect
        </h3>
        <ol class="pl-4 pb-3">
          <li class="mt-2 line-height-3">Add your message below. Include relevant information like why you want to work together and your preferred contact method.</li>
          <li class="mt-2 line-height-3">We'll send your Invitation and store details via email and CC you</li>
          <li class="mt-2 line-height-3">Get to know each other and agree to terms</li>
        </ol>
        <Textarea
          :pt="{ root: { rows: 6 } }"
          class="w-full" autoResize
          placeholder="Type your message..."
          v-model="message">
        </Textarea>
      </section>
      <p class="text-light text-sm mt-1 mb-0">By sending, you consent to this store contacting you directly.</p>
    </template>

    <template #footer>
      <div class="flex justify-content-between">
        <Button label="Cancel" class="p-button-secondary" @click="closeDialogHandler"></Button>
        <Button :disabled="!message" @click="sendMessage({ message, target_store_id: selectedProfile.store_id })" label="Send message" class="m-0"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
