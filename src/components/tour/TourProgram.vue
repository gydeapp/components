<template>
  <div v-for="(item, index) in program" :key="index">
    <tour-program-image
      :day="index + 1"
      :title="item.title"
      :image="item.images[0]"
      :tour-type="tourType"
    ></tour-program-image>

    <div class="mt-4 px-[15px]">
      <p class="mb-6 text-sm leading-5">
        {{ item.description }}
      </p>

      <div v-for="(routeItem, routeindex) in item.route" :key="routeindex">
        <tour-program-route :route="routeItem"> </tour-program-route>

        <tour-program-route
          v-for="(altRouteItem, altRouteindex) in routeItem.alternatives"
          :key="altRouteindex"
          :route="altRouteItem"
        >
        </tour-program-route>
      </div>
    </div>
  </div>
</template>

<script setup>
import TourProgramImage from "./TourProgramImage.vue";
import TourProgramRoute from "./TourProgramRoute.vue";

defineProps({
  mainImage: {
    type: Object,
    required: true,
  },
  program: {
    type: Array,
    required: true,
  },
  tourType: {
    type: String,
    required: true,
  },
});
</script>

<script>
export default {
  name: "TourProgram",
};
</script>
