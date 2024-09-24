<script setup>
const props = defineProps({
  blank: {
    type: Boolean,
    default: false
  },

  highlight: {
    type: Boolean,
    default: false
  },

  limit: {
    type: String,
  },

  planName: {
    type: String,
  },

  price: {
    type: String,
  },
})
</script>

<template>
  <li class="plan-section relative" :class="{ 'highlight-plan': highlight }">
    <span v-if="highlight" class="highlighted-text px-2 py-1 absolute">Start each month here</span>
    <div class="plan-section-container p-x-3 pt-3 pb-3">
      <h3 class="plan-name mb-2">{{ planName }}</h3>
      <p class="price m-0">{{ price }} <span style="color: #757575;" v-if="!blank">/month</span></p>
    </div>
    <div class="plan-section-container p-x-3" style="border-top: solid 1px #ddd;">
      <p class="limit hidden-details">Orders with synced products*</p>
      <p class="limit headings" v-if="blank">Orders with synced products*</p>
      <p class="limit">{{ limit }}</p>
    </div>
    <div class="plan-section-container p-x-3 pb-3 pt-3" style="border-top: solid 1px #ddd;">
      <p class="limit hidden-details">Additional benefits</p>
      <p class="benefits" v-if="highlight">-</p>
      <p class="limit headings" v-else-if="blank">Additional benefits</p>
      <ul class="benefits line-height-2 list-none p-0 m-0" v-else-if="!blank">
        <li>Early access to new features</li>
        <li>Priority access to Marketplace</li>
        <li>Priority customer support</li>
      </ul>
    </div>
  </li>
</template>

<style scoped lang="scss">
.hidden-details {
  display: none;
}

.p-x-3 {
  padding-left: .75rem;
  padding-right: .75rem;
}

.headings {
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
}

.plan-section {
  border: 1px solid transparent;

  + .plan-section {
    margin-left: -2px;
  }
}

.plan-name {
  font-size: 14px;
  min-height: 22px;
}

.highlight-plan {
  background: #F3F6FC;
  border-top-right-radius: 4px;
  border-color:#183462;

  .plan-name {
    font-size: 16px;
  }
}

.price {
  font-size: 15px;
  font-weight: 500;
  min-height: 22px;

  span {
    font-size: 11px;
    font-weight: 400;
  }
}

.limit {
  font-size: 11px;
}

.benefits {
  font-size: 10px;
}

.highlighted-text {
  background: #183462;
  color: #fff;
  font-size: 8px;
  left: -1px;
  top: -17px;
  font-weight: 500;
}

@media screen and (max-width: 1023px) {
  .plan-name {
    min-height: 26px;
  }
}

@media screen and (max-width: 850px) {
  .first {
    display: none;
  }

  .flex.plans {
    display: block !important;
  }

  .plan-name {
    margin-bottom: 0 !important;
  }

  .plan-section {
    border: 1px solid transparent;
    border-radius: 6px;

    &.highlight {
      border-top-left-radius: 0;
      border-color: #183462 !important;
    }

    + .plan-section {
      margin-left: 0;
      margin-top: 1.5rem;
      border-color: #ddd;
    }
  }

  .highlighted-text {
    font-size: 10px;
    top: -19px;
  }

  .login-screen #plan-approval p.price {
    font-size: 1.05rem !important;
  }

  .login-screen #plan-approval .plan-section-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .hidden-details {
      display: block;
      font-size: 10px !important;
    }

    h3 {
      font-size: 1.25rem !important;
    }
  }

  .benefits {
    text-align: right;
  }
}
</style>
