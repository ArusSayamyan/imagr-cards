<template>
  <div class="container">
    <the-header/>
    <router-view></router-view>
    <TheFooter/>
  </div>
</template>


<script setup>
import TheFooter from "@/layout/TheFooter.vue";
import TheHeader from "@/layout/TheHeader.vue";

</script>

<style src="@/styles/main.scss" lang="scss"></style>
