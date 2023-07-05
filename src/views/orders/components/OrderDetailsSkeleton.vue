<script setup>
/* ----- Components ----- */
import CardWrapper from '@/views/dashboard/components/CardWrapper.vue';
import IconShopify from '@/icons/IconShopify.vue';
</script>

<template>
  <div class="grid mt-4">
    <div class="col-8">
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
          </div>
        </template>
      </CardWrapper>

      <CardWrapper class="pb-3 mt-5">
        <template #links>
          <Skeleton width="200px" height="23px" class="mb-4"></Skeleton>

          <DataTable :value="[{}, {}, {}, {}]" responsiveLayout="scroll" showGridlines>
            <Column header="Image" style="width: 7.5%" class="text-center">
              <template #body="{}">
                <Skeleton width="50px" height="38px"></Skeleton>
              </template>
            </Column>
            <Column header="Title" style="width: 47.5%">
              <template #body="{}">
                <Skeleton width="175px" height="16px"></Skeleton>
                <Skeleton width="125px" height="16px" class="mt-2"></Skeleton>
              </template>
            </Column>
            <Column header="Price" style="width: 15%" class="text-right">
              <template #body="{}">
                <div class="flex justify-content-end">
                  <Skeleton width="50px" height="16px"></Skeleton>
                </div>
              </template>
            </Column>
            <Column header="Quantity" style="width: 12.5%" class="text-right">
              <template #body="{}">
                <div class="flex justify-content-end">
                  <Skeleton width="50px" height="16px"></Skeleton>
                </div>
              </template>
            </Column>
            <Column header="Total" style="width: 17.5%" class="text-right">
              <template #body="{}">
                <div class="flex justify-content-end">
                  <Skeleton width="60px" height="16px"></Skeleton>
                </div>
              </template>
            </Column>
          </DataTable>
        </template>
      </CardWrapper>
    </div>

    <div class="col-4">
      <CardWrapper class="pb-3" title="Notes">
        <template #links>
          <Skeleton width="300px" height="20px" class="mt-3"></Skeleton>
        </template>
      </CardWrapper>

      <CardWrapper class="pb-3 mt-5" title="Additional Notes">
        <template #links></template>
      </CardWrapper>

      <CardWrapper class="pb-3 mt-5" title="Tags">
        <template #links>
          <div class="flex flex-wrap align-items-center">
            <Skeleton class="mt-2" width="150px" height="29px" borderRadius="50px"></Skeleton>
            <Skeleton class="mt-2 ml-2" width="100px" height="29px" borderRadius="50px"></Skeleton>
          </div>
        </template>
      </CardWrapper>
    </div>
  </div>
</template>
