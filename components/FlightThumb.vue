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
let carCost;

// @ts-ignore
if (props.distances[props.flight.flyFrom]) carCost = (props.distances[props.flight.flyFrom].distance.value / 100000 * fuelPrice * props.consumption).toFixed(2);

const crucialIndex = props.flight.route.findIndex(e => e.flyTo === props.flight.flyTo);
const firstLeg = props.flight.route.slice(0, crucialIndex + 1);
const secondLeg = props.flight.route.slice(crucialIndex + 1);

</script>

<template>

  <div class="relative w-[48%] p-4 bg-blue-50 m-2 my-4 shadow rounded-3xl flex flex-col">
    <!-- First leg -->
    <div class="flex flex-line w-full justify-between items-end">
      <div class="flex flex-col w-1/3">
        <p class="text-xs">{{ new Date(firstLeg[0]['local_departure']).toLocaleDateString() }}</p>
        <div class="flex flex-line items-center">
          <SVGTakeoff/>
          <div class="flex flex-col p-2">
            <p class="text-lg">{{firstLeg[0].cityFrom}}</p>
            <p class="text-xs">{{firstLeg[0].flyFrom}}</p>
          </div>
        </div>
      </div>
      <div class="w-1/3 ">
        <div class="h-1/2 text-center border-t-2 border-gray-400">
          <p class="text-xs p-2">9 godz. 20 min.</p>
        </div>
      </div>
      <div class="flex flex-col w-1/3 text-right">
        <p class="text-xs">{{ new Date(firstLeg[firstLeg.length-1]['local_departure']).toLocaleDateString() }}</p>
        <div class="flex flex-line items-center justify-end">
          <div class="flex flex-col p-2">
            <p class="text-lg">{{firstLeg[firstLeg.length-1].cityTo}}</p>
            <p class="text-xs">{{firstLeg[firstLeg.length-1].flyTo}}</p>
          </div>
          <SVGLanding/>
        </div>
      </div>
    </div>
    <!-- Nights -->
    <h3 class="my-6 py-2 mx-auto w-full border-y-2 text-center">{{flight.nightsInDest}} nocy</h3>
    <!-- Second leg -->
    <div class="flex flex-line w-full justify-between items-end">
      <div class="flex flex-col w-1/3">
        <p class="text-xs">{{ new Date(secondLeg[0]['local_departure']).toLocaleDateString() }}</p>
        <div class="flex flex-line items-center">
          <SVGTakeoff/>
          <div class="flex flex-col p-2">
            <p class="text-lg">{{secondLeg[0].cityFrom}}</p>
            <p class="text-xs">{{secondLeg[0].flyFrom}}</p>
          </div>
        </div>
      </div>
      <div class="w-1/3 ">
        <div class="w-full stopover flex flex-col items-center relative">
          <p class="w-full mx-auto text-center">Przesiadka!</p>
          <span class="hidden w-[70%] box-border absolute top-7">
            <div class="box-border rounded-lg  py-2 w-full border-gray-200 border-2 bg-gray-100 text-center">
              <p>Dubaj, DXB</p>
              <p class="text-xs">2h oczekiwania</p>
            </div>
          </span>
        </div>
        <div class="h-1/2 text-center border-t-2 border-gray-400">
          <p class="text-xs p-2">9 godz. 20 min.</p>
        </div>
      </div>
      <div class="flex flex-col w-1/3 text-right">
        <p class="text-xs">{{ new Date(secondLeg[secondLeg.length-1]['local_departure']).toLocaleDateString() }}</p>
        <div class="flex flex-line items-center justify-end">
          <div class="flex flex-col p-2">
            <p class="text-lg">{{secondLeg[secondLeg.length-1].cityTo}}</p>
            <p class="text-xs">{{secondLeg[secondLeg.length-1].flyTo}}</p>
          </div>
          <SVGLanding/>
        </div>
      </div>
    </div>
    <!-- Car -->
    <div
        v-if="distances[flight.flyFrom] && showCost"
         class="mx-auto my-6 flex flex-line w-[65%] items-center justify-center"
    >
      <p class="w-[36%] text-right px-2">W jedną stronę: {{distances[flight.flyFrom].distance.text}}</p>
      <img src="../media/carIcon.svg" class="w-[28%]"/>
      <p class="w-[36%] px-2">{{distances[flight.flyFrom].duration.text}}</p>
    </div>
    <!-- Cost -->
    <div class="flex flex-line justify-between items-center border-t-2 p-2">
      <ul>
        <li class="flex flex-line items-center">
          <img src="../media/plane1.svg" class="w-[40px]"/>
          <span class="text-sm px-2">2x</span> 3000zł
        </li>
        <li class="flex flex-line items-center">
          <img src="../media/suitcase.svg" class="w-[40px]"/>
          <span class="text-sm px-2">2x</span> 500zł
        </li>
        <li class="flex flex-line items-center" v-if="distances[flight.flyFrom] && showCost">
          <img src="../media/carIcon.svg" class="w-[40px]"/>
          <span class="text-sm px-2">1x</span> {{carCost}}€
        </li>
      </ul>
      <h3 class="text-3xl">{{ flight.price }}€</h3>
    </div>
  </div>
  <!--
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
  -->
</template>

<style scoped></style>
