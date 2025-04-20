import { useCards } from './useCards'
import { useMismatchHandler } from './useMismatchHandler'
import { useGameStore } from '@/store/game'
import { useCardsSelection } from './useCardsSelection'
import { useGameGuard } from './useGameGuard'

export const useGame = () => {
  const { cards, openCards, shuffleCards, close, open } = useCards()

  const { firstCardId, secondCardId, pressedCardKey, resetCardsId } = useCardsSelection()

  const { resetMismatchHandler, setMismatchEventValue } = useMismatchHandler(openCards)

  useGameGuard()

  const gameStore = useGameStore()

  const restartGame = () => {
    resetCardsId()
    resetMismatchHandler()

    gameStore.setMode(gameStore.mode)
    gameStore.reset()

    startGame()
  }

  const playGame = (key: number, id: number) => {
    if (!pressedCardKey.value) {
      pressedCardKey.value = key
      firstCardId.value = id
      return
    }

    if (pressedCardKey.value === key) {
      gameStore.scoreCounter -= 1
      resetCardsId()
    } else {
      secondCardId.value = id
      setMismatchEventValue({ firstCardId: firstCardId.value!, secondCardId: secondCardId.value! })
      gameStore.decreasedLives()

      setTimeout(() => {
        resetCardsId()
        resetMismatchHandler()
      }, 100)
    }
  }

  const startGame = () => {
    shuffleCards()
    setTimeout(() => {
      open()
    }, 1000)

    setTimeout(() => {
      close()
    }, 3000)
  }

  return {
    cards,
    openCards,
    gameStore,
    startGame,
    restartGame,
    playGame,
  }
}
