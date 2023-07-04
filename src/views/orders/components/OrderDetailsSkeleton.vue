<script setup>
/* ----- Components ----- */
import CardWrapper from '@/views/dashboard/components/CardWrapper.vue';
import IconShopify from '@/icons/IconShopify.vue';
</script>

<template>
  <div class="grid mt-4">
    <div class="col-7">
      <CardWrapper class="pb-3">
        <template #links>
          <h3 class="mb-2 flex align-items-center">
              <IconShopify class="mr-3" style="transform: translateY(-1px);" />
              My order details: <Skeleton width="50px" height="24px" class="ml-1"></Skeleton>
            </h3>
          <div class="mt-3">
            <div class="flex align-items-center mt-2 mb-5">
              <strong>Status:</strong>
              <Skeleton class="mx-2" width="50px" height="24px" borderRadius="20px"></Skeleton>
              <Skeleton width="75px" height="24px" borderRadius="20px"></Skeleton>
            </div>
            <Skeleton width="175px" height="16px"></Skeleton>
            <Skeleton width="225px" height="16px" class="mt-2"></Skeleton>
            <Skeleton width="215px" height="16px" class="mt-2"></Skeleton>
          </div>
          <!-- <AppLink
            strong
            :label="`Order ID: ${order.id}`"
            :link="`https://${storeName}/admin/orders/${order.id}`">
          </AppLink>
          <div class="mt-2">
            <strong>Order created on</strong> {{ formatDate(order.created_at).date }} at {{ formatDate(order.created_at).time }}
          </div>
          <div v-if="order.edited_at" class="mt-2">
            <strong>Order edited on</strong> {{ formatDate(order.edited_at).date }} at {{ formatDate(order.edited_at).time }}
          </div> -->
        </template>
      </CardWrapper>
    </div>
    <div class="col-5">
      <CardWrapper class="pb-3" title="Notes"></CardWrapper>
      <CardWrapper class="pb-3 mt-5" title="Additional Notes"></CardWrapper>
      <CardWrapper class="pb-3 mt-5" title="Tags">
        <template #links>
          <div class="flex flex-wrap align-items-center">
            <Skeleton class="mt-2" width="100px" height="29px" borderRadius="50px"></Skeleton>
            <Skeleton class="mt-2 ml-2" width="200px" height="29px" borderRadius="50px"></Skeleton>
            <Skeleton class="mt-2 ml-2" width="125px" height="29px" borderRadius="50px"></Skeleton>
          </div>
        </template>
      </CardWrapper>
    </div>
  </div>
</template>
