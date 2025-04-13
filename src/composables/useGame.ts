import router from '@/router'
import { gameService } from '@/services/game-service'
import { useCards } from './useCards'
import { useGameState } from './useGameState'
import { useMismatchHandler } from './useMismatchHandler'

export const useGame = () => {
  const { cards, openCards } = useCards(gameService)
  useMismatchHandler(gameService, openCards)
  const state = useGameState(gameService, router)

  return {
    cards,
    openCards,
    state,
  }
}
