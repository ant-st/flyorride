<script lang="ts" setup>

const props = defineProps({
  flight: {
    type: Object
  },
  distances: {
    type: Object
  }
});
</script>

<template>
  <div class="relative w-[30%] p-4 bg-blue-50 m-2 my-4 shadow rounded-3xl flex flex-col">
    <h3>{{flight.cityFrom}}, {{flight.flyFrom}} - {{flight.cityTo}}, {{flight.flyTo}}</h3>
    <h4>{{ new Date(flight['local_departure']).toLocaleDateString() }} -> {{ new Date(flight.route[flight.route.length-1]['local_departure']).toLocaleDateString() }} </h4>
    <p>Noce: {{flight.nightsInDest}} Przesiadki: {{flight.route.length-2}}. Linie: {{flight.airlines}}</p>
    <p>{{flight.price}} euro</p>
    <p v-if="Object.keys(distances).length">{{distances[flight.flyFrom].distance.text}} - {{distances[flight.flyFrom].duration.text}}</p>
  </div>
</template>

<style scoped></style>
