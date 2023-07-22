<script setup>
/* ----- Components ----- */
import CardWrapper from '@/views/dashboard/components/CardWrapper.vue';
import IconShopify from '@/icons/IconShopify.vue';
import LogoSmall from '@/icons/LogoSmall.vue';
</script>

<template>
  <div class="grid mt-4">
    <div class="col-12 md:col-12 lg:col-8">
      <CardWrapper class="pb-3">
        <template #links>
          <h3 class="mb-2 flex align-items-center">
            <LogoSmall style="width: 30px;transform: translateY(1px);" class="mr-2" /> Status: <Skeleton class="ml-2" width="100px" height="28.75px" borderRadius="20px"></Skeleton>
          </h3>
          <p class="mt-3 mb-0">Order contains synced products from <Skeleton class="inline-flex vertical-align-middle mx-1" width="25.5px" height="28.5px"></Skeleton> source store.</p>
          <Divider />
          <h3 class="flex align-items-center">
            <IconShopify class="mr-3" style="transform: translateY(-1px);" />
            Order details: <Skeleton width="75px" height="24px" class="ml-2"></Skeleton>
          </h3>
          <Divider />
          <div>
            <div class="flex align-items-center">
              <strong>Status:</strong>
              <Skeleton class="ml-3" width="50px" height="28.75px" borderRadius="20px"></Skeleton>
              <Skeleton class="ml-2" width="75px" height="28.75px" borderRadius="20px"></Skeleton>
            </div>
            <Divider />
            <Skeleton width="175px" height="16px"></Skeleton>
            <Divider />
            <Skeleton width="225px" height="16px"></Skeleton>
            <Divider />
          </div>
        </template>
      </CardWrapper>

      <CardWrapper class="pb-3 mt-5">
        <template #links>
          <div class="flex align-items-center justify-content-between">
            <Skeleton width="200px" height="23px" class="mb-4"></Skeleton>
            <Skeleton width="100px" height="23px" class="mb-4"></Skeleton>
          </div>

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

    <div class="col-12 md:col-12 lg:col-4">
      <CardWrapper class="pb-3" title="Notes">
        <template #links>
          <Skeleton width="300px" height="20px" class="mt-2"></Skeleton>
        </template>
      </CardWrapper>

      <CardWrapper class="pb-3 mt-5" title="Additional Notes">
        <template #links>
          <div>
            <Divider />
            <Skeleton width="200px" height="15px"></Skeleton>
          </div>
          <div>
            <Divider />
            <Skeleton width="100px" height="15px"></Skeleton>
            <Skeleton width="150px" height="15px" class="mt-2"></Skeleton>
          </div>
          <div>
            <Divider />
            <Skeleton width="100px" height="15px"></Skeleton>
            <Skeleton width="50px" height="15px" class="mt-2"></Skeleton>
          </div>
          <div>
            <Divider />
            <Skeleton width="50px" height="15px"></Skeleton>
            <Skeleton width="100px" height="15px" class="mt-2"></Skeleton>
          </div>
        </template>
      </CardWrapper>

      <CardWrapper class="pb-3 mt-5">
        <template #links>
          <div>
            <div class="font-semibold text-lg uppercase">Customer</div>
            <Skeleton width="100px" height="15px" class="mt-2"></Skeleton>
          </div>
          <Divider />
          <div>
            <div class="font-semibold text-lg uppercase">Contact information</div>
            <Skeleton width="150px" height="15px" class="mt-2"></Skeleton>
          </div>
          <Divider />
          <div>
            <div class="font-semibold text-lg uppercase">Shipping address</div>
            <Skeleton width="100px" height="15px" class="mt-2"></Skeleton>
            <Skeleton width="110px" height="15px" class="mt-2"></Skeleton>
            <Skeleton width="80px" height="15px" class="mt-2"></Skeleton>
          </div>
        </template>
      </CardWrapper>

      <CardWrapper class="pb-3 mt-5" title="Tags">
        <template #links>
          <div class="flex flex-wrap align-items-center">
            <Skeleton class="mt-2" width="150px" height="32.25px" borderRadius="50px"></Skeleton>
            <Skeleton class="mt-2 ml-2" width="100px" height="32.25px" borderRadius="50px"></Skeleton>
          </div>
        </template>
      </CardWrapper>
    </div>
  </div>
</template>
