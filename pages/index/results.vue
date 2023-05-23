<script lang="ts" setup>
const store= useKiwiResultsStore();
</script>

<template>
  <div>
    <div class="relative px-4 py-10 bg-white mx-8 mx-10 shadow rounded-3xl sm:p-10 flex flex-line flex-wrap justify-between">
      <h2 class="w-full">Wyniki:</h2>
      <FlightThumb v-if="store.kiwiResults" v-for="flight in store.kiwiResults.data" :flight="flight" :distances="store.distances"/>
    </div>
  </div>
</template>

<style scoped></style>
