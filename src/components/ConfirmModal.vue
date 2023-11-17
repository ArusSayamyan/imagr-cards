<template>
  <Teleport to="body">
    <div class="confirmModal">
      <div class="confirmModal__content">
        <div class="confirmModal__close">
          <img src="@/assets/close.svg" alt="" class="confirmModal__closeIcon" @click="$emit('hide-modal')">
        </div>
        <p class="confirmModal__message">
          <img src="@/assets/exclamation-triangle-fill.svg" alt="">
          Are you sure you want to delete this card?</p>
        <div class="confirmModal__buttons">
          <button class="confirmModal__deleteBtn" @click="emit('delete-card')">Delete</button>
          <button class="confirmModal__cancelBtn" @click="emit('hide-modal')">Cancel</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import {defineEmits} from 'vue'
const emit = defineEmits(['delete-card', 'hide-modal'])
</script>


<style scoped lang="scss" src="@/styles/confirmModal.scss"></style>