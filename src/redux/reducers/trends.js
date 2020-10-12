import {TRENDS} from '../actions/ActionTypes';

export const trends = (state = {
    isLoading: true,
    failureMessage: null,
    animes: [],
  }, action) => {
    switch(action.type) {
      case TRENDS.TRENDS_FAILED:
        return {
          ...state,
          failureMessage: action.payload,
          isLoading: false,
        };
      case TRENDS.TRENDS_LOADING:
        return {
          ...state,
          failureMessage:null,
          isLoading: true,
        }
      case TRENDS.TRENDS_LOADED:
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