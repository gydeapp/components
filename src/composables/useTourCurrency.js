import { computed } from 'vue'
import { useRootStore } from '@gydeapp/shared/stores/root'
import { CURRENCY_SYMBOL } from '@gydeapp/shared/constants'

export function useTourCurrency(currencyId) {
  const rootStore = useRootStore()

  const currencies = computed(() => {
    return rootStore.currencies
  })

  const currency = computed(() => {
    if (currencyId) {
      const currency = currencies.value.find(curr => curr.id === currencyId)
      return CURRENCY_SYMBOL[currency.code]
    } else {
      return CURRENCY_SYMBOL['RUB']
    }
  })

  return {
    currency
  }
}
