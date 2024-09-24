<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  isCreateProfileDialogVisible,
  selectedProfile,
} = toRefs(useMarketPlaceStore());

const {
  partnerStoreType,
} = toRefs(useConnectionsStore());

const router = useRouter();

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isCreateProfileDialogVisible.value = false;
};

const goToProfileSetupPage = async () => {
  await router.push({ name: routes.MARKETPLACE_SETTINGS });
  isCreateProfileDialogVisible.value = false;
};
</script>

<template>
  <DialogWrapper :isVisible="isCreateProfileDialogVisible" width="490px" @closeDialog="closeDialogHandler" withoutTitle>
    <template #body>
      <section class="grid flex-column mt-1 px-3">
        <h3>
          <span class="font-semi">Set up your profile to invite</span> <span class="font-semibold">{{ selectedProfile?.brand_name }}</span>
        </h3>
        <p class="mb-0">You found an awesome <span class="font-semibold">{{ partnerStoreType }}</span> to work with. Let's get you connected 🚀</p>
        <p class="mb-0 mt-4">Simply set up your own store profile so <span class="font-semibold">{{ selectedProfile?.brand_name }}</span> can see who the invite is coming from (3 minutes).</p>
        <p class="mb-0 mt-4">Once you've created your profile, return here and Invite them to connect.</p>
      </section>
    </template>

    <template #footer>
      <div class="flex justify-content-between">
        <Button label="Close" class="p-button-secondary" @click="closeDialogHandler"></Button>
        <Button label="Set up profile" class="mr-0" @click="goToProfileSetupPage"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
