import router from '@/router'
import { useCards } from './useCards'
import { useMismatchHandler } from './useMismatchHandler'
import { useGameStore } from '@/store/game'
import { ref } from 'vue'

export const useGame = () => {
  const { cards, openCards, shuffleCards, close, open } = useCards()

  const pressedCardKey = ref<number | null>(null)
  const firstCardId = ref<number | null>(null)
  const secondCardId = ref<number | null>(null)

  const { resetMismatchHandler, setMismatchEventValue } = useMismatchHandler(openCards)

  const gameState = useGameStore()

  if (!gameState.isGameStarted) {
    router.push('/')
  }

  const resetCardsId = () => {
    firstCardId.value = null
    secondCardId.value = null
    pressedCardKey.value = null
  }

  const restartGame = () => {
    gameState.isGameLoose = false
    gameState.scoreCounter = 12
    resetCardsId()
    resetMismatchHandler()

    gameState.setMode(gameState.mode)

    startGame()
  }

  const playGame = (key: number, id: number) => {
    if (!pressedCardKey.value) {
      pressedCardKey.value = key
      firstCardId.value = id
      return
    }

    if (pressedCardKey.value === key) {
      gameState.scoreCounter -= 1
      resetCardsId()
    } else {
      secondCardId.value = id
      setMismatchEventValue({ firstCardId: firstCardId.value!, secondCardId: secondCardId.value! })
      gameState.lives -= 1

      if (gameState.lives === 0) gameState.isGameLoose = true

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
    gameState,
    startGame,
    restartGame,
    playGame,
  }
}
