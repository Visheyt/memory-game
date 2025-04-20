<script setup lang="ts"></script>
<template>
  <div class="container">
    <slot name="content"></slot>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  text-align: center;
  max-width: 1200px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.737);
  border-radius: 5px;
  padding: 50px;
  min-height: 580px;
  margin: 0 auto;
  position: relative;
  z-index: 100;
  justify-content: space-between;
  @media (max-width: 768px) {
    padding: 20px;
  }
}
</style>
