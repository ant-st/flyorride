import {defineStore} from "pinia";
import {useStorage} from "@vueuse/core";

export const useFavoritesStore = defineStore('favorites', {
  state: () => {
    return {
      favorites: useStorage('favorites', [], localStorage, { mergeDefaults: true })
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
    }
  }
});
