<script lang="ts" setup>
const store = useKiwiResultsStore();
let showCost = ref(false);
let consumption = ref(7.5);
let dropperDest = ref(false);
let dropperAirport = ref(false);
let currentPage = ref(0);
</script>

<template>
  <div>
    <div class="relative px-4 py-10 bg-white mx-8 mx-10 shadow rounded-3xl sm:p-10 flex flex-col justify-between">
      <h2 class="w-full text-center">Wyniki wyszukiwania:</h2>
      <!-- Filtry -->
      <div v-if='store.kiwiResults.data && store.kiwiResults.data.length' class="flex flex-line justify-evenly w-full">
        <div class="flex flex-col w-1/3">
          <p class="leading-loose">Ukryj loty z:</p>
          <div class="flex flex-row justify-between">
            <div class="relative group w-full">
              <button
                  class="border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md md:px-4 py-2 text-sm bg-transparent rounded-lg text-[#666666] hover:text-gray-900 focus:outline-none focus:shadow-outline flex flex-line items-center"
                  @click='() => {dropperAirport = !dropperAirport}'
              >
                <span v-if='dropperAirport'> ⬆️ </span>
                <span v-else> ⬇️ </span>
                <span class="px-1">Ukryj...</span>
                <span
                    v-for="option in store.filters.airports"
                    class="px-1"
                >
                    {{option}}
                  </span>
              </button>
              <transition name="transform-fade-down">
                <ul
                    v-if="dropperAirport"
                    class="z-20 flex lg:absolute flex-col w-full py-1 lg:bg-white rounded-md lg:shadow-md pl-2 lg:pl-0"
                >
                  <li v-for="dest in store.airports">
                    <label>
                      <input type="checkbox" v-model="store.filters.airports" :value='dest' class="mx-2"> {{dest}}
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
                  class="border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md md:px-4 py-2 text-sm bg-transparent rounded-lg text-[#666666] hover:text-gray-900 focus:outline-none focus:shadow-outline flex flex-line items-center"
                  @click='() => {dropperDest = !dropperDest}'
              >
                <span v-if='dropperDest'> ⬆️ </span>
                <span v-else> ⬇️ </span>
                <span class="px-1">Ukryj...</span>
                <span
                    v-for="option in store.filters.destinations"
                    class="px-1"
                >
                    {{option}}
                  </span>
              </button>
              <transition name="transform-fade-down">
                <ul
                    v-if="dropperDest"
                    class="z-20 flex lg:absolute flex-col w-full py-1 lg:bg-white rounded-md lg:shadow-md pl-2 lg:pl-0"
                >
                  <li v-for="dest in store.destinations">
                    <label>
                      <input type="checkbox" v-model="store.filters.destinations" :value='dest' class="mx-2"> {{dest}}
                    </label>
                  </li>
                </ul>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <!-- Wyniki -->
      <ClientOnly v-if="store.filteredResults && store.filteredResults.length">
        <!-- Auto -->
        <div v-if="store.getDistances" class="flex flex-line w-full h-[30px]">
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
            v-for="flight in store.filteredResults.slice(currentPage*10 , (currentPage+1)*10 )"
            :flight="flight"
            :distances="store.distances"
            :showCost="showCost"
            :consumption="consumption"
            :key="flight.id"
          />
        </div>
        <div class="flex flex-line">
          <button :disabled="!currentPage" @click="currentPage--">&lt;-</button>
          <p>{{currentPage+1}} / {{Math.ceil(store.filteredResults.length/10)}}</p>
          <button :disabled="currentPage+1 === Math.ceil(store.filteredResults.length/10)" @click="currentPage++">-></button>
        </div>
      </ClientOnly>
      <div v-else>
        <h2 class="w-full text-center text-2xl py-4">Nie znaleziono wyników :(</h2>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
