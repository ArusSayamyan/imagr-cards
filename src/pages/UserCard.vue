<template>
  <div class="userCard">
    <router-link to="/home" class="userCard__backToHome">
      <div class="userCard__route">
        <img src="@/assets/arrow-left.svg" alt="backToHome" class="userCard__arrowIcon">
        <span>Back to home</span>
      </div>
    </router-link>

  <div class="userCard__mainCard" :style="{ borderColor: selectedCard.color }">
    <div class="userCard__imageBlock">
      <img :src="selectedCard.image" alt="" class="userCard__image">
    </div>
    <div class="userCard__userInfo">
      <p class="userCard__desc">First name: {{ selectedCard.firstName }}</p>
      <p class="userCard__desc">Last name: {{ selectedCard.lastName }}</p>
      <p class="userCard__desc">Created at: {{ selectedCard.date }}</p>
      <p class="userCard__desc">Updated at: {{ selectedCard.dateOfEdited }}</p>
    </div>
  </div>
  </div>
</template>


<script setup>
import {useRoute} from "vue-router";

const route = useRoute()
const getAllCards = JSON.parse(localStorage.getItem('data'))
const selectedCard = getAllCards.find(obj => obj.id === route.params.id)
console.log(selectedCard)

</script>

<style scoped lang="scss" src="@/styles/userCard.scss">
</style>