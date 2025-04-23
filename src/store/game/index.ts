import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { delayMap, livesMap } from './config'
import type { Mode } from './types'

const MAX_LIVES = 3
const CARD_PAIRS = 6

export const useGameStore = defineStore('game', () => {
  const mode = ref<Mode>('easy')
  const lives = ref(MAX_LIVES)
  const showDelay = ref(delayMap[mode.value])
  const isGameStarted = ref(false)
  const isGameLoose = ref(false)
  const isGameWin = computed(() => scoreCounter.value === 0)
  const scoreCounter = ref(CARD_PAIRS)
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
    scoreCounter.value = CARD_PAIRS
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
