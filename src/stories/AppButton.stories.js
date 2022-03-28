import { AppButton } from '../components'

export default {
  title: 'UI/Button',
  component: AppButton,
  argTypes: {
    backgroundColor: {
      control: { type: 'select' },
      options: ['black', 'green', 'gray', 'white']
    },
    color: {
      control: { type: 'select' },
      options: ['black', 'green', 'gray', 'white', 'red']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    borderColor: {
      defaultValue: 'border-[#DADADA]',
      control: { type: 'string' },
      options: ['small', 'medium', 'large']
    }
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
export const Button = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { AppButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<app-button v-bind="args">{{ args.default }}</app-button>'
})

Button.args = {
  default: 'Submit'
}
