<script lang="ts" setup>

</script>

<template>
  <div class="relative w-[48%] p-4 bg-blue-50 m-2 my-4 shadow rounded-3xl flex flex-col">
    <!-- First leg -->
    <div class="flex flex-line w-full justify-between items-end">
      <div class="flex flex-col w-1/3">
        <p class="text-xs">25.05.2023, 05:30 AM</p>
        <div class="flex flex-line items-center">
          <SVGTakeoff/>
          <div class="flex flex-col p-2">
            <p class="text-lg">Warszawa</p>
            <p class="text-xs">WAW</p>
          </div>
        </div>
      </div>
      <div class="w-1/3 ">
        <div class="h-1/2 text-center border-t-2 border-gray-400">
          <p class="text-xs p-2">9 godz. 20 min.</p>
        </div>
      </div>
      <div class="flex flex-col w-1/3 text-right">
        <p class="text-xs">26.05.2023, 01:30 AM</p>
        <div class="flex flex-line items-center justify-end">
          <div class="flex flex-col p-2">
            <p class="text-lg">Tokio</p>
            <p class="text-xs">HKF</p>
          </div>
          <SVGLanding/>
        </div>
      </div>
    </div>
    <!-- Nights -->
    <h3 class="my-6 py-2 mx-auto w-full border-y-2 text-center">12 nocy</h3>
    <!-- Second leg -->
    <div class="flex flex-line w-full justify-between items-end">
      <div class="flex flex-col w-1/3">
        <p class="text-xs">03.06.2023, 07:00 AM</p>
        <div class="flex flex-line items-center">
          <SVGTakeoff/>
          <div class="flex flex-col p-2">
            <p class="text-lg">Tokio</p>
            <p class="text-xs">HKF</p>
          </div>
        </div>
      </div>
      <div class="w-1/3 ">
        <div class="w-full stopover flex flex-col items-center relative">
          <p class="w-full mx-auto text-center">Przesiadka!</p>
          <span class="hidden w-[70%] box-border absolute top-7">
            <div class="box-border rounded-lg  py-2 w-full border-gray-200 border-2 bg-gray-100 text-center">
              <p>Dubaj, DXB</p>
              <p class="text-xs">2h oczekiwania</p>
            </div>
          </span>
        </div>
        <div class="h-1/2 text-center border-t-2 border-gray-400">
          <p class="text-xs p-2">9 godz. 20 min.</p>
        </div>
      </div>
      <div class="flex flex-col text-right w-1/3">
        <p class="text-xs">03.06.2023, 09:30 AM</p>
        <div class="flex flex-line items-center justify-end">
          <div class="flex flex-col p-2">
            <p class="text-lg">Warszawa</p>
            <p class="text-xs">WAW</p>
          </div>
          <SVGLanding/>
        </div>
      </div>
    </div>
    <!-- Car -->
    <div class="mx-auto my-6 flex flex-line w-[65%] items-center justify-center">
      <p class="w-[36%] text-right px-2">360km</p>
      <img src="../media/carIcon.svg" class="w-[28%]"/>
      <p class="w-[36%] px-2">4 godz. 20 min.</p>
    </div>
    <!-- Cost -->
    <div class="flex flex-line justify-between items-center">
      <ul>
        <li class="flex flex-line items-center">
          <img src="../media/plane1.svg" class="w-[40px]"/>
          <span class="text-sm px-2">2x</span> 3000zł
        </li>
        <li class="flex flex-line items-center">
          <img src="../media/suitcase.svg" class="w-[40px]"/>
          <span class="text-sm px-2">2x</span> 500zł
        </li>
        <li class="flex flex-line items-center">
          <img src="../media/carIcon.svg" class="w-[40px]"/>
          <span class="text-sm px-2">1x</span> 567zł
        </li>
      </ul>
      <h3 class="text-3xl">8567zł</h3>
    </div>
  </div>
</template>

<style scoped>

.stopover:hover > span {
  display: block;
}
</style>
