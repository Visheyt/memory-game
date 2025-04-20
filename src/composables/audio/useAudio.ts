import { ref } from 'vue'

export const useAudio = () => {
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

  return {
    createAudio,
    toggleAudio,
  }
}
