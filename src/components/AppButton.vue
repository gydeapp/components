<template>
  <button
    type="button"
    class="select-none text-sm font-bold opacity-100 outline-none transition-opacity duration-300 ease-in-out focus-visible:outline-none disabled:opacity-40 sm:hover:opacity-60"
    :class="classes"
    :disabled="disabled"
    @click="handleClick"
  >
    <app-spinner
      v-if="isLoading"
      class="mx-auto"
      :light="spinnerLight"
    ></app-spinner>

    <slot v-else></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

import { AppSpinner } from '@gydeapp/components'

const props = defineProps({
  backgroundColor: {
    type: String,
    default: 'black',
    validator: function (value) {
      return ['black', 'green', 'gray', 'white'].includes(value)
    }
  },
  borderColor: {
    type: String,
    default: 'border-[#DADADA]'
  },
  color: {
    type: String,
    default: 'white',
    validator: function (value) {
      return ['black', 'green', 'gray', 'white', 'red'].includes(value)
    }
  },
  size: {
    type: String,
    default: 'large',
    validator: function (value) {
      return ['small', 'medium', 'large'].includes(value)
    }
  },
  text: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  outlined: {
    type: Boolean,
    default: false
  },
  mainBackground: {
    type: Boolean,
    default: false
  },
  mainColor: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const classes = computed(() => {
  return {
    'w-full': props.block,
    'w-[200px]': !props.block,
    [height.value]: true,
    [border.value]: props.outlined,
    [background.value]: !(props.text || props.outlined),
    [color.value]: true
  }
})

const height = computed(() => {
  return {
    small: 'h-[40px] rounded-[12px]',
    medium: 'h-[44px] rounded-[15px]',
    large: 'h-[48px] rounded-[15px]'
  }[props.size]
})

const color = computed(() => {
  if (props.mainColor) {
    return 'text-main'
  }

  if (props.mainBackground) {
    return 'text-white'
  }

  return {
    red: 'text-red',
    black: 'text-black',
    green: 'text-green',
    gray: 'text-gray',
    white: 'text-white'
  }[props.color]
})

const background = computed(() => {
  if (props.text || props.outlined) {
    return 'bg-transparent'
  }

  if (props.mainBackground) {
    return 'bg-main'
  }

  return {
    black: 'bg-black',
    green: 'bg-green',
    gray: 'bg-[#F0F0F0]',
    white: 'bg-white'
  }[props.backgroundColor]
})

const border = computed(() => {
  return `border ${props.borderColor}`
})

const spinnerLight = computed(() => {
  return props.outlined
})

function handleClick($event) {
  $event.target.focus()
  emit('click', $event)
}
</script>

<script>
export default {
  name: 'AppButton'
}
</script>
