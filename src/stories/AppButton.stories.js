import { AppButton } from '../components'

export default {
  title: 'UI/Button',
  component: AppButton,
  parameters: {
    docs: {
      description: {
        component: ''
      },
      source: {
        code: '<app-button></app-button>',
        language: 'js',
        type: 'auto'
      }
    }
  },
  argTypes: {
    backgroundColor: {
      control: { type: 'select' },
      defaultValue: 'black',
      description: '12321123123123',
      options: ['black', 'green', 'gray', 'white']
    },
    color: {
      control: { type: 'select' },
      defaultValue: 'white',
      options: ['black', 'green', 'gray', 'white', 'red']
    },
    size: {
      control: { type: 'select' },
      defaultValue: 'large',
      options: ['small', 'medium', 'large']
    },
    borderColor: {
      defaultValue: 'border-[#DADADA]',
      control: { type: 'text' }
    },
    defaultSlot: {
      defaultValue: 'Submit'
    },
    isLoading: {
      defaultValue: false
    },
    block: {
      defaultValue: false
    },
    text: {
      defaultValue: false
    },
    outlined: {
      defaultValue: false
    },
    mainBackground: {
      defaultValue: false
    },
    mainColor: {
      defaultValue: false
    },
    disabled: {
      defaultValue: false
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
  template: '<app-button v-bind="args">{{ args.defaultSlot }}</app-button>'
})
