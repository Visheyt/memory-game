import { ref } from 'vue'

export const useCardsSelection = () => {
  const pressedCardKey = ref<number | null>(null)
  const firstCardId = ref<number | null>(null)
  const secondCardId = ref<number | null>(null)

  const resetCardsId = () => {
    firstCardId.value = null
    secondCardId.value = null
    pressedCardKey.value = null
  }

  return {
    pressedCardKey,
    firstCardId,
    secondCardId,
    resetCardsId,
  }
}
