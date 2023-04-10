<template>
  <Header></Header>
  <router-view />
</template>

<script setup>
// @ is an alias to /src
import Header from '@/components/core/Header.vue';

</script>

<style scoped>
*,
::after,
::before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  width: 100%;
  font-size: 1rem !important;
}

</style>
