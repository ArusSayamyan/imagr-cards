<template>
  <div class="cardForm">
    <form action="" class="cardForm__form" @submit.prevent="sendData">
      <div class="cardForm__header">
        <span class="cardForm__formTitle">Add new card</span>
        <img src="@/assets/close.svg" alt="" class="cardForm__close" @click="$emit('hide-form')">
      </div>
      <input type="text" class="cardForm__input" placeholder="first name" v-model="firstName">
      <input type="text" class="cardForm__input" placeholder="last name" v-model="lastName">
      <input type="file" id="img" name="img" accept="image/*" @change="handleFileChange" hidden="hidden">
      <label for="img" class="cardForm__imageLabel"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> <span>Choose a file&hellip;</span></label>
      <div class="cardForm__preview" v-if="preview">
        <img :src="preview" alt="" class="cardForm__uploadedImage">
      </div>
      <div class="cardForm__btns">
        <button class="cardForm__button" type="submit" v-if="addEditBtn">Edit</button>
        <button class="cardForm__button" type="submit" v-else :disabled="isDisabledBtn" :class="{'cardForm__button--disabled': isDisabledBtn}">Create</button>
        <button class="cardForm__button" type="button" @click="$emit('hide-form')">Cancel</button>
      </div>
    </form>
  </div>
</template>


<script setup>
import {defineProps, ref, onMounted, defineEmits, computed} from 'vue';

const props = defineProps(['editCard', 'selectedCardForEdit'])
const emit = defineEmits(['data-emitted', 'hide-form', 'create-card', 'edit-card'])

const firstName = ref()
const lastName = ref()
const selectedImg = ref()
const preview = ref()

const addEditBtn = ref(false)
const generatedColor = ref()

let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth() + 1;
let day = currentDate.getDate();
let currentHours = currentDate.getHours();
let currentMinutes = currentDate.getMinutes();

const fullDate = day + '.' + month + '.' + year + " " + currentHours + ":" + currentMinutes


const isDisabledBtn = computed(() => {
  return !firstName.value || !lastName.value || !preview.value
})

function generateRandomLightColor() {
  const r = Math.floor(Math.random() * 156) + 100; // Red value between 100 and 255
  const g = Math.floor(Math.random() * 156) + 100; // Green value between 100 and 255
  const b = Math.floor(Math.random() * 156) + 100; // Blue value between 100 and 255

  generatedColor.value = `rgb(${r}, ${g}, ${b})`;
}

function sendData() {
  generateRandomLightColor();
  if(props.selectedCardForEdit === undefined) {
    emit('create-card', ({
      firstName: firstName.value,
      lastName: lastName.value,
      image: preview.value,
      date: fullDate,
      dateOfEdited: fullDate,
      color: generatedColor
    }))
  }else {
    emit('edit-card', ({
      firstName: firstName.value,
      lastName: lastName.value,
      image: preview.value,
      dateOfEdited: fullDate,
    }))
  }
}

function handleFileChange(event) {
  selectedImg.value = event.target.files[0];
  if (selectedImg.value) {
    const reader = new FileReader();

    reader.onload = function (event) {
      preview.value = event.target.result;
    };

    reader.readAsDataURL(selectedImg.value);
  } else {
    preview.value = "";
  }
}


onMounted(() => {
  if(props.selectedCardForEdit !== undefined) {
    addEditBtn.value = true;
    firstName.value = props.selectedCardForEdit.firstName
    lastName.value = props.selectedCardForEdit.lastName
    preview.value = props.selectedCardForEdit.image
  }
})
</script>

<style scoped lang="scss" src="@/styles/cardForm.scss">
</style>