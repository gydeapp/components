import { TheAside } from '../components'

export default {
  title: 'ui/Aside',
  component: TheAside
}

export const Aside = args => ({
  components: { TheAside },

  setup() {



    return { isActiveAside: true }
  },

  template: '<the-aside v-model="isActiveAside"></the-aside>'
})

Aside.args = {
  light: false
}
