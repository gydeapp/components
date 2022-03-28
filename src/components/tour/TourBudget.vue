<template>
  <div class="mt-5 px-[15px]">
    <div
      v-for="(item, index) in whatIncluded"
      :key="index"
      class="flex items-center mb-3 last:mb-0"
    >
      <svg-icon-checked></svg-icon-checked>

      <p class="ml-[10px] text-sm font-medium leading-5">
        {{ item }}
      </p>
    </div>

    <div class="mt-[15px] flex items-center justify-between">
      <p class="text-base font-bold">
        {{ currencyvalue }} {{ currencySymbol }} /
        <span class="font-normal">
          {{ countNights }}
          {{ countNights === 1 ? "night" : "nights" }}
        </span>
      </p>

      <span class="text-right text-xs leading-[15px] text-gray">
        Average budget per person
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRootStore } from "../../stores/root";
import { delimiter } from "../../utils";
import { CURRENCY_SYMBOL } from "../../constants";
import SvgIconChecked from "../svg/SvgIconChecked.vue";

const rootStore = useRootStore();

const props = defineProps({
  budget: {
    type: Object,
    required: true,
  },
  whatIncluded: {
    type: Array,
    required: true,
  },
  countNights: {
    type: Number,
    required: true,
  },
});

const currencyvalue = computed(() => delimiter(props.budget.curr_value));
const currencySymbol = computed(() => {
  const { code } = rootStore.currencies.find((curr) => {
    return curr.id === props.budget.curr_id;
  });

  return CURRENCY_SYMBOL[code];
});
</script>

<script>
export default {
  name: "TourBudget",
};
</script>
