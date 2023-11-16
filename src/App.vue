<template>
  <div class="container">
    <nav class="nav">
      <div class="nav__logoWrapper">
        <span class="nav__logo">logo</span>
      </div>
      <div class="nav__buttonWrapper">
        <button class="nav__addBtn" @click="changeFormStatus(false, null)">
          Add new card
        </button>
      </div>
    </nav>
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
    <footer class="footer">
      <div class="footer__logoWrapper">
        <!--    <img src="" alt="" class="nav__logo">-->
        <span class="nav__logo">logo</span>
      </div>
    </footer>
  </div>
</template>


<script setup>
import {defineAsyncComponent, ref, onMounted} from 'vue'
import ImageCard from "@/components/ImageCard.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
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
  if(clickedEditBtn) {
    selectedCardForEdit.value = cardData.value[cardIndex]
    console.log(selectedCardForEdit.value)
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
  cardData.value[selectedCardIndex.value] = { ...editedCard, date: cardData.value[selectedCardIndex.value].date }
  localStorage.setItem('data', JSON.stringify(cardData.value))
  showForm.value = false
  selectedCardForEdit.value = undefined;
}

const hideForm = () => {
  showForm.value = false;
  selectedCardForEdit.value = undefined;
}


onMounted(()=> {
  cardData.value = JSON.parse(localStorage.getItem("data")) || [];
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.nav, .footer {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #2c3e50;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.nav__logo {
  text-transform: uppercase;
  font-weight: bolder;
  color: #ffff;
}

.nav__addBtn {
  padding: 5px;
  border-radius: 5px;
  background: none;
  color: #ffff;
  border: 1px solid #fff;
  cursor: pointer;
}

.main {
  padding: 15px;
  display: flex;
  gap: 36px;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
}

</style>
