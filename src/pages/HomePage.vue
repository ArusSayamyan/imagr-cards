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
      <image-card v-for="(card) in cardData" :key="card.id"
                  :cards="card"
                  @show-confirmModal="showModal(card.id)"
                  @show-editForm="changeFormStatus(true, card.id)"
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
const cardToDeleteId = ref(null)
const showConfirmModal = ref(false)
const cardData = ref([])
const selectedCardForEdit = ref()
const selectedCardId = ref()

function createNewCard(newCard) {
  cardData.value = JSON.parse(localStorage.getItem('data')) || []
  cardData.value.push(newCard)

  localStorage.setItem('data', JSON.stringify(cardData.value))
  showForm.value = false
}


const changeFormStatus = (clickedEditBtn, cardId) => {
  showForm.value = true;
  selectedCardId.value = cardId

  if (clickedEditBtn) {
    selectedCardForEdit.value = cardData.value.find(card => card.id === cardId)
  }
};

function deleteCard() {
  const deletedCardIdx = cardData.value.findIndex(obj => obj.id === cardToDeleteId.value);
  if (deletedCardIdx !== -1) {
    cardData.value.splice(deletedCardIdx, 1);
    localStorage.setItem('data', JSON.stringify(cardData.value));
    showConfirmModal.value = false
  }

}

function handleDataEmitted(emittedData) {
  cardData.value = emittedData
}

function showModal(id) {
  showConfirmModal.value = true
  cardToDeleteId.value = id
}

function hideModal() {
  showConfirmModal.value = false
}

function editCard(editedCard) {
  const updatedArray = cardData.value.map(obj => {
    if (obj.id === selectedCardId.value) {
      return {...obj, ...editedCard};
    } else {
      return obj;
    }
  });
  localStorage.setItem('data', JSON.stringify(updatedArray))
  showForm.value = false
  selectedCardForEdit.value = undefined;
  cardData.value = JSON.parse(localStorage.getItem("data")) || [];
}

const hideForm = () => {
  showForm.value = false;
  selectedCardForEdit.value = undefined;
}


onMounted(() => {
  cardData.value = JSON.parse(localStorage.getItem("data")) || [];
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