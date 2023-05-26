<script lang="ts" setup>

const props = defineProps({
  flight: {
    type: Object,
    required: true
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

const crucialIndex = props.flight.route.findIndex(e => e.flyTo === props.flight.flyTo);
const firstLeg = props.flight.route.slice(0, crucialIndex + 1);
const secondLeg = props.flight.route.slice(crucialIndex + 1);

</script>

<template>
  <div class="relative w-[48%] p-4 bg-blue-50 m-2 my-4 shadow rounded-3xl flex flex-col">
    <div>
      <div class="flex flex-line">
        <p v-for="flight in firstLeg">{{flight.cityFrom}}, {{flight.flyFrom}} -> </p>
        <p>{{firstLeg[firstLeg.length - 1].cityTo}}, {{firstLeg[firstLeg.length - 1].flyTo}}</p>
      </div>
      <div class="flex flex-line">
        <p v-for="flight in secondLeg">{{flight.cityFrom}}, {{flight.flyFrom}} -> </p>
        <p>{{secondLeg[secondLeg.length - 1].cityTo}}, {{secondLeg[secondLeg.length - 1].flyTo}}</p>
      </div>
    </div>
    <h4>{{ new Date(flight['local_departure']).toLocaleDateString() }} -> {{ new Date(flight.route[flight.route.length-1]['local_departure']).toLocaleDateString() }} </h4>
    <p>Noce: {{flight.nightsInDest}} Przesiadki: {{flight.route.length-2}}. Linie: {{flight.airlines}}</p>
    <p>{{flight.price}} euro</p>
    <p v-if="distances[flight.flyFrom] && showCost">
      {{distances[flight.flyFrom].distance.text}} - {{distances[flight.flyFrom].duration.text}} - {{(distances[flight.flyFrom].distance.value / 100000 * fuelPrice * consumption).toFixed(2)}} euro
    </p>
    <NuxtLink :to="flight['deep_link']" target="_blank" rel="noopener">Klik</NuxtLink>
  </div>
</template>

<style scoped></style>
