<script lang="ts" setup>
const favStore = useFavoritesStore();
</script>

<template>
  <div class="relative px-4 py-10 bg-white mx-8 mx-10 shadow rounded-3xl sm:p-10 flex flex-col justify-between">
    <h2 class="w-full text-center">Zapisane:</h2>
    <div class="flex flex-line flex-wrap">
      <FlightThumb
          v-if="favStore.favorites"
          v-for="flight in favStore.favorites"
          :flight="flight"
          :key="flight.id"
      />
    </div>
  </div>
</template>

<style scoped></style>
