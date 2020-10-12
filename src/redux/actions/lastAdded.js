import {LAST_ADDED} from '../actions/ActionTypes';
import axios from 'axios';
import {baseUrl} from './baseUrl';

export const fetchLastAdded = () => (dispatch) => {
  dispatch(lastAddedLoading());

  axios.get(`${baseUrl}/lastadded`)
    .then(result => result.data)
    .then((animes) => {
      if(animes.error) {
        dispatch(lastAddedFailed(animes.error));
      }
      else {
        dispatch(lastAddedLoaded(animes));
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(lastAddedFailed(err.message));
    });
};

export const lastAddedLoaded = (animes) => ({
  type: LAST_ADDED.LAST_ADDED_LOADED,
  payload: animes,
});

export const lastAddedLoading = () => ({
  type: LAST_ADDED.LAST_ADDED_LOADING,
});

export const lastAddedFailed = (errorMessage) => ({
  type: LAST_ADDED.LAST_ADDED_FAILED,
  payload: errorMessage,
});
