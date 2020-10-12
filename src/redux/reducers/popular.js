import {POPULAR} from '../actions/ActionTypes';

export const popular = (state = {
    isLoading: true,
    failureMessage: null,
    animes: [],
  }, action) => {
    switch(action.type) {
      case POPULAR.POPULAR_FAILED:
        return {
          ...state,
          failureMessage: action.payload,
          isLoading: false,
        };
      case POPULAR.POPULAR_LOADING:
        return {
          ...state,
          failureMessage:null,
          isLoading: true,
        }
      case POPULAR.POPULAR_LOADED:
        return {
          ...state,
          failureMessage: null,
          isLoading: false,
          animes: action.payload,
        }
      default:
        return state;
    }
}