<template>
  <div class="container">
    <nav class="nav">
      <div class="nav__logoWrapper">
        <span class="nav__logo">logo</span>
      </div>
      <div class="nav__buttonWrapper">
        <button class="nav__addBtn" @click="changeFormStatus">
          Add new card
        </button>
      </div>
    </nav>
   <main class="main">
     <card-form
         :showForm="showForm"
         @hide-form="hideForm"
         @data-emitted="handleDataEmitted"
     ></card-form>
     <image-card v-for="(card, index) in cardData" :key="index"
                 :first-name="card.firstName"
                 :last-name="card.lastName"
                 :image-src="card.image"
                 :date="card.date"
                 @show-confirmModal="showModal(index)"
     ></image-card>
     <confirm-modal
         :showConfirmModal="showConfirmModal"
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
const changeFormStatus = () => {
  showForm.value = true;

};

function showModal(index) {
  showConfirmModal.value = true
  cardToDeleteIndex.value = index
  console.log(cardToDeleteIndex.value)
}

function hideModal() {
  showConfirmModal.value = false
}

function deleteCard() {
  console.log(cardToDeleteIndex.value)
  cardData.value.splice(cardToDeleteIndex.value, 1);

  localStorage.setItem('data', JSON.stringify(cardData.value));

  showConfirmModal.value = false
}


function handleDataEmitted(emittedData) {
  console.log('Data emitted from child component:', emittedData);
  cardData.value = emittedData
}

const hideForm = (isHidden) => {
  showForm.value = isHidden;
}



onMounted(()=> {
  cardData.value = JSON.parse(localStorage.getItem("data")) || "";
  // localStorage.clear()
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
