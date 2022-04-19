<template>
  <component
    :is="tag"
    class="select-none flex items-center justify-center leading-3 text-sm font-bold opacity-100 outline-none transition-opacity duration-300 ease-in-out focus-visible:outline-none disabled:opacity-40 sm:hover:opacity-60"
    :class="classes"
    v-bind="attrs"
    v-on="events"
  >
    <app-spinner
      v-if="isLoading"
      class="mx-auto"
      :light="spinnerLight"
    ></app-spinner>

    <slot v-else></slot>
  </component>
</template>

<script setup>
import { computed, useAttrs } from 'vue'
import { AppSpinner } from '../components'

const defaultAttrs = useAttrs()

const props = defineProps({
  backgroundColor: {
    type: String,
    default: 'black',
    validator: function (value) {
      return ['black', 'green', 'gray', 'white', 'transparent'].includes(value)
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
  rounded: {
    type: String,
    default: null,
    validator: function (value) {
      return ['small', 'medium', 'full'].includes(value)
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
  icon: {
    type: Boolean,
    default: false
  },
  href: {
    type: String,
    default: null
  },
  to: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['click'])

const tag = computed(() => {
  if (props.to) {
    return 'router-link'
  }

  if (props.href) {
    return 'a'
  }

  return 'button'
})

const attrs = computed(() => {
  const currAttrs = { ...defaultAttrs }

  if (props.to) {
    currAttrs.to = props.to
  }

  if (props.href) {
    currAttrs.href = props.href
  }

  return currAttrs
})

const events = computed(() => {
  const currEvents = {}

  if (tag.value === 'button') {
    currEvents.click = handleClick
  }

  return currEvents
})

const classes = computed(() => {
  return {
    [color.value]: true,
    [width.value]: true,
    [height.value]: true,
    [rounded.value]: true,
    [border.value]: props.outlined,
    [background.value]: !(props.text || props.outlined)
  }
})

const width = computed(() => {
  if (props.icon) {
    return {
      small: 'w-[40px]',
      medium: 'w-[44px]',
      large: 'w-[48px]'
    }[props.size]
  }

  return props.block ? 'w-full' : 'w-[200px]'
})

const height = computed(() => {
  return {
    small: 'h-[40px]',
    medium: 'h-[44px]',
    large: 'h-[48px]'
  }[props.size]
})

const rounded = computed(() => {
  if (props.rounded) {
    return {
      small: 'rounded-xl',
      medium: 'rounded-[15px]',
      full: 'rounded-full'
    }[props.rounded]
  }

  return {
    small: 'rounded-xl',
    medium: 'rounded-[15px]',
    large: 'rounded-[15px]'
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
    white: 'bg-white',
    transparent: 'bg-transparent'
  }[props.backgroundColor]
})

const border = computed(() => {
  return `border ${props.borderColor}`
})

const spinnerLight = computed(() => {
  return props.outlined
})

function handleClick($event) {
  if (props.isLoading) {
    return
  }

  emit('click', $event)
}
</script>

<script>
export default {
  name: 'AppButton'
}
</script>
