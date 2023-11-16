<template>
  <div class="container">
    <the-nav
        @show-form="changeFormStatus(false, null)"
    ></the-nav>
    <main class="main">
      <card-form
          v-if="showForm"
          :selectedCardForEdit="selectedCardForEdit"
          @data-emitted="handleDataEmitted"
          @create-card="createNewCard"
          @hide-form="hideForm"
          @edit-card="editCard"
      ></card-form>
      <image-card v-for="(card, index) in cardData" :key="index"
                  :first-name="card.firstName"
                  :last-name="card.lastName"
                  :image-src="card.image"
                  :date="card.date"
                  :background-color="card.color"
                  :dateOfEdited="card.dateOfEdited"
                  @show-confirmModal="showModal(index)"
                  @show-editForm="changeFormStatus(true, index)"
      ></image-card>
      <confirm-modal
          v-if="showConfirmModal"
          @hide-modal="hideModal"
          @delete-card="deleteCard"
      >

      </confirm-modal>
    </main>
    <TheFooter/>
  </div>
</template>


<script setup>
import {defineAsyncComponent, ref, onMounted} from 'vue'
import ImageCard from "@/components/ImageCard.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import TheNav from "@/layout/TheNav.vue";
import TheFooter from "@/layout/TheFooter.vue";

const CardForm = defineAsyncComponent(() =>
    import('./components/CardForm.vue')
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
  cardData.value[selectedCardIndex.value] = {...editedCard, date: cardData.value[selectedCardIndex.value].date}
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

<style src="@/styles/main.scss" lang="scss"></style>
