<script lang="ts" setup>

type queryType = {
  'from'?: '',
  'airport'?: '',
  'to'?: '',
  'startDate'?: '',
  'endDate'?: '',
  'travellers'?: Number,
  'children'?: Number,
  'options'?: [],
  'fromID'?: '',
  'toID'?: '',
  'minNights'?: Number,
  'maxNights'?: Number,
  'dateInterval'?: Boolean,
  'consumption'?: Number

}
let query: queryType = {};

const kiwiSettings = {headers: {
    'accept': 'application/json',
    'apikey': 'yhlH-wn2SXQ_oUsYQK-nADaVbHkU0URm',
  }};

const store = useKiwiResultsStore();

const transformDate = (date: string | undefined) => {
  let elements = date ? date.split('-') : '';
  return elements[2]+'%2F'+elements[1]+'%2F'+elements[0];
}

const getKiwiCountryUrl = (query: string | undefined) => `https://api.tequila.kiwi.com/locations/query?term=${query}&locale=pl-PL&location_types=country&limit=1&active_only=true`
const getKiwiCityUrl = (query: string | undefined) => `https://api.tequila.kiwi.com/locations/query?term=${query}&locale=pl-PL&location_types=city&limit=1&active_only=true`
const getKiwiSearchUrl = (query: queryType) => {
  let result = `https://api.tequila.kiwi.com/v2/search?` +
  `fly_from=${query.fromID}&fly_to=${query.toID}` +
  `&flight_type=round&ret_from_diff_city=true&ret_to_diff_city=true` +
  `&one_for_city=0&one_per_date=0` +
  `&adults=${query.travellers}&children=${query.children}` +
  `&only_working_days=false&only_weekends=false&partner_market=pl` +
  `&max_stopovers=2&max_sector_stopovers=2&vehicle_type=aircraft&limit=20`;

  if (query.dateInterval) {
    result+=`&date_from=${transformDate(query.startDate)}&date_to=${transformDate(query.endDate)}` +
        `&return_from=${transformDate(query.startDate)}&return_to=${transformDate(query.endDate)}` +
        `&nights_in_dst_from=${query.minNights}&nights_in_dst_to=${query.maxNights}`;
  }
  else {
    result+=`&date_from=${transformDate(query.startDate)}&date_to=${transformDate(query.startDate)}` +
        `&return_from=${transformDate(query.endDate)}&return_to=${transformDate(query.endDate)}`
  }

  return result;
}

const handleQueryChange = (newQuery: Object) => {
  query = newQuery;
  getFromKiwi();
}

const getFromKiwi = async () => {
  store.kiwiResults = [];
  if (query.airport?.includes(',')) {
    query.fromID = await fetch(getKiwiCityUrl(query.airport.split(',')[0]), kiwiSettings).then(r => r.json()).then(r => {
      console.log(r.locations[0].id);
      return r.locations[0].id;
    });
  }
  else {
    query.fromID = await fetch(getKiwiCountryUrl(query.airport), kiwiSettings).then(r => r.json()).then(r => {
      console.log(r.locations[0].id);
      return r.locations[0].id;
    });
  }

  if (query.to?.includes(',')) {
    query.toID = await fetch(getKiwiCityUrl(query.to.split(',')[0]), kiwiSettings).then(r => r.json()).then(r => {
      console.log(r.locations[0].id);
      return r.locations[0].id;
    });
  }
  else {
    query.toID = await fetch(getKiwiCountryUrl(query.to), kiwiSettings).then(r => r.json()).then(r => {
      console.log(r.locations[0].id);
      return r.locations[0].id;
    });
  }

  await fetch(getKiwiSearchUrl(query), kiwiSettings).then(r => r.json()).then(r => {
    console.log(r);
    store.kiwiResults = r;
    navigateTo('/results')
  });
}

</script>

<template>
  <TheSearchBox @update:query = handleQueryChange />
  <div id="content" class="relative -top-80">
    <NuxtPage/>
  </div>

</template>

<style scoped></style>
