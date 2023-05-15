<template>
  <nav id="navbar" class="relative z-10 w-full text-neutral-800">
    <div class="flex flex-col max-w-screen-xl px-8 mx-auto lg:items-center lg:justify-between lg:flex-row py-4">
      <div class="w-full flex flex-col lg:flex-row items-center space-x-4 xl:space-x-8">
        <div class="w-full flex flex-row items-center justify-between py-6">
          <div id="headerAndLogo">
            <h1 class="text-4xl">Fly or ride</h1>
          </div>
          <button class="rounded-lg lg:hidden focus:outline-none focus:shadow-outline" @click="open = !open">
            {{open ? 'Zwiń' : 'Rozwiń'}}
          </button>
        </div>
        <div class="w-[70%]">
          <ul
              :class="[open ? 'flex' : 'hidden lg:flex']"
              class="w-full h-auto flex flex-col flex-grow lg:items-center pb-4 lg:pb-0 lg:justify-start lg:flex-row origin-top duration-300 xl:space-x-2 space-y-3 lg:space-y-0"
          >
            <NavLink>Home</NavLink>
            <NavLink>Zapisane</NavLink>
            <NavLink>Inspiracje</NavLink>
            <li class="relative group">
              <button
                  class="md:px-4 py-2 text-sm bg-transparent rounded-lg text-[#666666] hover:text-gray-900 focus:outline-none focus:shadow-outline flex items-center"
                  @click="dropdownToggler"
                  @blur="dropdownToggler"
              >
                <span>Blog</span>
                <span v-if="dropdownNavbar" class="px-2"> ⬆️ </span>
                <span v-else class="px-2"> ⬇️ </span>

              </button>
              <transition name="transform-fade-down">
                <ul
                    v-if="dropdownNavbar"
                    class="flex lg:absolute flex-col max-w-42 py-1 lg:bg-white rounded-md lg:shadow-md pl-2 lg:pl-0"
                >
                  <li>
                    <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Polska</a>
                  </li>
                  <li>
                    <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Szwecja</a>
                  </li>
                  <li>
                    <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Włochy</a>
                  </li>
                  <li>
                    <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Hiszpania</a>
                  </li>
                </ul>
              </transition>
            </li>
            <NavLink>Kontakt</NavLink>
          </ul>
        </div>
      </div>
      <div :class="[open ? 'flex' : 'hidden lg:flex']" class="space-x-3 min-w-fit justify-center">
        <BaseButton class="bg-gradient-to-r from-[#468ef9] to-[#0c66ee] text-white">Rejestracja</BaseButton>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'BaseNavbar',
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap');

h1 {
  font-family: 'Nothing You Could Do', serif;
}
</style>
