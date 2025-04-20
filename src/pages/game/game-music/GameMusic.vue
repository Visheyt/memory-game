<script setup lang="ts">
import { useAudio } from '@/composables/audio/useAudio'
import MusicIcon from '@/shared/icons/MusicIcon.vue'
import { onMounted } from 'vue'

const props = defineProps<{
  musicSrc: string
}>()
const { toggleAudio, createAudio } = useAudio()

onMounted(() => {
  createAudio(props.musicSrc)
})
</script>
<template>
  <button class="icons" @click="toggleAudio"><MusicIcon /></button>
</template>

<style></style>
