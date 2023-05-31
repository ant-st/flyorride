
  import {defineStore} from "pinia";

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
      // @ts-ignore
    }
  });
