import {RECENTS} from '../actions/ActionTypes';

export const recents = (state = {
    isLoading: true,
    failureMessage: null,
    episodes: [],
  }, action) => {
    switch(action.type) {
      case RECENTS.RECENTS_FAILED:
        return {
          ...state,
          failureMessage: action.payload,
          isLoading: false,
        };
      case RECENTS.RECENTS_LOADING:
        return {
          ...state,
          failureMessage:null,
          isLoading: true,
        }
      case RECENTS.RECENTS_LOADED:
        return {
          ...state,
          failureMessage: null,
          isLoading: false,
          episodes: action.payload,
        }
      default:
        return state;
    }
}