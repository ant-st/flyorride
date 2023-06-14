<script>
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
({key: "AIzaSyCFmoAQ5iDUdiz36GcaXskcXPFFgdaa4Dw", v: "beta"});
</script>

<script setup>

await google.maps.importLibrary('core');
await google.maps.importLibrary('routes');

let map;
const props = defineProps({
  index: {
    type: String,
    required: true,
  },
  request: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(['routeUpdate'])
async function initMap() {
  const mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(51.919438, 19.1451359),
  };
  map = new google.maps.Map(document.getElementById(`map${props.index}`), mapOptions);
  await calcRoute();
}
async function calcRoute() {
  const directionsService = new google.maps.DirectionsService();
  await directionsService.route(props.request, function(response, status) {
    if (status === 'OK') {
      new google.maps.DirectionsRenderer({
        directions: response,
        map: map,
      });
      emit('routeUpdate', response.routes[0].legs[0]);
    }
  });
}

onMounted(() => initMap());

</script>

<template>
  <div :id='`map${index}`' class="w-full h-full">
    Component: Map
  </div>
</template>

<style scoped></style>
