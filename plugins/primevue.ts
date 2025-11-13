import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    unstyled: true,
    ripple: true,
    pt: {
      button: {
        root: ({ props, context }: any) => ({
          class: [
            'p-button',
            // Apply our custom classes based on props
            props.class,
            {
              'p-button-primary': props.severity === 'primary' || props.class?.includes('p-button-primary'),
              'p-button-secondary': props.severity === 'secondary' || props.class?.includes('p-button-secondary'),
              'p-button-outlined': props.outlined,
              'p-button-text': props.text,
            }
          ]
        })
      },
      inputtext: {
        root: ({ props }: any) => ({
          class: ['p-inputtext', props.class]
        })
      },
      textarea: {
        root: ({ props }: any) => ({
          class: ['p-textarea', props.class]
        })
      },
      select: {
        root: ({ props }: any) => ({
          class: ['p-select', props.class]
        }),
        overlay: {
          class: 'p-select-overlay'
        },
        option: ({ context }: any) => ({
          class: [
            'p-select-option',
            {
              'p-focus': context.focused,
              'p-select-option-selected': context.selected
            }
          ]
        }),
        label: ({ props }: any) => ({
          class: [
            'p-select-label',
            {
              'p-placeholder': !props.modelValue
            }
          ]
        })
      }
    }
  })
})
