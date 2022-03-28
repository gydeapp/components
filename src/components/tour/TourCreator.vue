<template>
  <div class="mt-[15px] flex items-center">
    <div class="mr-5 h-[70px] w-[70px] overflow-hidden rounded-full">
      <img
        class="h-full w-full object-cover"
        :src="avatar"
        alt="Creator avatar"
      />
    </div>

    <div>
      <p class="text-base font-bold">{{ fullName }}</p>
      <p class="text-sm text-gray">Creator ©</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import ImageNoAvatar from '../../assets/img/no-avatar.png'

const props = defineProps({
  creator: {
    type: Object,
    required: true
  }
})

const fullName = computed(() => {
  return `${props.creator.firstName} ${props.creator.lastName}`
})

const avatar = computed(() => {
  if (props.creator.avatar) {
    return props.creator.avatar
  } else {
    return ImageNoAvatar
  }
})
</script>

<script>
export default {
  name: 'TourCreator'
}
</script>
