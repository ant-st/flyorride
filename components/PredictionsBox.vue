<script lang="ts" setup>
const props = defineProps({
  preds: {
    type: Array,
    required: true,
  },
});

defineEmits(['update:prediction', 'closeBox']);
</script>

<template>
  <transition name="transform-fade-down">
    <ul
        class="flex absolute -top-[65px] z-30 flex-col w-1/2 truncate ... py-1 lg:bg-white rounded-md lg:shadow-md pl-2 lg:pl-0"
    >
      <li v-for="pred in props.preds" class="p-2">
        <button @click = "() => {$emit('update:prediction', pred); $emit('closeBox');}">{{pred}}</button>
      </li>
    </ul>
  </transition>
</template>

<style scoped></style>
