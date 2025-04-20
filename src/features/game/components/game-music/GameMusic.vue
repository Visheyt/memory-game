<script setup lang="ts">
import { useAudio } from '@/shared/composables/audio/useAudio'
import MusicIcon from '@/shared/icons/MusicIcon.vue'
import { onMounted } from 'vue'

const props = defineProps<{
  musicSrc: string
}>()
const { toggleAudio, createAudio, isAudioPlay } = useAudio()

onMounted(() => {
  createAudio(props.musicSrc)
})
</script>
<template>
  <button class="audio" @click="toggleAudio" :class="isAudioPlay && 'active'">
    <MusicIcon />
  </button>
</template>

<style>
.audio svg {
  width: 25px;
}
.audio {
  background-color: inherit;
  filter: contrast(0.2);
  transition: all 0.5s ease;
}
.active {
  filter: contrast(1);
}
</style>
