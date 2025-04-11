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
  width: 120px;
  height: 210px;
  margin: 10px;
  background-color: rgba(0, 0, 0, 0.275);
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 1.5s;
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
  width: 120px;
  height: 210px;
  left: 0px;
  top: 0px;
  border-radius: 5px;
}
</style>
