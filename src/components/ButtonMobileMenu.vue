<template>
  <button
    class="flex h-10 w-10 items-center justify-center outline-none focus-visible:outline-none"
    @click="handleClick"
  >
    <svg
      width="23"
      height="15"
      viewBox="0 0 23 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0H22.5V2.5H0V0ZM0 6.25H22.5V8.75H0V6.25ZM0 12.5H22.5V15H0V12.5Z"
        fill="#242323"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'ButtonMobileMenuClose',

  emits: ['click'],

  methods: {
    handleClick($event) {
      this.$emit('click', $event)
    }
  }
}
</script>
