
  import {defineStore} from "pinia";

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
    'consumption'?: Number,
    'returnFromOther'?: Boolean,
    'returnToOther'?: Boolean,
    'stopovers'?: Number

  }

  const kiwiSettings = {headers: {
      'accept': 'application/json',
      'apikey': 'yhlH-wn2SXQ_oUsYQK-nADaVbHkU0URm',
    }};
  const transformDate = (date: string | undefined) => {
    let elements = date ? date.split('-') : '';
    return elements[2]+'%2F'+elements[1]+'%2F'+elements[0];
  }
  const getKiwiCountryUrl = (query: string | undefined) => `https://api.tequila.kiwi.com/locations/query?term=${query}&locale=pl-PL&location_types=country&limit=1&active_only=true`
  const getKiwiCityUrl = (query: string | undefined) => `https://api.tequila.kiwi.com/locations/query?term=${query}&locale=pl-PL&location_types=city&limit=1&active_only=true`
  const getKiwiSearchUrl = (query: queryType) => {
    let result = `https://api.tequila.kiwi.com/v2/search?` +
        `fly_from=${query.fromID}&fly_to=${query.toID}` +
        `&flight_type=round&ret_from_diff_city=${query.returnFromOther}&ret_to_diff_city=${query.returnToOther}` +
        `&one_for_city=0&one_per_date=0` +
        `&adults=${query.travellers}&children=${query.children}` +
        `&only_working_days=false&only_weekends=false&partner_market=pl` +
        `&max_stopovers=${query.stopovers}&max_sector_stopovers=2&vehicle_type=aircraft&limit=200`;

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

  // @ts-ignore
  export const useKiwiResultsStore = defineStore('kiwiResults', {
    state: () => {
      return {
        // all these properties will have their type inferred automatically
        kiwiResults: {},
        distances: {},
        filters: {
          airports: [],
          destinations: []
        },
        error: '',
      }
    },
    getters: {
      airports: (state) => {
        // @ts-ignore
        if (state.kiwiResults.data) {
          // @ts-ignore
          return [...new Set(state.kiwiResults.data.map(item => item.flyFrom))];
        }
      },
      destinations: (state) => {
        // @ts-ignore
        if (state.kiwiResults.data) {
          // @ts-ignore
          return [...new Set(state.kiwiResults.data.map(item => item.cityTo))];
        }
      },
      filteredResults: (state) => {
        // @ts-ignore
        if (state.kiwiResults.data) {
          // @ts-ignore
          return state.kiwiResults.data.filter(flight => {
            // @ts-ignore
            return !(state.filters.airports.includes(flight.flyFrom) || state.filters.destinations.includes(flight.cityTo));
          });
        }
      },
    },
    actions: {
      getFromKiwi: async function() {
        const queryStore = useQueryStore();
        const query = queryStore.query;
        const carStore = useCarStore();

        // Redirecting to loading page
        navigateTo('/searching');
        let searchError = false;

        // reset of previous results
        this.kiwiResults = [];
        this.filters = {
          airports: [],
          destinations: []
        }
        carStore.distances = {};

        //getting targets' Kiwi IDs
        if (query.airport?.includes(',')) {
          query.fromID = await fetch(getKiwiCityUrl(query.airport.split(',')[0]), kiwiSettings).then(r => r.json()).then(r => {
            console.log(r.locations[0].id);
            return r.locations[0].id;
          }).catch(e => {
            this.error = 'Nie znaleziono miejsca startu! '+ e;
            navigateTo('/error');
            searchError = true;
          });
        }
        else {
          query.fromID = await fetch(getKiwiCountryUrl(query.airport), kiwiSettings).then(r => r.json()).then(r => {
            console.log(r.locations[0].id);
            return r.locations[0].id;
          }).catch(e => {
            this.error = 'Nie znaleziono miejsca startu! ' + e;
            navigateTo('/error');
            searchError = true;
          });
        }

        if (query.to?.includes(',')) {
          query.toID = await fetch(getKiwiCityUrl(query.to.split(',')[0]), kiwiSettings).then(r => r.json()).then(r => {
            console.log(r.locations[0].id);
            return r.locations[0].id;
          }).catch(e => {
            this.error = 'Nie znaleziono miejsca docelowego! ' + e;
            navigateTo('/error');
            searchError = true;
          });
        }
        else {
          query.toID = await fetch(getKiwiCountryUrl(query.to), kiwiSettings).then(r => r.json()).then(r => {
            console.log(r.locations[0].id);
            return r.locations[0].id;
          }).catch(e => {
            this.error = 'Nie znaleziono miejsca docelowego!' + e;
            navigateTo('/error');
            searchError = true;
          });
        }

        //searching for results
        if (!searchError) {
          await fetch(getKiwiSearchUrl(query), kiwiSettings).then(r => r.json()).then(r => {
            console.log(r);
            if (r.error) {
              this.error = r.error;
              navigateTo('/error');
            }
            else {
              this.kiwiResults = r;
              navigateTo('/results');
            }
          }).catch(e => {
            this.error = e;
            navigateTo('/error');
          });
        }
      }
    }
  });
