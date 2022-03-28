<template>
  <div class="relative">
    <div
      class="h-0 w-full bg-cover bg-center"
      style="padding-bottom: 59.5%"
      :style="`background-image: url(${image});`"
    ></div>

    <div
      class="tour-image-blackout absolute bottom-0 left-0 h-[85px] w-full px-[15px] py-[5px] text-white"
    >
      <p
        class="text-xs font-semibold uppercase tracking-[1px]"
        :class="[tourType === 'guide' ? 'opacity-0' : '']"
      >
        DAY {{ day }}
      </p>

      <hr
        class="mt-[10px] mb-[10px] w-[25px]"
        :class="[tourType === 'guide' ? 'opacity-0' : '']"
      />

      <p class="text-xl font-semibold leading-[25px]">
        {{ title }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TourProgramImage",

  props: {
    day: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    tourType: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.tour-image-blackout {
  background: linear-gradient(
    0deg,
    rgba(36, 35, 35, 0.5) 16.91%,
    rgba(36, 35, 35, 0) 98.97%
  );
}
</style>
