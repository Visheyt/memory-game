import router from '@/router'
import { useGameStore } from '@/store/game'
import type { Mode } from '@/store/game/types'

export const useStartGame = () => {
  const store = useGameStore()

  const startGame = (mode: Mode) => {
    store.setMode(mode)
    store.startGame()
    router.push('/game')
  }

  return startGame
}
