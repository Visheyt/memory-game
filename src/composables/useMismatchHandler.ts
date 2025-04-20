import { ref, watch } from 'vue'

type MismatchEvent = { firstCardId: number; secondCardId: number } | null

export const useMismatchHandler = (openCards: Record<number, boolean>) => {
  const misMatchEvent = ref<MismatchEvent>(null)

  watch(misMatchEvent, (value) => {
    if (value) {
      const { firstCardId, secondCardId } = value
      setTimeout(() => {
        openCards[firstCardId] = false
        openCards[secondCardId] = false
      }, 1000)
    }
  })

  const resetMismatchHandler = () => {
    misMatchEvent.value = null
  }

  const setMismatchEventValue = (misMatchEventValue: MismatchEvent) => {
    misMatchEvent.value = misMatchEventValue
  }

  return { resetMismatchHandler, setMismatchEventValue }
}
