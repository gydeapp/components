<template>
  <div class="flex flex-col items-center justify-center font-gilroy">
    <app-spinner></app-spinner>

    <app-button size="small" class="mt-10" to="/" @click="test">
      <svg-icon-checked></svg-icon-checked>
    </app-button>
  </div>
</template>

<script>
import { AppSpinner, AppButton } from '../components'
import SvgIconChecked from '@/components/svg/SvgIconChecked.vue'

export default {
  name: 'HomeView',

  components: {
    AppSpinner,
    AppButton,
    SvgIconChecked
  },

  methods: {
    test(event) {
      console.log(event)
    }
  }
}
</script>
