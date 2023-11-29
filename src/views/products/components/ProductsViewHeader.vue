<template>
  <!-- <div class="flex align-items-center justify-content-between">
    <div class="p-inputgroup w-35">
      <SearchFilter
        @update:modelValue="searchHandler"
        placeholder="Search by exact order number (eg: #1234)"
        v-model="filters.searchString">
      </SearchFilter>
    </div>

    <Dropdown
      :loading="loadingOrders"
      :options="sortOptions"
      @change="fetchOrdersHandler"
      optionLabel="label"
      placeholder="Sort by"
      optionValue="sortBy"
      v-model="filters.sortBy">
      <template #value>Sort by</template>
      <template #option="{ option }">
        <div class="flex align-items-center justify-content-between">
          {{ option.label }}
          <i :class="option.icon" class="ml-2"></i>
        </div>
      </template>
    </Dropdown>
  </div> -->
</template>
