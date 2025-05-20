import { ref } from 'vue'

export const useImageLoading = () => {
  const isImageLoaded = ref<boolean>(false)

  const handleImageLoad = () => {
    isImageLoaded.value = true
  }
  return {
    isImageLoaded,
    handleImageLoad,
  }
}
