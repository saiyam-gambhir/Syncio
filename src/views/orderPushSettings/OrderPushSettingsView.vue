<script setup>
/* ----- Components ----- */
const EmailContact = defineAsyncComponent(() => import('./components/EmailContact.vue'));
const LeavingPageDialog = defineAsyncComponent(() => import('@/components/shared/LeavingPageDialog.vue'));
const ShippingRulesRates = defineAsyncComponent(() => import('./components/ShippingRulesRates.vue'));
const ShippingTypeTags = defineAsyncComponent(() => import('./components/ShippingTypeTags.vue'));

/* ----- Data ----- */
const {
  activeTabIndex,
  fetchPushSettings,
  isPushOrderEmailSettingsChanged,
  isPushOrderShippingRulesChanged,
  isPushOrderShippingTagsChanged,
  pushOrderEmailSettings,
  pushOrderShippingRules,
  pushOrderShippingTags,
  selectedEmailContact,
  shippingTags,
  stringifyPushOrderEmailSettings,
  stringifyPushOrderShippingRules,
  stringifyPushOrderShippingTags,
} = toRefs(useOrdersStore());

const {
  showLeavingPageDialog
} = toRefs(useAuthStore());

const forceLeavingPage = ref(false);
const router = useRouter();;
const routeTo = ref(null)

/* ----- Mounted ----- */
onMounted(async () => {
  await fetchPushSettings.value();
  selectedEmailContact.value = pushOrderEmailSettings.value?.value;
});

onBeforeRouteLeave((to, from, next) => {
  if((isPushOrderEmailSettingsChanged.value || isPushOrderShippingRulesChanged.value || isPushOrderShippingTagsChanged.value) && !forceLeavingPage.value) {
    showLeavingPageDialog.value = true;
    routeTo.value = to;
    next(false);
  } else {
    next();
  }
});

/* ----- Methods ----- */
const handleTabChange = async index => {
  activeTabIndex.value = index;
};

const leaveCurrentPageHandler = () => {
  if (routeTo.value) {
    forceLeavingPage.value = true;
    router.push(routeTo.value);
    showLeavingPageDialog.value = false;

    pushOrderEmailSettings.value = JSON.parse(stringifyPushOrderEmailSettings.value);
    pushOrderShippingRules.value = JSON.parse(stringifyPushOrderShippingRules.value);
    pushOrderShippingTags.value = JSON.parse(stringifyPushOrderShippingTags.value);
    shippingTags.value = JSON.parse(stringifyPushOrderShippingTags.value);
  }
};
</script>

<template>
  <PageHeader content="Manage order push settings" title="Order Push Settings" />

  <section class="mt-4">
    <TabView v-model:activeIndex="activeTabIndex" @update:activeIndex="handleTabChange" class="mt-4 margin-bottom">
      <TabPanel header="E-mail contact method">
        <EmailContact v-if="activeTabIndex === 0" />
      </TabPanel>
      <TabPanel header="Shipping rules rates">
        <ShippingRulesRates v-if="activeTabIndex === 1" />
      </TabPanel>
      <TabPanel header="Shipping type tags">
        <ShippingTypeTags v-if="activeTabIndex === 2" />
      </TabPanel>
    </TabView>

    <LeavingPageDialog
      :isDialogVisible="(isPushOrderEmailSettingsChanged || isPushOrderShippingRulesChanged || isPushOrderShippingTagsChanged)"
      @leaveCurrentPage="leaveCurrentPageHandler">
    </LeavingPageDialog>
  </section>
</template>
