import { useGameStore } from '@/store/game'
import { ref, watch } from 'vue'

export const useAudio = () => {
  const store = useGameStore()
  const audio = ref<HTMLAudioElement>()
  const isAudioPlay = ref(false)

  const createAudio = (musicSrc: string) => {
    audio.value = Object.assign(new Audio(musicSrc), { loop: true })
  }

  const toggleAudio = () => {
    if (isAudioPlay.value) {
      audio.value?.pause()
    } else {
      audio.value?.play()
    }
    isAudioPlay.value = !isAudioPlay.value
  }

  watch(
    () => store.isGameStarted,
    (newVal) => {
      if (!newVal) {
        audio.value?.pause()
      }
    },
  )

  return {
    createAudio,
    toggleAudio,
    isAudioPlay,
  }
}
