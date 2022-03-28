<template>
  <app-accordion :active-tab="0">
    <app-accordion-item
      v-for="(item, index) in faq"
      :key="index"
      chevron
      is-bordered
    >
      <template #accordion-trigger>
        <h3 class="ml-[15px] text-base font-bold leading-5">
          {{ item.question }}
        </h3>
      </template>

      <template #trigger-icon="{ visible }">
        <svg
          v-if="!visible"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 23C5.92482 23 0.999954 18.0751 0.999954 12C0.999954 5.92487 5.92482 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23Z"
            fill="#43E095"
          />
          <path d="M19 11H13V5H11V11H5V13H11V19H13V13H19V11Z" fill="white" />
        </svg>

        <svg
          v-else
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 23C5.92482 23 0.999954 18.0751 0.999954 12C0.999954 5.92487 5.92482 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23Z"
            fill="#43E095"
          />
          <rect x="5" y="11" width="14" height="2" fill="white" />
        </svg>
      </template>

      <template #accordion-content>
        <div class="px-[15px] py-[15px]">
          <div class="text-[13px] leading-[18px]">
            {{ item.answer }}
          </div>
        </div>
      </template>
    </app-accordion-item>
  </app-accordion>
</template>

<script>
import AppAccordion from '../AppAccordion.vue'
import AppAccordionItem from '../AppAccordionItem.vue'

export default {
  name: 'TourFaq',

  components: {
    AppAccordion,
    AppAccordionItem
  },

  props: {
    faq: {
      type: Array,
      required: true
    }
  }
}
</script>
