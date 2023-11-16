<template>
<div class="imageCard" :style="{ backgroundColor: props.backgroundColor }">
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

const props = defineProps(['firstName', 'lastName', 'imageSrc', 'date', 'dateOfEdited', 'backgroundColor'])

</script>

<style scoped lang="scss" src="@/styles/imageCard.scss"></style>