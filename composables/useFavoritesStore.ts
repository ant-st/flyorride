import {defineStore} from "pinia";

export const useFavoritesStore = defineStore('favorites', {
  state: () => {
    return {
      favorites: []
    }
  },
  actions: {
    checkId (id: string) {
      // @ts-ignore
      return this.favorites.find(el => el.id === id)
    }
  }
});
