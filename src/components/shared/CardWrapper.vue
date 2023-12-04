<script setup>
/* ----- Props ----- */
const props = defineProps({
  description: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div class="border-round shadow-2 surface-0 p-4">
    <div v-if="title" class="text-xl font-semibold mb-2">
      <i v-if="icon" :class="`pi pi-${icon} text-xl font-semibold mr-2`" style="transform: translateY(1px)"></i>
      {{ title }}
    </div>
    <p v-if="description" class="mt-0 mb-4">
      {{ description }}
    </p>
    <slot name="content"></slot>
  </div>
</template>
