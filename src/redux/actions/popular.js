import {POPULAR} from '../actions/ActionTypes';
import axios from 'axios';
import {baseUrl} from './baseUrl';

export const fetchPopular = () => (dispatch) => {
  dispatch(popularLoading());

  axios.get(`${baseUrl}/populars`)
    .then(result => result.data)
    .then((animes) => {
      if(animes.error) {
        dispatch(popularFailed(animes.error));
      }
      else {
        dispatch(popularLoaded(animes));
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(popularFailed(err.message));
    });
};

export const popularLoaded = (animes) => ({
  type: POPULAR.POPULAR_LOADED,
  payload: animes,
});

export const popularLoading = () => ({
  type: POPULAR.POPULAR_LOADING,
});

export const popularFailed = (errorMessage) => ({
  type: POPULAR.POPULAR_FAILED,
  payload: errorMessage,
});
