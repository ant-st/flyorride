
  import {defineStore} from "pinia";

  // @ts-ignore
  export const useKiwiResultsStore = defineStore('kiwiResults', {
    state: () => {
      return {
        // all these properties will have their type inferred automatically
        kiwiResults: {},
        distances: {}
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
      // @ts-ignore
      airportsDistance: async (state): Object => {
        // @ts-ignore
        if (state.airports !== undefined) {
          const queryStore = useQueryStore();
          // @ts-ignore
          const startPoint = queryStore.query.from;
          let distances = {};
          // @ts-ignore
          state.airports.map(airport => distances[airport] = 0);
          const fetchUrl = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?&units=metric` +
              `&destinations=${Object.keys(distances).map(airport => `airport%20${airport}%7C`)}` +
              `&origins=${startPoint}` +
              `&key=AIzaSyCFmoAQ5iDUdiz36GcaXskcXPFFgdaa4Dw`;

          await fetch(fetchUrl).then(r => r.json()).then(r => {
            let response = r.rows[0].elements;
            Object.keys(distances).map((airport, index) => {
              // @ts-ignore
              distances[airport] = response[index];
            });
            state.distances = distances;
          });

        }
      }
    }
  });
