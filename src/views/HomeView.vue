<template>
  <div class="flex items-center justify-center">
    <app-spinner></app-spinner>
  </div>
</template>

<script>
import { AppSpinner } from '../components'

export default {
  name: 'HomeView',

  components: {
    AppSpinner
  }
}
</script>
