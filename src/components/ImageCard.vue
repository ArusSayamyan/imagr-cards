<template>
<div class="imageCard">
  <div class="imageCard__header">
    <button class="imageCard__editBtn" @click="$emit('show-editForm')">Edit</button>
    <img class="imageCard__deleteCard" alt="deleteCard" src="@/assets/close.svg" @click="$emit('show-confirmModal')">
  </div>
  <div class="imageCard__imgPreview">
    <img  alt="" :src="props.imageSrc"  class="imageCard__selectedImg">
  </div>
  <p>First name: {{ props.firstName }}</p>
  <p>Last name: {{ props.lastName }}</p>
  <p>Created at: {{ props.date }}</p>
  <p>Updated at: {{ props.dateOfEdited }}</p>
</div>
</template>

<script setup>
import {defineProps} from "vue";

const props = defineProps(['firstName', 'lastName', 'imageSrc', 'date', 'dateOfEdited'])

</script>

<style scoped lang="scss">
.imageCard {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 1px solid #cccc;
  border-radius: 5px;
  box-sizing: border-box;

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  &__editBtn {
    width: 70px;
    padding: 8px;
    background: #3a3b98;
    color: #fff;
    text-transform: uppercase;
    border: navajowhite;
    border-radius: 5px;
    cursor: pointer;
  }

  &__imgPreview {
    width: 100px;
    height: 100px;
    margin: 0 auto 15px;
  }

  &__selectedImg {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    object-fit: contain;
  }

  &__deleteCard {
    cursor: pointer;
  }
}
</style>