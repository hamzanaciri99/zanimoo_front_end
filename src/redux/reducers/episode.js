import {EPISODE} from '../actions/ActionTypes';

export const episode = (state = {
    isLoading: true,
    failureMessage: null,
    episode: {}
  },action) => {
    switch(action.type) {
      case EPISODE.EPISODE_FAILED:
        return {
          ...state,
          failureMessage: action.payload,
          isLoading: false,
        };
      case EPISODE.EPISODE_LOADING:
          return {
            ...state,
            failureMessage: null,
            isLoading: true,
          };
      case EPISODE.EPISODE_LOADED:
        return {
          ...state,
          episode: action.payload,
          isLoading: false,
        };
      default:
        return state;
    }
};
