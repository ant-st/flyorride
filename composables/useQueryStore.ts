import {defineStore} from "pinia";

export const useQueryStore = defineStore('query', {
  state: () => {
    return {
      query: {}
    }
  }
});
