<template>
  <div v-if="isActiveOverlay">
    <div
      :class="{
        ' fixed opacity-50': isVisible,
        'opacity-0': !isVisible
      }"
      class="inset-0 z-40 bg-black opacity-50 transition duration-200 ease-in-out lg:hidden"
      @click="closeAside"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const emit = defineEmits(['close'])

const props = defineProps({
  isActive: {
    type: Boolean,
    default: true,
    required: false
  }
})

const isVisible = ref(false)

const isActiveOverlay = computed(() => props.isActive)

watch(isActiveOverlay, val => {
  setTimeout(() => {
    isVisible.value = val
  }, 10)
})

function closeAside() {
  emit('close')
}
</script>

<script>
export default {
  name: 'TheAsideOverlay'
}
</script>
