<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },

  showFooter: {
    type: Boolean,
    default: false,
  },

  title: {
    type: String,
    default: '',
  },

  width: {
    type: String,
    default: '600px',
  }
})

const emits = defineEmits(['closeDialog'])

const closeDialogHandler = () => {
  emits('closeDialog')
}
</script>

<template>
  <Dialog v-model:visible="isVisible" :modal="true" :style="{ width: width }" :dismissableMask="false" @after-hide="closeDialogHandler">
    <template #header>
      <h2 class="text-2xl m-0">{{ title }}</h2>
    </template>

    <slot name="body"></slot>

    <template #footer v-if="showFooter">
      <slot name="footer"></slot>
    </template>
  </Dialog>
</template>
