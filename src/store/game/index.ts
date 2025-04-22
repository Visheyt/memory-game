import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { delayMap, livesMap } from './config'
import type { Mode } from './types'

export const useGameStore = defineStore('game', () => {
  const mode = ref<Mode>('easy')
  const lives = ref(3)
  const showDelay = ref(delayMap[mode.value])
  const isGameStarted = ref(false)
  const isGameLoose = ref(false)
  const isGameWin = computed(() => scoreCounter.value === 0)
  const scoreCounter = ref(6)
  const musicSrc = ref('')

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
    isGameWin,
    isGameStarted,
    showDelay,
    musicSrc,
    setMode,
    startGame,
    decreasedLives,
    scoreCounter,
    reset,
  }
})
