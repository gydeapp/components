<template>
  <tour-heading class="mb-[15px]"> Summary</tour-heading>

  <slot name="video"></slot>

  <p class="text-[13px] mt-[15px]">
    <slot name="advantages"></slot>
  </p>
</template>

<script setup>
import TourHeading from "./TourHeading.vue";
</script>

<script>
export default {
  name: "TourSummary",
};
</script>
