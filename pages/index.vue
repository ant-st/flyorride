<script lang="ts" setup>

type optionsType = {
  name: string,
  value: string
}

type queryType = {
  'from'?: '',
  'airport'?: '',
  'to'?: '',
  'startDate'?: '',
  'endDate'?: '',
  'travellers'?: Number,
  'children'?: Number,
  'options': optionsType[],
  'fromID'?: '',
  'toID'?: '',
  'minNights'?: Number,
  'maxNights'?: Number,
  'dateInterval'?: Boolean,
  'consumption'?: Number,
  'returnFromOther'?: Boolean,
  'returnToOther'?: Boolean,
  'stopovers'?: Number

}
let query: queryType;

const kiwiStore = useKiwiResultsStore();
const handleQueryChange = (newQuery: queryType) => {
  query = newQuery;
  if (query.options.find((el: optionsType) => el.value === 'flight')) {
    getFromKiwi();
  }
}

const getFromKiwi = async () => {
  await kiwiStore.getFromKiwi();
}

</script>

<template>
  <TheSearchBox @update:query = handleQueryChange />
  <div id="content" class="relative -top-80">
    <NuxtPage/>
  </div>

</template>

<style scoped></style>
