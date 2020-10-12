import {TRENDS} from '../actions/ActionTypes';
import axios from 'axios';
import {baseUrl} from './baseUrl';

export const fetchTrends = () => (dispatch) => {
  dispatch(trendsLoading());

  axios.get(`${baseUrl}/trends`)
    .then(result => result.data)
    .then((animes) => {
      if(animes.error) {
        dispatch(trendsFailed(animes.error));
      }
      else {
        dispatch(trendsLoaded(animes));
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(trendsFailed(err.message));
    });
};

export const trendsLoaded = (animes) => ({
  type: TRENDS.TRENDS_LOADED,
  payload: animes,
});

export const trendsLoading = () => ({
  type: TRENDS.TRENDS_LOADING,
});

export const trendsFailed = (errorMessage) => ({
  type: TRENDS.TRENDS_FAILED,
  payload: errorMessage,
});
