<script setup>
/* ----- Props ----- */
const props = defineProps({
  description: {
    type: String,
    required: true,
  },

  href: {
    type: String,
    required: false,
  },

  icon: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  isWoo: {
    type: Boolean,
    default: false
  }
});

/* ----- Data ----- */
const {
  wooPlanSelectionLink,
} = toRefs(usePlanStore());
</script>

<template>
  <div class="col-12 lg:col-4 p-3">
    <div class="border-round shadow-2 surface-0 mb-3 h-full flex-column justify-content-between flex position-relative">
      <div class="p-4">
        <div class="flex align-items-center">
          <span class="inline-flex border-circle surface-card border-1 align-items-center justify-content-center mr-3" style="width: 38px; height: 38px">
            <i class="pi text-xl" :class="icon"></i>
          </span>
          <span class="text-900 font-semibold text-2xl">{{ title }}</span>
        </div>
        <p class="mb-0 mt-4 text-700 line-height-4 text-lg">{{ description }}</p>
      </div>

      <div class="px-4 py-3 text-right border-top-1 surface-border">
        <router-link :to="href" v-if="!isWoo">
          <Button label="Manage" outlined></Button>
        </router-link>
        <a v-if="isWoo" href="https://billing.stripe.com/p/login/test_8wM01M04Y5y9blK4gg" class="p-button p-button-outlined font-semibold">Manage</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.p-button-outlined:hover {
  background: rgba(14,59,77,.04);
}
</style>
