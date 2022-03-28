<template>
  <p class="flex items-center text-sm">
    <svg
      class="mr-2 inline align-middle"
      width="12"
      height="15"
      viewBox="0 0 12 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 6C12 9.31371 6 15 6 15C6 15 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
        fill="#242323"
      />
    </svg>

    {{ regionName }}
  </p>
</template>

<script setup>
import { computed } from 'vue'
import { useRootStore } from '../../stores/root'

const rootStore = useRootStore()

const props = defineProps({
  regionId: {
    type: Number,
    required: true
  }
})

const regionName = computed(() => {
  const place = rootStore.regionsPlaces.find(
    place => place.id === props.regionId
  )

  return place.name || 'Not added'
})
</script>

<script>
export default {
  name: 'TourRegion'
}
</script>
