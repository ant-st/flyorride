<script lang="ts" setup>

const store = useKiwiResultsStore();


</script>

<template>
  <div class="relative px-4 py-10 bg-white mx-8 mx-10 shadow rounded-3xl sm:p-10 flex flex-col justify-between">
    <h2 class="w-full text-center text-2xl py-4">Błąd! {{ store.error }}</h2>
  </div>
</template>

<style scoped></style>
