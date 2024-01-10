<script setup>
/* ----- Props ----- */
const props = defineProps({
  error: {
    required: true,
    type: String,
  }
});
</script>

<template>
  <span class="pb-3 pl-1 block text-error font-semibold" style="letter-spacing: .5px;" v-if="error">
    {{ error }}
  </span>
</template>
