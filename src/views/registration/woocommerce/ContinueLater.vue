<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  continueLater,
  loadingContinueLater,
  user,
} = toRefs(useAuthStore());

const isContinueLaterRequested = ref(false);
const router = useRouter();

/* ----- Methods ----- */
const goBackHandler = () => {
  router.go(-1);
};

const continueLaterHandler = async () => {
  await continueLater.value();
  isContinueLaterRequested.value = true;
  window.sessionStorage.clear();
};
</script>

<template>
  <section class="mx-auto" style="width: 700px; max-width: 100%;">
    <PageDetails title="Save account and sign out?" content="" v-if="!isContinueLaterRequested" />

    <aside class="auth-wrapper text-center text-900">
      <template v-if="!isContinueLaterRequested">
        <Button
          :loading="loadingContinueLater"
          @click="goBackHandler"
          class="w-100 p-button-lg mb-5"
          label="Continue with Syncio install">
        </Button>
        <Button
          @click="continueLaterHandler"
          :loading="loadingContinueLater"
          class="w-100 p-button-lg"
          label="Sign out and continue later"
          outlined>
        </Button>
      </template>

      <template v-else>
        <h1 class="text-2xl line-height-3 m-0">Account saved, we have sent an email containing <br> instructions to continue to:</h1>
        <h1 class="text-2xl line-height-3 m-0 mt-5"><Tag severity="info" :value="user?.email" style="font-size: 1.35rem !important;"></Tag></h1>
        <h1 class="text-2xl line-height-3 m-0 mt-5">See you again soon!</h1>
      </template>
    </aside>

    <div class="text-center" v-if="isContinueLaterRequested">
      <router-link :to="routes.LOGIN">
        <Button label="Already have an account? Login here" outlined raised class="p-button-lg outlined-button-hover w-75"></Button>
      </router-link>
    </div>
  </section>
</template>
