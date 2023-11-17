<template>
  <div class="imageCard" :style="{ backgroundColor: props.backgroundColor }">
    <div class="imageCard__header">
      <button class="imageCard__editBtn" @click="$emit('show-editForm')">Edit</button>
      <img class="imageCard__deleteCard" alt="deleteCard" src="@/assets/close.svg"
           @click="$emit('show-confirmModal')">
    </div>
    <router-link :to="'/card/' + props.selectedCardIdx" class="imageCard__link">
      <div class="imageCard__imgPreview">
        <img alt="" :src="props.imageSrc" class="imageCard__selectedImg">
      </div>
      <p class="imageCard__info">First name: {{ props.firstName }}</p>
      <p class="imageCard__info">Last name: {{ props.lastName }}</p>
      <p class="imageCard__info">Created at: {{ props.date }}</p>
      <p class="imageCard__info">Updated at: {{ props.dateOfEdited }}</p>
    </router-link>

  </div>
</template>

<script setup>
import {defineProps} from "vue";
const props = defineProps(['firstName', 'lastName', 'imageSrc', 'date', 'dateOfEdited', 'backgroundColor', 'selectedCardIdx'])

</script>

<style scoped lang="scss" src="@/styles/imageCard.scss"></style>