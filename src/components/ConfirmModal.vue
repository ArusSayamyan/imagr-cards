<template>
<div class="confirmModal">
 <div class="confirmModal__content">
   <div class="confirmModal__close">
     <img src="@/assets/close.svg" alt="" class="confirmModal__closeIcon" @click="$emit('hide-modal')">
   </div>
   <p class="confirmModal__message">
     <img src="@/assets/exclamation-triangle-fill.svg" alt="">
     Are you sure you want to delete this card?</p>
   <div class="confirmModal__buttons">
     <button class="confirmModal__deleteBtn" @click="$emit('delete-card')">Delete</button>
     <button class="confirmModal__cancelBtn" @click="$emit('hide-modal')">Cancel</button>
   </div>
 </div>
</div>
</template>

<script setup>

</script>


<style scoped lang="scss">
.confirmModal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.77);

  &__content {
    max-width: 450px;
    width: 100%;
    padding: 29px;
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
    background: #FFFFFF;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }

  &__close {
    display: flex;
    justify-content: end;
    margin-bottom: 15px;
  }

  &__message {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__buttons {
    max-width: 150px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 15px auto;
  }

  &__deleteBtn, &__cancelBtn {
    width: 70px;
    padding: 8px;
    background: #3a3b98;
    color: #fff;
    text-transform: uppercase;
    border: navajowhite;
    border-radius: 5px;
    cursor: pointer;
  }

  &__closeIcon {
    cursor: pointer;
  }
}
</style>