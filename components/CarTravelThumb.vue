<template>

  <div class="relative w-[95%] p-2.5 sm:p-4 bg-blue-50 sm:m-2 my-4 mx-auto shadow rounded-3xl flex flex-line justify-between">
    <div id="map" class="w-1/2 h-full">
      Map Component
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

<script>(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
({key: "AIzaSyCFmoAQ5iDUdiz36GcaXskcXPFFgdaa4Dw", v: "beta"});</script>


<script setup>

let map;
let queryStore = useQueryStore();
let carStore = useCarStore();

let travellers = queryStore.query.children + queryStore.query.travellers;
let route = ref();
let showCost = ref(false);

async function initMap() {
  const {DirectionsRenderer} = await google.maps.importLibrary("routes");
  const mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(51.919438, 19.1451359),
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  await calcRoute();
}
async function calcRoute() {
  const {DirectionsService, DirectionsRenderer} = await google.maps.importLibrary("routes");
  const directionsService = new google.maps.DirectionsService();
    const selectedMode = ['DRIVING'];
    const request = {
      origin: queryStore.query.from,
      destination: queryStore.query.to,
      travelMode: "DRIVING",
    };
    await directionsService.route(request, function(response, status) {
      if (status === 'OK') {
        new google.maps.DirectionsRenderer({
          directions: response,
          map: map,
        });
        route.value = response.routes[0].legs[0];
        console.log(route.value);
      }
    });
  }

onMounted(() => initMap());

</script>

<style>

.active {
  background-color: #3b82f6;
  color: white;
}
</style>
