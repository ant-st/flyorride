<script lang="ts" setup>
const kiwiStore = useKiwiResultsStore();
const carStore = useCarStore();

let showCost = ref(false);

let dropperDest = ref(false);
let dropperAirport = ref(false);
let currentPage = ref(0);
</script>

<template>
  <div>
    <div class="relative px-4 py-10 bg-white sm:mx-8 shadow rounded-3xl sm:p-10 flex flex-col justify-between">
      <h2 class="w-full text-center">Wyniki wyszukiwania:</h2>
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
      <!-- Wyniki -->
      <ClientOnly v-if="kiwiStore.filteredResults && kiwiStore.filteredResults.length">
        <!-- Auto -->
        <div v-if="carStore.distances" class="flex flex-line w-full h-[30px]">
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
        <div class="flex flex-line flex-wrap justify-evenly">
          <FlightThumb
            v-for="flight in kiwiStore.filteredResults.slice(currentPage*10 , (currentPage+1)*10 )"
            :flight="flight"
            :distances="carStore.distances"
            :showCost="showCost"
            :consumption="carStore.fuelConsumption"
            :key="flight.id"
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

      </ClientOnly>
      <div v-else>
        <h2 class="w-full text-center text-2xl py-4">Nie znaleziono wyników :(</h2>
      </div>
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

</style>
