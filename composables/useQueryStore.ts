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

export const useQueryStore = defineStore('query', {
  state: () => {
    return {
      query: {} as queryType
    }
  },
  getters: {
    consumption: (state) => {
      // @ts-ignore
      return state.query.consumption;
    }
  }
});
