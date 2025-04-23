<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

const props = defineProps<{
  variant?: Variant
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}>()

const emit = defineEmits(['buttonClick'])

const handleClick = () => {
  emit('buttonClick')
}

const classes = computed(() => {
  return ['base-button', `variant-${props.variant ?? 'primary'}`]
})
</script>

<template>
  <button :class="classes" :disabled="disabled" :type="type || 'button'" @click="handleClick">
    <slot></slot>
  </button>
</template>

<style>
.base-button {
  font-weight: 600;
  border: none;
  border-radius: 5px;
  padding: 7px 10px;
  background-color: inherit;
  cursor: pointer;
  color: black;
  position: relative;
}
.base-button::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 100%;
  height: 1.5px;
  background-color: rgb(0, 0, 0);
  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
  transition:
    transform 0.6s ease,
    opacity 0.6s ease;
  opacity: 0;
}
@media (min-width: 768px) {
  .base-button:hover::after {
    transform: translateX(-50%) scaleX(1);
    opacity: 1;
  }
}
</style>
