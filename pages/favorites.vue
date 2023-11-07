<script lang="ts" setup>
import { onMounted } from 'vue'
let favStore;

onMounted(() => {
  favStore = useFavoritesStore();
});

</script>

<template>
  <ClientOnly>
    <div class="relative px-4 py-10 bg-white sm:mx-8 shadow rounded-3xl sm:p-10 flex flex-col justify-between">
      <h2 class="w-full text-center">Zapisane:</h2>
      <div class="flex flex-line flex-wrap">
        <CarTravelThumb
            v-if="favStore.roadtrips"
            v-for="(roadtrip, index) in favStore.roadtrips"
            :request = "roadtrip"
            :index = "index"
            :travellers = "roadtrip.travellers"
        />
      </div>
      <div class="flex flex-line flex-wrap">
        <FlightThumb
            v-if="favStore.favorites"
            v-for="flight in favStore.favorites"
            :flight="flight"
            :key="flight.id"
            :fav-list="true"
        />
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped></style>
