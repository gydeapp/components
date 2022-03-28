<template>
  <component
    :is="tag"
    type="button"
    class="font-base relative outline-none flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[15px] bg-[#f0f0f0] font-bold focus-visible:outline-none"
    @click="handleClick"
  >
    <span class="absolute left-[30px]">
      <slot name="icon"></slot>
    </span>

    <slot></slot>
  </component>
</template>

<script setup>
defineProps({
  tag: {
    type: String,
    default: "button",
    validator: function (value) {
      return ["button", "a"].includes(value);
    },
  },
});

const emit = defineEmits(["click"]);

function handleClick($event) {
  emit("click", $event);
}
</script>

<script>
export default {
  name: "TourSheetButton",
};
</script>
