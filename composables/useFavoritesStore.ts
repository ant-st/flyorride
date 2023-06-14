import {defineStore} from "pinia";
import {useStorage} from "@vueuse/core";

interface IRoatrip {
  destination: string,
  origin: string,
  travelMode: string,
  travellers?: number
}

export const useFavoritesStore = defineStore('favorites', {
  state: () => {
    return {
      favorites: useStorage('favorites', [], localStorage, { mergeDefaults: true }),
      roadtrips: useStorage('roadtrips', [] as IRoatrip[], localStorage, { mergeDefaults: true }) ,
  }
  },
  actions: {
    checkId (id: string) {
      // @ts-ignore
      return this.favorites.find(el => el.id === id)
    },
    toggle (flight: any) {
      if (this.checkId(flight.id)) {
        // @ts-ignore
        this.favorites = this.favorites.filter(el => el.id !== flight.id);
        // @ts-ignore
      }
      else {
        // @ts-ignore
        this.favorites.push(flight);
      }
    },
    checkRoadtrip (request: IRoatrip) {
      return this.roadtrips.find(el => (el.destination === request.destination && el.origin === request.origin));
    },
    toggleRoadtrip (request: IRoatrip, travellers: number) {
      if (!this.checkRoadtrip(request)) {
        this.roadtrips.push({...request, travellers: travellers})
      }
      else {
        this.roadtrips = this.roadtrips.filter(el => (el.destination !== request.destination && el.origin !== request.origin));
      }
    }
  }
});
