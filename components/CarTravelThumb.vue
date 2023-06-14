<template>

  <div class="relative w-[95%] p-2.5 sm:p-4 bg-blue-50 sm:m-2 my-4 mx-auto shadow rounded-3xl flex flex-line justify-between">
    <div class="w-1/2 h-full">
      <Map
          :request="request"
          :index="index ? index : '0'"
          @routeUpdate = 'routeUpdate'
      />
    </div>
    <div v-if='route' class="w-1/2 flex flex-col">
      <button v-if='travellers-1'
              @click='() => showCost = !showCost'
              class="px-8 xl:px-10 w-1/2 py-3 my-4 mx-auto  min-w-fit
                text-gray-900
                text-sm sm:text-md text-center rounded-full
                hover:shadow-md hover:shadow-blue-300
                transition duration-500 bg-blue-100"
              :class="{active: showCost}"
      >
        <span>Pokaż koszty {{showCost ? 'za wszystkich' : 'na osobę'}} </span>
      </button>
      <h2 class="w-full text-center">W jedną stronę: </h2>
      <div
          class="m-2 flex flex-line w-full items-center justify-center border-t-2"
      >
        <p class="w-[35%] text-xs sm:text-base text-right px-2">{{Math.round(route.distance.value/1000)}} km</p>
        <img src="../media/carIcon.svg" class="w-[20%] transform "/>
        <p class="w-[35%] text-xs sm:text-base px-2">{{Math.floor(route.duration.value / 3600)}} godz. {{Math.floor(route.duration.value / 60 % 60)}} min.</p>
      </div>
      <h2 class="text-3xl hover:underline w-full text-right">{{ ((route.distance.value / 100000) * carStore.fuelPrice * carStore.fuelConsumption / (showCost ? travellers : 1)).toFixed(2) }}€</h2>
      <h2 class="w-full text-center">W dwie strony: </h2>
      <div
          class="m-2 flex flex-line w-full items-center justify-center border-t-2"
      >
        <p class="w-[35%] text-xs sm:text-base text-right px-2">{{Math.round(route.distance.value*2/1000)}} km</p>
        <img src="../media/carIcon.svg" class="w-[20%] -scale-x-100"/>
        <p class="w-[35%] text-xs sm:text-base px-2">{{Math.floor(route.duration.value * 2 / 3600)}} godz. {{Math.floor(route.duration.value * 2 / 60 % 60)}} min.</p>
      </div>
      <h2 class="text-3xl hover:underline w-full text-right">{{ ((route.distance.value * 2  / 100000) * carStore.fuelPrice * carStore.fuelConsumption / (showCost ? travellers : 1)).toFixed(2) }}€</h2>
    </div>
  </div>

</template>

<script setup>
const props = defineProps({
  request: {
    type: Object,
    required: true,
  },
  travellers: {
    type: Number,
    required: true
  },
  index: {
    type: String,
    required: false
  }
})

let carStore = useCarStore();

let route = ref();
let showCost = ref(false);

const routeUpdate = (newRoute) => {
  route.value = newRoute;
}
</script>

<style>

.active {
  background-color: #3b82f6;
  color: white;
}
</style>
