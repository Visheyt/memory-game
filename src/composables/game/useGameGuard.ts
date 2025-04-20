import router from '@/router'
import { useGameStore } from '@/store/game'
import { onMounted } from 'vue'

export const useGameGuard = () => {
  const gameStore = useGameStore()

  onMounted(() => {
    if (!gameStore.isGameStarted) {
      router.push('/')
    }
  })
}
