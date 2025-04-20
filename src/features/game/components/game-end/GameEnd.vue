<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
}>()
</script>

<template>
  <teleport to="body">
    <div class="overlay" :class="props.isOpen ? '' : 'hidden'">
      <div class="modal">
        <header class="header">
          <slot name="header"></slot>
        </header>
        <div class="content">
          <slot name="content"></slot>
        </div>
        <div class="buttons">
          <slot name="buttons"></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style>
.overlay {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.315);
  z-index: 100;
}
.hidden {
  display: none;
}
.modal {
  background-color: rgba(255, 255, 255, 0.872);
  max-width: 500px;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 5px;
}
.header {
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(128, 128, 128, 0.502);
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>
