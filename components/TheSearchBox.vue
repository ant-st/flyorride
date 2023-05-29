<script>
import {useStorage} from '@vueuse/core'
export default {
  data() {
    return {
      dropper: false,
      searchOptions: [
        {name: 'Podróż samolotem', value: 'flight'},
        {name: 'Podróż samochodem', value: 'drive'},
        {name: 'Nocleg', value: 'sleep'},
        {name: 'Wynajem auta', value: 'carRent'},
        {name: 'Atrakcje', value: 'events'},
      ],
      searchQuery: useStorage('query', {
        'from': '',
        'airport': '',
        'to': '',
        'startDate': '',
        'endDate': '',
        'travellers': 1,
        'children': 0,
        'minNights': 1,
        'maxNights': 3,
        'dateInterval': false,
        'options': [],
        'returnFromOther': false,
        'returnToOther': false,
        'stopovers': 1
      }),
      preds: [],
      activeInput: ''
    }
  },
  methods: {
    toggleDropper() {
      this.dropper = !this.dropper;
    },
    activateInput(newVal) {
      this.activeInput = newVal;
    },
    handlePrediction(newVal) {
      this.searchQuery[this.activeInput] = newVal;
    },
    handleSearch() {
      const store = useQueryStore();
      store.query = this.searchQuery;
      this.$emit('update:query', this.searchQuery);
    },
    handleReset() {
      this.searchQuery = {
        'from': '',
        'airport': '',
        'to': '',
        'startDate': '',
        'endDate': '',
        'travellers': 1,
        'children': 0,
        'minNights': 1,
        'maxNights': 3,
        'dateInterval': false,
        'options': [],
        'returnFromOther': false,
        'returnToOther': false,
        'stopovers': 1
      }
    }
  },
  computed: {
    activeQuery() {
      return this.searchQuery[this.activeInput];
    }
  },
  watch: {
    activeQuery(newVal) {
      if (newVal && newVal.length>2) {
        let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${newVal}&types=country|locality&key=AIzaSyCFmoAQ5iDUdiz36GcaXskcXPFFgdaa4Dw`;
        fetch(url)
            .then(r => r.json())
            .then(r => {
              this.preds = r.predictions.map(el => el.description);
            });
      }
      else {
        this.preds = [];
      }
    }
  },
}
</script>

<template>
  <div class="relative -top-80 min-h-screen py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <form @submit.prevent='handleSearch' @reset.prevent="handleReset" class="max-w-lg mx-auto">
          <!-- Header -->
          <div class="flex items-center space-x-5">
            <div class="h-14 w-14 bg-blue-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">✈️</div>
            <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
              <h2 class="leading-relaxed">Lecimy, czy jedziemy?</h2>
            </div>
          </div>
          <!-- Pola -->
          <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <!-- Start i cel -->
              <div class="flex flex-row justify-between space-x-4">
                <div class="relative flex flex-col" >
                  <label class="leading-loose">Miejsce startu:</label>
                  <input required @focus="activateInput('from')"  type="text" v-model="searchQuery.from" class=" px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Start">
                  <PredictionsBox
                      :preds='preds'
                      v-if="activeInput === 'from' && preds.length"
                      @update:prediction = 'handlePrediction'
                      @closeBox = 'activateInput("")'
                  />
                </div>
                <div class="relative flex flex-col justify-end" >
                  <label class="leading-loose">Lotniska:</label>
                  <input required @focus="activateInput('airport')"  type="text" v-model="searchQuery.airport" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Lotniska">
                  <PredictionsBox
                      :preds='preds'
                      v-if="activeInput === 'airport' && preds.length"
                      @update:prediction = 'handlePrediction'
                      @closeBox = 'activateInput("")'
                  />
                </div>
                <div class="relative flex flex-col">
                  <label class="leading-loose">Cel podróży:</label>
                  <input required @focus="activateInput('to')"  type="text" v-model="searchQuery.to" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Cel">
                  <PredictionsBox
                      :preds='preds'
                      v-if="activeInput === 'to' && preds.length"
                      @update:prediction = 'handlePrediction'
                      @closeBox = 'activateInput("")'
                  />
                </div>
              </div>
              <!-- Daty -->
              <div class="flex flex-row justify-between items-center space-x-4">
                <div class="flex flex-col w-1/3 items-between">
                  <label class="leading-loose">Wylot{{searchQuery.dateInterval ? ' od ' : ''}}:</label>
                  <div class="relative focus-within:text-gray-600 text-gray-400 w-full">
                    <input required type="date" v-model="searchQuery.startDate" class="sm:pr-4 sm:pl-10 px-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="25/02/2020">
                    <div class="hidden sm:block absolute left-3 top-2">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col w-1/3 items-between">
                  <label class="leading-loose">{{ searchQuery.dateInterval ? 'Wylot do:' : 'Powrót:' }}</label>
                  <div class="relative focus-within:text-gray-600 text-gray-400 w-full">
                    <input :min="searchQuery.startDate" required type="date" v-model="searchQuery.endDate" class="sm:pr-4 sm:pl-10 px-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="26/02/2020">
                    <div class="hidden sm:block absolute left-3 top-2">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col w-1/3 items-between">
                  <label class="leading-loose">Liczba nocy:</label>
                  <div class="w-full flex flex-line justify-between">
                    <div class="relative focus-within:text-gray-600 text-gray-400 w-1/4">
                      <input type="checkbox" v-model="searchQuery.dateInterval" class="m-2 px-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                    </div>
                    <div class="relative focus-within:text-gray-600 text-gray-400 w-1/3">
                      <input :disabled='!searchQuery.dateInterval' type="number" v-model="searchQuery.minNights" min=0 class="px-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                    </div>
                    <div class="relative focus-within:text-gray-600 text-gray-400 w-1/3">
                      <input :disabled='!searchQuery.dateInterval' type="number" v-model="searchQuery.maxNights" :min="searchQuery.minNights" class="px-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                    </div>
                  </div>
                </div>
              </div>
              <!-- Kryteria wyszukiwania -->
              <!--
              <div class="flex flex-col">
                <p class="leading-loose">Kryteria wyszukiwania:</p>
                <div class="flex flex-row justify-between">
                    <div class="relative group w-full">
                      <button
                          class="border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md md:px-4 py-2 text-sm bg-transparent rounded-lg text-[#666666] hover:text-gray-900 focus:outline-none focus:shadow-outline flex flex-line items-center justify-between"
                          @click='toggleDropper'
                      >
                        <span v-if='!searchQuery.options[0]'>Szukaj...</span>
                        <span v-else v-for="option in searchQuery.options">
                          {{option}},
                        </span>

                        <span v-if='dropper' class="px-2"> ⬆️ </span>
                        <span v-else class="px-2"> ⬇️ </span>

                      </button>
                      <transition name="transform-fade-down">
                        <ul
                            v-if="dropper"
                            class="z-20 flex lg:absolute flex-col w-full py-1 lg:bg-white rounded-md lg:shadow-md pl-2 lg:pl-0"
                        >
                          <li v-for="option in searchOptions">
                            <label>
                              <input type="checkbox" v-model="searchQuery.options" :value='option.value' class="mx-2"> {{option.name}}
                            </label>
                          </li>
                        </ul>
                      </transition>
                    </div>
                </div>
              </div>
              -->
              <!-- Ludzie -->
              <div class="flex flex-row justify-between items-center space-x-4">
                <div class="flex flex-col w-1/3 items-between">
                  <label class="leading-loose">Dorośli i dzieci:</label>
                  <div class="relative focus-within:text-gray-600 text-gray-400 w-full max-w-[155px] flex flex-line">
                    <div class="w-1/2 p-2">
                      <input type="number" v-model="searchQuery.travellers" min=1 class="px-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                    </div>
                    <div class="w-1/2 p-2">
                      <input type="number" v-model="searchQuery.children" min=0 class="px-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                    </div>
                  </div>
                </div>
                <div class="flex flex-col w-1/3 items-between">
                  <label class="leading-loose">Powrót:</label>
                  <div class="relative w-full max-w-[155px] flex flex-line">
                    <div class="w-full p-2">
                      <label class="flex flex-line w-full justify-between">
                        <p class="text-sm ">Z innego miasta:</p>
                        <input type="checkbox" v-model="searchQuery.returnFromOther"/>
                      </label>
                      <label class="flex flex-line w-full justify-between">
                        <p class="text-sm">Do innego miasta:</p>
                        <input type="checkbox" v-model="searchQuery.returnToOther"/>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col w-1/3 items-between">
                  <label class="leading-loose">Maks. przesiadki:</label>
                  <div class="relative focus-within:text-gray-600 text-gray-400 w-full max-w-[155px] flex flex-line">
                    <div class="w-[80%] p-2">
                      <input type="number" v-model="searchQuery.stopovers" min=0 class="px-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Przyciski -->
            <div class="pt-4 flex items-center space-x-4">
              <button type='reset' class="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Reset
              </button>
              <button type='submit' class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Szukaj!</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
