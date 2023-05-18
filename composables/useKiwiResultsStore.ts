
  import {defineStore} from "pinia";

  export const useKiwiResultsStore = defineStore('kiwiResults', () => {
    const kiwiResults = ref({});
    function setResults(newResults: Object) {
      kiwiResults.value = newResults;
    }

    return { kiwiResults, setResults };
  })
