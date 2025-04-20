<script setup lang="ts">
const props = defineProps<{
  imgSrc: string
  cardKey: number
  id: number
  isOpen: boolean
}>()

const emit = defineEmits(['open'])

const handleClick = (cardKey: number, id: number) => {
  emit('open', cardKey, id)
}
</script>

<template>
  <button
    class="card"
    :class="isOpen ? 'open' : ' '"
    @click="handleClick(cardKey, id)"
    :disabled="isOpen"
  >
    <img :src="props.imgSrc" alt="front image" class="front" />
    <img src="/game/back.webp" alt="back image" class="back" />
  </button>
</template>

<style>
.card {
  position: relative;
  background-color: rgba(0, 0, 0, 0.275);
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 1.5s;
  max-width: 130px;
  width: 100%;
  aspect-ratio: 130 / 220;
}
.back {
  position: absolute;
  backface-visibility: hidden;
}
.front {
  position: absolute;
}
.card.open {
  transform: rotateY(180deg);
}
img {
  align-self: center;
  left: 0px;
  top: 0px;
  border-radius: 5px;
  width: 100%;
  object-fit: contain;
  width: 100%;
  position: relative;
}
@media (max-width: 480px) {
  .card {
    max-width: 100px;
  }
}
</style>
