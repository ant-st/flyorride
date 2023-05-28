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

const queryStore = useQueryStore();


const crucialIndex = props.flight.route.findIndex(e => e.flyTo === props.flight.flyTo);
const firstLeg = props.flight.route.slice(0, crucialIndex + 1);
const secondLeg = props.flight.route.slice(crucialIndex + 1);

const calculateTime = (time1: string, time2: string) => {
  let date1 = new Date(time1);
  let date2 = new Date(time2);
  let diff = (date1.getTime() - date2.getTime())/60000;
  return `${Math.floor(diff/60)} godz. ${diff%60} min.`
}

</script>

<template>

  <div class="relative w-[48%] p-4 bg-blue-50 m-2 my-4 shadow rounded-3xl flex flex-col justify-between">
    <!-- First leg -->
    <div class="flex flex-line w-full justify-between items-start">
      <div class="flex flex-col w-1/3">
        <p class="text-xs">{{ new Date(firstLeg[0]['local_departure']).toLocaleString() }}</p>
        <div class="flex flex-line items-center">
          <SVGTakeoff/>
          <div class="flex flex-col p-2">
            <p class="text-lg">{{firstLeg[0].cityFrom}}</p>
            <p class="text-xs">{{firstLeg[0].flyFrom}}</p>
          </div>
        </div>
      </div>
      <div class="w-1/3 self-center">
        <div v-if='firstLeg.length>1' class="w-full stopover flex flex-col items-center relative">
          <p class="w-full mx-auto text-center text-sm">{{firstLeg.length-1}} Przesiadk{{firstLeg.length === 2 ? 'a' : 'i'}}!</p>
          <span class="hidden box-border absolute top-7">
            <div class="box-border rounded-lg px-2 py-2 w-full border-gray-200 border-2 bg-gray-100 text-center">
              <div v-for="(stopover, index) in firstLeg.slice(1)">
                <p>{{stopover.cityFrom}}, {{stopover.flyFrom}}</p>
                <p class="text-xs">Oczekiwanie: {{ calculateTime(stopover['local_departure'],firstLeg[index]['local_arrival']) }}</p>
              </div>
            </div>
          </span>
        </div>
        <div class="h-1/2 text-center border-t-2 border-gray-400">
          <p class="text-xs p-2">{{Math.floor(flight.duration.departure / 3600)}} godz. {{flight.duration.departure / 60 % 60}} min.</p>
        </div>
      </div>
      <div class="flex flex-col w-1/3 text-right">
        <p class="text-xs">{{ new Date(firstLeg[firstLeg.length-1]['local_departure']).toLocaleString() }}</p>
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
    <div class="flex flex-line w-full justify-between items-start mb-6">
      <div class="flex flex-col w-1/3">
        <p class="text-xs">{{ new Date(secondLeg[0]['local_departure']).toLocaleString() }}</p>
        <div class="flex flex-line items-center">
          <SVGTakeoff/>
          <div class="flex flex-col p-2">
            <p class="text-lg">{{secondLeg[0].cityFrom}}</p>
            <p class="text-xs">{{secondLeg[0].flyFrom}}</p>
          </div>
        </div>
      </div>
      <div class="w-1/3 self-center">
        <div v-if='secondLeg.length>1' class="w-full stopover flex flex-col items-center relative">
          <p class="w-full mx-auto text-center text-sm">{{secondLeg.length-1}} Przesiadk{{secondLeg.length === 2 ? 'a' : 'i'}}!</p>
          <span class="hidden box-border absolute top-7">
            <div class="box-border rounded-lg px-2 py-2 w-full border-gray-200 border-2 bg-gray-100 text-center">
              <div v-for="(stopover, index) in secondLeg.slice(1)">
                <p>{{stopover.cityFrom}}, {{stopover.flyFrom}}</p>
                <p class="text-xs">Oczekiwanie: {{ calculateTime(stopover['local_departure'],secondLeg[index]['local_arrival']) }}</p>
              </div>
            </div>
          </span>
        </div>
        <div class="h-1/2 text-center border-t-2 border-gray-400">
          <p class="text-xs p-2">{{Math.floor(flight.duration.return / 3600)}} godz. {{flight.duration.return / 60 % 60}} min.</p>
        </div>
      </div>
      <div class="flex flex-col w-1/3 text-right">
        <p class="text-xs">{{ new Date(secondLeg[secondLeg.length-1]['local_departure']).toLocaleString() }}</p>
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
         class="mt-6 flex flex-line w-full items-center justify-center border-t-2"
    >
      <p class="w-[35%] text-right px-2">W jedną stronę: {{distances[flight.flyFrom].distance.text}}</p>
      <img src="../media/carIcon.svg" class="w-[20%]"/>
      <p class="w-[35%] px-2">{{distances[flight.flyFrom].duration.text}}</p>
    </div>
    <!-- Cost -->
    <div class="flex flex-line justify-between items-center border-t-2 p-2">
      <ul>
        <li class="flex flex-line items-center">
          <img src="../media/plane1.svg" class="w-[40px]"/>
          <span class="text-sm px-2">{{queryStore.query.travellers}}x</span> {{flight.fare.adults}}€
        </li>
        <li v-if="queryStore.query.children" class="flex flex-line items-center">
          <img src="../media/plane1.svg" class="w-[40px]"/>
          <span class="text-sm px-2">{{queryStore.query.children}}x</span> {{flight.fare.children}}€
        </li>
        <li class="flex flex-line items-center">
          <img src="../media/suitcase.svg" class="w-[40px]"/>
          <span class="text-sm px-2">max.</span> {{flight['bags_price']['1'].toFixed(2)}}€
        </li>
        <li class="flex flex-line items-center" v-if="distances[flight.flyFrom] && showCost">
          <img src="../media/carIcon.svg" class="w-[40px]"/>
          <span class="text-sm px-2">2x</span> {{distances[flight.flyFrom].cost}}€
        </li>
      </ul>
      <h3 class="text-3xl hover:underline">
        <NuxtLink :to="flight['deep_link']" target="_blank" rel="noopener">
        {{ (Number(flight.price) + ((distances[flight.flyFrom] && showCost ) ? Number(distances[flight.flyFrom].cost)*2 : 0)).toFixed(2) }}€
        </NuxtLink>
      </h3>
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

<style scoped>
.stopover:hover > span {
  display: block;
}
</style>
