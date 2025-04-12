import { GameService } from '@/services/game-service'
import { onMounted, reactive } from 'vue'

export const useCards = (gameService: GameService) => {
  const cards = gameService.getCards()
  const openCards = reactive<Record<number, boolean>>({})

  cards.forEach((card) => {
    openCards[card.id] = true
  })

  onMounted(() => {
    setTimeout(() => {
      cards.forEach((card) => {
        openCards[card.id] = false
      })
    }, 2000)
  })
  return {
    cards,
    openCards,
  }
}
