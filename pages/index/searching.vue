<script lang="ts" setup></script>

<template>
  <div class="relative px-4 py-10 bg-white mx-8 mx-10 shadow rounded-3xl sm:p-10 flex flex-col justify-between">
    <h2 class="w-full text-center text-2xl py-4">Szukam...</h2>
    <img
        src="../../media/loadingplane.png"
        alt="Rotating plane - loading animation"
        class="w-1/5 mx-auto rotating"
    />
  </div>
</template>

<style scoped>

@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.rotating {
  -webkit-animation: rotating 1.5s ease-in-out infinite;
  -moz-animation: rotating 1.5s ease-in-out infinite;
  -ms-animation: rotating 1.5s ease-in-out infinite;
  -o-animation: rotating 1.5s ease-in-out infinite;
  animation: rotating 1.5s ease-in-out infinite;
}

</style>
