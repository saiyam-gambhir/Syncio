<script setup>
const props = defineProps({
  content: {
    type: String,
    required: false
  },

  title: {
    type: String,
    required: false
  },
});
</script>

<template>
  <div class="text-center">
    <h1 class="text-4xl line-height-3 m-0 font-semibold" v-html="title" style="letter-spacing: 1.5px;"></h1>
    <p class="font-semibold text-2xl line-height-3 mt-1 mb-6" v-html="content"></p>
  </div>
</template>
