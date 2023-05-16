<script>
export default {
  name: 'TheSearchBox',
  data() {
    return {
      open: false,
      dropdownNavbar: false,
    }
  },
  methods: {
    dropdownToggler () {
      this.dropdownNavbar = !this.dropdownNavbar
    }
  }
}
</script>

<template>
  <div class="relative -top-80 min-h-screen py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div class="max-w-md mx-auto">
          <div class="flex items-center space-x-5">
            <div class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">✈️</div>
            <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
              <h2 class="leading-relaxed">Dokąd dziś lecimy? A może jedziemy?</h2>
            </div>
          </div>
          <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <!-- Start i cel -->
              <div class="flex flex-row">
                <div class="flex flex-col mx-5" >
                  <label class="leading-loose">Miejsce startu:</label>
                  <input type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Start">
                </div>
                <div class="flex flex-col mx-5">
                  <label class="leading-loose">Cel podróży:</label>
                  <input type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Cel">
                </div>
              </div>
              <!-- Daty i ludzie -->
              <div class="flex flex-row justify-between items-center space-x-4">
                <div class="flex flex-col">
                  <label class="leading-loose">Wylot:</label>
                  <div class="relative focus-within:text-gray-600 text-gray-400">
                    <input type="date" class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="25/02/2020">
                    <div class="absolute left-3 top-2">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col">
                  <label class="leading-loose">Powrót:</label>
                  <div class="relative focus-within:text-gray-600 text-gray-400">
                    <input type="date" class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="26/02/2020">
                    <div class="absolute left-3 top-2">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col">
                  <label class="leading-loose">Osoby:</label>
                  <div class="relative focus-within:text-gray-600 text-gray-400">
                    <input type="number" min=1 class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                    <div class="absolute left-3 top-2">
                      <img class="w-6 h-6 p-[2px]" alt="human picto" src="../media/human-location-svgrepo-com.svg"/>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Kryteria wyszukiwania -->
              <div class="flex flex-col">
                <p class="leading-loose">Kryteria wyszukiwania:</p>
                <div class="flex flex-row justify-between">
                    <div class="relative group w-full">
                      <button
                          class="border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md md:px-4 py-2 text-sm bg-transparent rounded-lg text-[#666666] hover:text-gray-900 focus:outline-none focus:shadow-outline flex flex-line items-center justify-between"
                          @click="dropdownToggler"
                          @blur="dropdownToggler"
                      >
                        <span>Szukaj...</span>
                        <span v-if="dropdownNavbar" class="px-2"> ⬆️ </span>
                        <span v-else class="px-2"> ⬇️ </span>

                      </button>
                      <transition name="transform-fade-down">
                        <ul
                            v-if="dropdownNavbar"
                            class="flex lg:absolute flex-col w-full py-1 lg:bg-white rounded-md lg:shadow-md pl-2 lg:pl-0"
                        >
                          <label>
                            <input type="checkbox" value="flight"> Podróż samolotem
                          </label>
                          <label>
                            <input type="checkbox" value="drive"> Podróż samochodem
                          </label>
                          <label>
                            <input type="checkbox" value="sleep"> Nocleg
                          </label>
                          <label>
                            <input type="checkbox" value="carrental"> Wynajem auta
                          </label>
                          <label>
                            <input type="checkbox" value="events"> Atrakcje
                          </label>
                        </ul>
                      </transition>
                    </div>
                </div>
              </div>
            </div>
            <div class="pt-4 flex items-center space-x-4">
              <button class="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancel
              </button>
              <button class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
