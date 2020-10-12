import {LAST_ADDED} from '../actions/ActionTypes';

export const lastAdded = (state = {
    isLoading: true,
    failureMessage: null,
    animes: [],
  }, action) => {
    switch(action.type) {
      case LAST_ADDED.LAST_ADDED_FAILED:
        return {
          ...state,
          failureMessage: action.payload,
          isLoading: false,
        };
      case LAST_ADDED.LAST_ADDED_LOADING:
        return {
          ...state,
          failureMessage:null,
          isLoading: true,
        }
      case LAST_ADDED.LAST_ADDED_LOADED:
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