import type { GameService } from '@/services/game-service'
import { watch } from 'vue'

export const useMismatchHandler = (
  gameService: GameService,
  openCards: Record<number, boolean>,
) => {
  const misMatchEvent = gameService.getMismatchEvent()

  watch(misMatchEvent, (value) => {
    if (value) {
      const { firstCardId, secondCardId } = value
      setTimeout(() => {
        openCards[firstCardId] = false
        openCards[secondCardId] = false
      }, 1000)
    }
  })
}
