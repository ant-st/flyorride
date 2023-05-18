<script lang="ts" setup>

const props = defineProps({
  flight: {
    type: Object
  }
})

</script>

<template>
  <div class="relative w-[30%] p-4 bg-blue-50 m-1 shadow rounded-3xl flex flex-col">
    <h3>{{flight.cityFrom}}, {{flight.flyFrom}} - {{flight.cityTo}}, {{flight.flyTo}}</h3>
    <p>{{flight.price}} euro</p>
  </div>
</template>

<style scoped></style>
