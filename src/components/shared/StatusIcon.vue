<script setup>
const props = defineProps({
  fill: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <i
    class="pi"
    :class="fill ? 'pi-circle-fill' : 'pi-circle'"
    style="font-size: .5rem; margin-right: .33rem;">
  </i>
</template>
