import {defineStore} from "pinia";

export const useQueryStore = defineStore('query', {
  state: () => {
    return {
      query: {}
    }
  },
  getters: {
    consumption: (state) => {
      // @ts-ignore
      return state.query.consumption;
    }
  }
});
