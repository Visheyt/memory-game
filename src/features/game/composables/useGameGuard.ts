import router from '@/router'
import { useGameStore } from '@/store/game'
import { watch } from 'vue'

export const useGameGuard = () => {
  const gameStore = useGameStore()

  watch(
    () => gameStore.isGameStarted,
    (newValue) => {
      if (!newValue) {
        router.push('/')
      }
    },
    { immediate: true },
  )
}
