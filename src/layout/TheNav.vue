<template>
  <nav class="nav">
    <div class="nav__logoWrapper">
      <span class="nav__logo">logo</span>
    </div>
    <div class="nav__buttonWrapper">
      <button class="nav__addBtn" @click="$emit('show-form')" >
        Add new card
      </button>
    </div>
  </nav>
</template>

<script setup>

</script>

<style scoped lang="scss" src="@/styles/theNav.scss">
</style>