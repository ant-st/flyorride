<script lang="ts" setup>
import {storeToRefs} from "pinia";

const kiwiStore = useKiwiResultsStore();
const carStore = useCarStore();
const queryStore = useQueryStore();

//@ts-ignore
const carTransfer = queryStore.query.options ? queryStore.query.options.find(el => el.value === 'carTransfer') : null;
//@ts-ignore
const carTransport = queryStore.query.options ? queryStore.query.options.find(el => el.value === 'drive') : null;

//@ts-ignore
if (carTransfer) {
  //@ts-ignore
  carStore.updateConsumption(queryStore.query.consumption);
  carStore.getAirportsDistances();
}

const {distances} = storeToRefs(carStore);

let showCost = ref(false);
let dropperDest = ref(false);
let dropperAirport = ref(false);
let currentPage = ref(0);

// Car travel parameters
const request = {
  origin: queryStore.query.from,
  destination: queryStore.query.to,
  travelMode: "DRIVING",
};
//@ts-ignore
let travellers = queryStore.query.children + queryStore.query.travellers;

</script>

<template>
  <div>
    <div class="relative px-4 py-10 bg-white sm:mx-8 shadow rounded-3xl sm:p-10 flex flex-col justify-between">
      <!-- Filtry -->
      <div v-if='kiwiStore.kiwiResults.data && kiwiStore.kiwiResults.data.length' class="flex flex-line justify-evenly w-full">
        <div class="flex flex-col w-1/3">
          <p class="leading-loose">Ukryj loty z:</p>
          <div class="flex flex-row justify-between mb-4">
            <div class="relative group w-full">
              <button
                  class=" truncate ... border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md px-1 md:px-4 py-2 text-sm bg-transparent rounded-lg text-[#666666] hover:text-gray-900 focus:outline-none focus:shadow-outline flex flex-line items-center"
                  @click='() => {dropperAirport = !dropperAirport}'
              >
                <span> <img :class="{rotate: dropperAirport}" src="../../media/downArrow.png" class="h-[15px] transition-transform duration-200"/>  </span>
                <span class="px-1">Ukryj...</span>
                <span
                    v-for="option in kiwiStore.filters.airports"
                    class="px-1 hidden sm:block"
                >
                    {{option}}
                  </span>
              </button>
              <transition name="transform-fade-down">
                <ul
                    v-if="dropperAirport"
                    class="z-20 flex absolute flex-col w-full py-1 bg-white rounded-md lg:shadow-md pl-2 lg:pl-0"
                >
                  <li v-for="dest in kiwiStore.airports">
                    <label>
                      <input type="checkbox" v-model="kiwiStore.filters.airports" :value='dest' class="mx-1 sm:mx-2"> {{dest}}
                    </label>
                  </li>
                </ul>
              </transition>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-1/3">
          <p class="leading-loose">Ukryj loty do:</p>
          <div class="flex flex-row justify-between">
            <div class="relative group w-full">
              <button
                  class=" truncate ... border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md px-1 md:px-4 py-2 text-sm bg-transparent rounded-lg text-[#666666] hover:text-gray-900 focus:outline-none focus:shadow-outline flex flex-line items-center"
                  @click='() => {dropperDest = !dropperDest}'
              >
                <span > <img :class="{rotate: dropperDest}" src="../../media/downArrow.png" class="h-[15px] transition-transform duration-200"/>  </span>
                <span class="px-1">Ukryj...</span>
                <span
                    v-for="option in kiwiStore.filters.destinations"
                    class="px-1 hidden sm:block"
                >
                    {{option}}
                  </span>
              </button>
              <transition name="transform-fade-down">
                <ul
                    v-if="dropperDest"
                    class="z-20 flex absolute flex-col w-[120%] sm:w-full py-1 bg-white rounded-md lg:shadow-md pl-2 lg:pl-0"
                >
                  <li v-for="dest in kiwiStore.destinations">
                    <label>
                      <input type="checkbox" v-model="kiwiStore.filters.destinations" :value='dest' class="mx-1 sm:mx-2"> {{dest}}
                    </label>
                  </li>
                </ul>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <div v-if="carTransfer" class="flex flex-line w-full justify-center">
        <button @click='() => showCost = !showCost'
                class="px-8 xl:px-10 w-1/2 py-3 my-4  min-w-fit
                text-gray-900
                text-sm sm:text-md text-center rounded-full
                hover:shadow-md hover:shadow-blue-300
                transition duration-500 bg-blue-100"
                :class="{active: showCost}"
        >
          <span>Pokaż koszty dojazdu samochodem na lotnisko: </span>
        </button>
      </div>
      <!-- Wyniki -->
      <ClientOnly>
        <div class="w-full flex flex-wrap justify-center">
          <CarTravelThumb
              v-if="carTransport"
              :request = "request"
              :travellers = "travellers"
          />
        </div>
        <div v-if="kiwiStore.filteredResults && kiwiStore.filteredResults.length">
          <div class="flex flex-line flex-wrap justify-evenly" >
            <FlightThumb
              v-for="flight in kiwiStore.filteredResults.slice(currentPage*10 , (currentPage+1)*10 )"
              :flight="flight"
              :showCost="showCost"
              :key="flight.id"
              :distances = 'distances'
            />
          </div>
          <div class="mt-6 flex flex-line w-full justify-center">
            <button
                :disabled="!currentPage"
                @click="currentPage--"
                class="p-2 arrow transition-opacity transition-duration-300"
            >
              <img src="../../media/downArrow.png" class="h-[20px] rotate-90 hover:rotate"/>
            </button>
            <p class="p-2">{{ currentPage + 1 }} / {{ Math.ceil(kiwiStore.filteredResults.length / 10) }}</p>
            <button
                :disabled="currentPage+1 === Math.ceil(kiwiStore.filteredResults.length/10)"
                @click="currentPage++"
                class="p-2 arrow transition-opacity transition-duration-300"
            >
              <img src="../../media/downArrow.png" class="h-[20px] -rotate-90"/>
            </button>
          </div>
        </div>
        <div v-else>
          <h2 class="w-full text-center text-2xl py-4">Nie znaleziono wyników :(</h2>
        </div>
      </ClientOnly>

    </div>
  </div>
</template>

<style scoped>

.rotate {
  transform: rotate(180deg);
}

.arrow:disabled {
  opacity: 0.3;
}

.active {
  background-color: #3b82f6;
  color: white;
}

</style>
