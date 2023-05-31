import {defineStore} from "pinia";

// @ts-ignore
// @ts-ignore
export const useCarStore = defineStore('car', {
  state: () => {
    return {
      fuelConsumption: 7.5,
      fuelPrice: 1.4,
      distances: {}
    }
  },
  getters: {
    airportsDistance: async (state) => {
      const kiwiStore = useKiwiResultsStore();
      // @ts-ignore
      if (kiwiStore.airports !== undefined) {
        const queryStore = useQueryStore();
        // @ts-ignore
        const startPoint = queryStore.query.from;
        // @ts-ignore
        if (startPoint && kiwiStore.airports.length) {
          let distances = {};

          // @ts-ignore
          kiwiStore.airports.map(airport => distances[airport] = 0);
          const fetchUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?&units=metric` +
              `&destinations=${Object.keys(distances).map(airport => `airport%20${airport}%7C`)}` +
              `&origins=${startPoint}` +
              `&key=AIzaSyCFmoAQ5iDUdiz36GcaXskcXPFFgdaa4Dw`;

          return await fetch(fetchUrl).then(r => r.json()).then(r => {
            let response = r.rows[0].elements;
            Object.keys(distances).map((airport, index) => {
              // @ts-ignore
              distances[airport] = response[index];
              // @ts-ignore
              if (response[index].distance) distances[airport].cost = ((response[index].distance.value / 100000) * state.fuelPrice * state.fuelConsumption).toFixed(2);
            });
            console.log('Distances received');
            state.distances = distances;
            return distances;
          });
        }
      }
    },
  }
});
