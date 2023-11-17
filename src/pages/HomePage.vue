<template>
  <div class="main">
    <div class="main__buttonWrapper">
      <button class="main__addBtn" @click="changeFormStatus(false, null)">
        Add new card
      </button>
    </div>
    <main class="main__content">
      <card-form
          v-if="showForm"
          :selectedCardForEdit="selectedCardForEdit"
          @data-emitted="handleDataEmitted"
          @create-card="createNewCard"
          @hide-form="hideForm"
          @edit-card="editCard"
      ></card-form>
      <image-card v-for="(card, index) in cardData" :key="index"
                  :cards="card"
                  :selectedCardIdx="index"
                  @show-confirmModal="showModal(index)"
                  @show-editForm="changeFormStatus(true, index)"
      ></image-card>
      <confirm-modal
          v-if="showConfirmModal"
          @hide-modal="hideModal"
          @delete-card="deleteCard"
      />
    </main>
  </div>

</template>

<script setup>
import {defineAsyncComponent, ref, onMounted} from 'vue'

import ConfirmModal from "@/components/ConfirmModal.vue";
import ImageCard from "@/components/ImageCard.vue";

const CardForm = defineAsyncComponent(() =>
    import('../components/CardForm.vue')
)

const showForm = ref(false)
const cardToDeleteIndex = ref(null)
const showConfirmModal = ref(false)
const cardData = ref([])
const selectedCardForEdit = ref()
const selectedCardIndex = ref()

function createNewCard(newCard) {
  cardData.value = JSON.parse(localStorage.getItem('data')) || []
  cardData.value.push(newCard)

  localStorage.setItem('data', JSON.stringify(cardData.value))
  showForm.value = false
}


const changeFormStatus = (clickedEditBtn, cardIndex) => {
  showForm.value = true;
  selectedCardIndex.value = cardIndex
  if (clickedEditBtn) {
    selectedCardForEdit.value = cardData.value[cardIndex]
  }
};

function deleteCard() {
  cardData.value.splice(cardToDeleteIndex.value, 1);

  localStorage.setItem('data', JSON.stringify(cardData.value));

  showConfirmModal.value = false
}

function handleDataEmitted(emittedData) {
  cardData.value = emittedData
}

function showModal(index) {
  showConfirmModal.value = true
  cardToDeleteIndex.value = index
}

function hideModal() {
  showConfirmModal.value = false
}

function editCard(editedCard) {
  cardData.value[selectedCardIndex.value] = {
    ...editedCard,
    date: cardData.value[selectedCardIndex.value].date,
    color: cardData.value[selectedCardIndex.value].color,
  }
  localStorage.setItem('data', JSON.stringify(cardData.value))
  showForm.value = false
  selectedCardForEdit.value = undefined;
}

const hideForm = () => {
  showForm.value = false;
  selectedCardForEdit.value = undefined;
}


onMounted(() => {
  cardData.value = JSON.parse(localStorage.getItem("data")) || [];
  // localStorage.clear()
})

</script>

<style lang="scss">
.main {
  &__content {
    position: relative;
    padding: 15px;
    display: flex;
    gap: 36px;
    flex-wrap: wrap;
    box-sizing: border-box;
    justify-content: center;
    margin-top: 50px;
  }

  &__addBtn {
    position: absolute;
    right: 15px;
    padding: 5px;
    border-radius: 5px;
    background: #2c3e50;
    color: #ffff;
    border: 1px solid #fff;
    cursor: pointer;
  }
}

</style>