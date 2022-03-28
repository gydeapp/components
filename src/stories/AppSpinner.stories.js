import { AppSpinner } from '../components'

export default {
  title: 'ui/Spinner',
  component: AppSpinner
}

export const Spinner = args => ({
  components: { AppSpinner },

  setup() {
    return { light: args.light }
  },

  template: '<app-spinner :light="light"></app-spinner>'
})

Spinner.args = {
  light: false
}
