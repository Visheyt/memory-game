import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Mode = 'easy' | 'medium' | 'hard'

export const useGameStore = defineStore('game', () => {
  const mode = ref<Mode>('easy')
  const lives = ref(3)
  const isGameStarted = ref(false)
  const isGameLoose = ref(false)
  const scoreCounter = ref(12)

  const setMode = (newMode: Mode) => {
    mode.value = newMode
    livesForMode(mode.value)
  }

  const livesForMode = (mode: Mode) => {
    switch (mode) {
      case 'easy':
        lives.value = 3
        break
      case 'medium':
        lives.value = 2
        break
      case 'hard':
        lives.value = 1
        break
    }
  }

  const startGame = () => {
    isGameStarted.value = true
  }

  const decreasedLives = () => {
    lives.value -= 1

    if (lives.value === 0) {
      isGameLoose.value = true
    }
  }

  const reset = () => {
    isGameLoose.value = false
    scoreCounter.value = 12
  }

  return {
    mode,
    lives,
    isGameLoose,
    isGameStarted,
    setMode,
    startGame,
    decreasedLives,
    scoreCounter,
    reset,
  }
})
