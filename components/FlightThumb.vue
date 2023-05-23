<script lang="ts" setup>

const props = defineProps({
  flight: {
    type: Object
  },
  distances: {
    type: Object
  },
  showCost: {
    type: Boolean
  },
  consumption: {
    type: Number
  }
});
/*
const queryStore = useQueryStore();
const consumption = queryStore.consumption;

 */
const fuelPrice = 1.40;
</script>

<template>
  <div class="relative w-[30%] p-4 bg-blue-50 m-2 my-4 shadow rounded-3xl flex flex-col">
    <h3>{{flight.cityFrom}}, {{flight.flyFrom}} - {{flight.cityTo}}, {{flight.flyTo}}</h3>
    <h4>{{ new Date(flight['local_departure']).toLocaleDateString() }} -> {{ new Date(flight.route[flight.route.length-1]['local_departure']).toLocaleDateString() }} </h4>
    <p>Noce: {{flight.nightsInDest}} Przesiadki: {{flight.route.length-2}}. Linie: {{flight.airlines}}</p>
    <p>{{flight.price}} euro</p>
    <p v-if="Object.keys(distances).length && showCost">
      {{distances[flight.flyFrom].distance.text}} - {{distances[flight.flyFrom].duration.text}} - {{(distances[flight.flyFrom].distance.value / 100000 * fuelPrice * consumption).toFixed(2)}} euro
    </p>
  </div>
</template>

<style scoped></style>
