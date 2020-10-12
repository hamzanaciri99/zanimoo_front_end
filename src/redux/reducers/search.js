import {SEARCH} from '../actions/ActionTypes';

export const search = (state = {
    isLoading: false,
    failureMessage: null,
    nextPage: 1,
    isLast: false,
    animes: []
  },action) => {
    switch(action.type) {
      case SEARCH.SEARCH_FAILED:
        return {
          ...state,
          failureMessage: action.payload,
          isLoading: false,
        };
      case SEARCH.SEARCH_UNDERWAY:
          return {
            ...state,
            failureMessage: null,
            isLoading: true,
          };
      case SEARCH.SEARCH_DONE:
        return {
          ...state,
          animes: (action.payload.page > 1) ? state.animes.concat(action.payload.animes): action.payload.animes,
          isLoading: false,
          isLast: action.payload.animes.length < 20,
          nextPage: action.payload.page + 1,
        };
        case SEARCH.SEARCH_CLEARED:
          return {
            ...state,
            isLoading: false,
            animes: [],
          };
      default:
        return state;
    }
};
