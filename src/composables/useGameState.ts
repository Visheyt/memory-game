import type { GameService } from '@/services/game-service'
import type { Router } from 'vue-router'

export const useGameState = (gameService: GameService, router: Router) => {
  const state = gameService.getState()

  if (!state.isGameStarted) {
    router.push('/')
  }
  return state
}
