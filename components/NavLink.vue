<script lang="ts" setup>

const props = defineProps({
      to: {
        type: String
      }
    }
)
</script>

<template>
  <li class="py-1">
    <NuxtLink
        :to = to
        :replace = true
        class="md:px-8 py-2 text-sm bg-transparent rounded-lg text-[#666666] hover:text-gray-900 focus:outline-none focus:shadow-outline"
    >
      <slot/>
    </NuxtLink>
  </li>
</template>

<style scoped></style>
