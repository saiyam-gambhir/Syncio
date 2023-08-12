<script setup>
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
});
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
        <p class="mb-3 mt-4 text-700 line-height-4 text-lg">{{ description }}</p>
      </div>

      <div class="px-4 py-3 text-right border-top-1 surface-border">
        <router-link :to="href">
          <Button label="Manage" outlined raised></Button>
        </router-link>
      </div>
    </div>
  </div>
</template>
