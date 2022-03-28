<template>
  <div v-if="types.length > 0" class="mt-[15px]">
    <div
      v-for="(type, index) in types"
      :key="index"
      class="mr-2 inline-block rounded-lg border border-black px-2 py-[5px] last:mr-0"
    >
      <span class="text-sm">
        {{ type }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  types: {
    type: Array,
    required: true
  }
})
</script>

<script>
export default {
  name: 'TourTypes'
}
</script>
