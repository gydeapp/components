<template>
  <div class="flex h-[64px] items-center lg:mb-16 lg:h-[88px]">
    <div class="flex h-[50px] flex-1 items-center justify-between">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderContainer'
}
</script>
