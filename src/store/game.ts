import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Mode = 'easy' | 'medium' | 'hard'

export const useGameStore = defineStore('game', () => {
  const delayMap: Record<Mode, number> = {
    easy: 7000,
    medium: 5000,
    hard: 3000,
  }

  const livesMap: Record<Mode, number> = {
    easy: 3,
    medium: 2,
    hard: 1,
  }
  const mode = ref<Mode>('easy')
  const lives = ref(3)
  const showDelay = ref(delayMap[mode.value])
  const isGameStarted = ref(false)
  const isGameLoose = ref(false)
  const scoreCounter = ref(12)
  const musicSrc = ref('/music/easy.mp3')

  const setMode = (newMode: Mode) => {
    mode.value = newMode
    musicSrc.value = `/music/${newMode}.mp3`
    showDelay.value = delayMap[newMode]
    lives.value = livesMap[newMode]
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
    showDelay,
    setMode,
    startGame,
    decreasedLives,
    scoreCounter,
    reset,
  }
})
