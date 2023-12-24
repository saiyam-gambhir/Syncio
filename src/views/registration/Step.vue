<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  subTitle: {
    type: String,
    required: true,
  },

  isComplete: {
    type: Boolean,
    default: false,
  },

  isCurrent: {
    type: Boolean,
    default: false,
  },

  isLast: {
    type: Boolean,
    default: false,
  }
});
</script>

<template>
  <li class="relative mr-0 flex-auto" :class="{ 'mr-8' : !isLast }">
    <div class="border-round p-3 flex flex-row align-items-center z-1" :class="{ 'surface-50' : isCurrent, 'bg-green-200' : isComplete, 'surface-400' : !isCurrent }">
      <i class="pi pi-circle text-600 text-2xl mb-0 mr-3" :class="{ 'pi-check-circle text-green-900' : isComplete }"></i>
        <div>
          <div class="text-900 font-semibold mb-1">{{ title }}</div>
          <span class="text-700 font-semibold text-sm block">{{ subTitle }}</span>
        </div>
      </div>
    <div v-if="!isLast" class="w-full absolute top-50 left-100 surface-300 block" style="transform: translateY(-50%); height: 2px"></div>
  </li>
</template>
