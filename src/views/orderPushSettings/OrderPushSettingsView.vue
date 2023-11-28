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

/* ----- Before Route Leave ----- */
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
      <TabPanel>
        <template #header>
          <div class="flex align-items-center">
            Email Contact Method
            <i v-if="isPushOrderEmailSettingsChanged" class="pi pi-exclamation-triangle ml-3 text-xl" style="color: rgb(255, 137, 0);" v-tooltip.top="'Unsaved changes'"></i>
          </div>
        </template>
        <EmailContact v-if="activeTabIndex === 0" />
      </TabPanel>
      <TabPanel>
        <template #header>
          <div class="flex align-items-center">
            Shipping Rate Rules
            <i v-if="isPushOrderShippingRulesChanged" class="pi pi-exclamation-triangle ml-3 text-xl" style="color: rgb(255, 137, 0);" v-tooltip.top="'Unsaved changes'"></i>
          </div>
        </template>
        <ShippingRulesRates v-if="activeTabIndex === 1" />
      </TabPanel>
      <TabPanel>
        <template #header>
          <div class="flex align-items-center">
            Shipping Type Tags
            <i v-if="isPushOrderShippingTagsChanged" class="pi pi-exclamation-triangle ml-3 text-xl" style="color: rgb(255, 137, 0);" v-tooltip.top="'Unsaved changes'"></i>
          </div>
        </template>
        <ShippingTypeTags v-if="activeTabIndex === 2" />
      </TabPanel>
    </TabView>

    <LeavingPageDialog
      :isDialogVisible="(isPushOrderEmailSettingsChanged || isPushOrderShippingRulesChanged || isPushOrderShippingTagsChanged)"
      @leaveCurrentPage="leaveCurrentPageHandler">
    </LeavingPageDialog>
  </section>
</template>
