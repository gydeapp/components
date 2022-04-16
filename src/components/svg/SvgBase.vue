<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :aria-labelledby="iconName"
    role="presentation"
  >
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g :fill="iconColor" :stroke="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'SvgBase',

  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: '18'
    },
    height: {
      type: [Number, String],
      default: '18'
    },
    iconColor: {
      type: String,
      default: '#000000'
    }
  }
}
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
}
</style>
