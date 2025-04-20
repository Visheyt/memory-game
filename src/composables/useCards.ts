import { Cards } from '@/data/cards'
import { reactive, ref } from 'vue'

export const useCards = () => {
  const cards = ref([...Cards])
  const openCards = reactive<Record<number, boolean>>({})

  const shuffleCards = () => {
    cards.value = [...cards.value].sort(() => Math.random() - 0.5)
  }

  const open = () => {
    cards.value.forEach((card) => {
      openCards[card.id] = true
    })
  }

  const close = () => {
    cards.value.forEach((card) => {
      openCards[card.id] = false
    })
  }

  return {
    cards,
    openCards,
    shuffleCards,
    open,
    close,
  }
}
