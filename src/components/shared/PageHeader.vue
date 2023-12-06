<script setup>
/* ----- Props ----- */
const props = defineProps({
  content: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  withActions: {
    type: Boolean,
    default: false,
  },
  withLink: {
    type: Boolean,
    default: false,
  }
});
</script>

<template>
  <div class="flex align-items-end justify-content-between surface-border">
    <section class="flex">
      <div class="border-round-md page-header">
        <h1 class="text-5xl mb-0">{{ title }}</h1>
        <p v-if="content && !withLink" class="mb-0 mt-1" v-html="content"></p>
        <p v-if="withLink" class="mb-0 mt-1">
          <slot name="header"></slot>
        </p>
      </div>
    </section>
    <section v-if="withActions" class="flex align-items-end justify-content-between">
      <slot name="actions"></slot>
    </section>
  </div>
  <Divider/>
</template>
