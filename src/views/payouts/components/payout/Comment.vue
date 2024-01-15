<script setup>
/* ----- Data ----- */
const {
  addComment,
  loadingComment,
} = toRefs(usePayoutsStore())

const comment = ref(null);

/* ----- Props ----- */
const props = defineProps({
  payoutId: {
    type: Number,
    default: {},
  },
});

/* ----- Methods ----- */
const addCommentHandler = async () => {
  await addComment.value(comment.value, props?.payoutId);
  comment.value = null;
};
</script>

<template>
  <div class="grid mt-4">
    <div class="col-6">
      <div class="p-inputgroup block w-100">
        <InputText
          class="w-100"
          placeholder="Enter comments"
          style="height: 3.75rem; border-radius: 6px;"
          v-model="comment">
        </InputText>
        <p class="text-sm mt-2 mb-0 pl-1">Comments are visible to both stores</p>
      </div>
    </div>
    <div class="col-2">
      <Button
        :disabled="!comment"
        :loading="loadingComment"
        @click="addCommentHandler"
        class="w-100"
        label="Add comment"
        style="height: 3.75rem;">
      </Button>
    </div>
  </div>
</template>
