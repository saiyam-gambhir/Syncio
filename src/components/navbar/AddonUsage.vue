<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  limitUsed: {
    type: [Number || String],
    required: true
  },
  limitAvailable: {
    type: [Number || String],
    required: true
  }
});

const percentageLimitUsed = computed(() => {
  let progress = ((props.limitUsed * 100) / props.limitAvailable);
  return progress > 100 ? '100%' : `${progress}%`;
});
</script>

<template>
  <aside class="mb-2">
    <template v-if="limitAvailable > -1">
      <h4 class="uppercase font-semibold text-sm m-0">{{ title }}</h4>
      <div class="progress-bar relative my-2 w-full">
        <div class="progress-bar-used absolute h-full" :style="{ 'width': percentageLimitUsed }"></div>
      </div>
      <div class="font-semibold text-right">{{ limitUsed }}/{{ limitAvailable }}</div>
    </template>
    <template v-else>
      <div class="addon-active"></div>
      <h4 class="uppercase font-semibold text-sm mt-4 mb-2">{{ title }}</h4>
      <div class="text-xl font-semibold mb-3">
        {{ limitUsed }}/<span class="text-lg font-normal">unlimited</span>
      </div>
    </template>
  </aside>
</template>

<style scoped>
.progress-bar {
  background: #FFD7D8;
  border-radius: var(--border-radius);
  height: .85rem;
  overflow-x: hidden;
}

.progress-bar-used {
  background: rgb(250, 117, 123);
  left: 0;
  top: 0;
}

.addon-active + .addon-active .text-xl {
  margin-bottom: 0 !important;
}
</style>
