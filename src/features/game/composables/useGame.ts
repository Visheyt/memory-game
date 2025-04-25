import { useCards } from './useCards'
import { useMismatchHandler } from './useMismatchHandler'
import { useGameStore } from '@/store/game'
import { useCardsSelection } from './useCardsSelection'
import { useGameGuard } from './useGameGuard'
import { delay } from '@/utils/delay'

const START_GAME_CARDS_OPEN_DELAY = 1000

const RESET_DELAY = 100

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

  const backToStartScreen = () => {
    gameStore.reset()
    gameStore.isGameStarted = false
  }

  const playGame = async (key: number, id: number) => {
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

      if (firstCardId.value !== null && secondCardId.value !== null) {
        setMismatchEventValue({ firstCardId: firstCardId.value, secondCardId: secondCardId.value })
      }

      gameStore.decreasedLives()

      await delay(RESET_DELAY)

      resetCardsId()
      resetMismatchHandler()
    }
  }

  const openCard = (cardKey: number, id: number) => {
    if (!openCards[id]) {
      openCards[id] = true
      playGame(cardKey, id)
    }
  }

  const startGame = async () => {
    shuffleCards()
    await delay(START_GAME_CARDS_OPEN_DELAY)
    open()
    await delay(gameStore.showDelay)
    close()
  }

  return {
    cards,
    openCards,
    gameStore,
    startGame,
    restartGame,
    backToStartScreen,
    playGame,
    openCard,
  }
}
