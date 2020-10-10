import {ANIME} from '../actions/ActionTypes';

export const anime = (state = {
    isLoading: true,
    failureMessage: null,
    anime: {}
  },action) => {
    switch(action.type) {
      case ANIME.ANIME_FAILED:
        return {
          ...state,
          failureMessage: action.payload,
          isLoading: false,
        };
      case ANIME.ANIME_LOADING:
          return {
            ...state,
            failureMessage: null,
            isLoading: true,
          };
      case ANIME.ANIME_LOADED:
        return {
          ...state,
          anime: action.payload,
          isLoading: false,
        };
      default:
        return state;
    }
};
