<script lang="ts" setup>
const store= useKiwiResultsStore();
let showCost = ref(false);
let consumption = ref(7.5);
</script>

<template>
  <div>
    <div class="relative px-4 py-10 bg-white mx-8 mx-10 shadow rounded-3xl sm:p-10 flex flex-col justify-between">
      <h2 class="w-full text-center">Wyniki:</h2>
      <div v-if="Object.keys(store.distances).length" class="flex flex-line w-full h-[30px]">
        <label class="flex flex-line w-1/2 justify-center">
          <p>Pokaż koszty dojazdu samochodem na lotnisko: </p>
          <input type="checkbox" class="p-2 m-2" v-model="showCost"/>
        </label>
        <label class="leading-loose flex flex-line w-1/2 justify-center" v-if="showCost">
          <p>Spalanie auta:</p>
          <div class="relative focus-within:text-gray-600 text-gray-400 w-full max-w-[155px] flex flex-line">
            <input type="number" v-model="consumption" min=1 step=0.5 class="mx-2 px-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
          </div>
        </label>
      </div>
      <div class="flex flex-line flex-wrap">
        <FlightThumb
            v-if="store.kiwiResults"
            v-for="flight in store.kiwiResults.data"
            :flight="flight"
            :distances="store.distances"
            :showCost="showCost"
            :consumption="consumption"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
