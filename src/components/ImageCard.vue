<template>
  <div class="imageCard" :style="{ backgroundColor: props.cards.color }">
    <img class="imageCard__deleteCard" alt="deleteCard" src="@/assets/close.svg"
         @click="$emit('show-confirmModal')">
    <div class="imageCard__header">
      <button class="imageCard__editBtn" @click="$emit('show-editForm')">Edit</button>
    </div>
    <router-link :to="'/card/' + props.cards.id" class="imageCard__link">
      <div class="imageCard__imgPreview">
        <img alt="" :src="props.cards.image" class="imageCard__selectedImg">
      </div>
      <p class="imageCard__info">First name: {{ props.cards.firstName }}</p>
      <p class="imageCard__info">Last name: {{ props.cards.lastName }}</p>
      <p class="imageCard__info">Created at: {{ props.cards.date }}</p>
      <p class="imageCard__info">Updated at: {{ props.cards.dateOfEdited }}</p>
    </router-link>

  </div>
</template>

<script setup>
import {defineProps} from "vue";
const props = defineProps(['cards'])
</script>
<style scoped lang="scss" src="@/styles/imageCard.scss"></style>