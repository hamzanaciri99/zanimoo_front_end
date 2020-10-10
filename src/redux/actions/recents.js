import {RECENTS} from '../actions/ActionTypes';
import axios from 'axios';

const baseUrl = 'http://localhost:3001/animeultima';

export const fetchRecents = () => (dispatch) => {
  dispatch(recentsLoading());

  axios.get(`${baseUrl}/recent`)
    .then(result => result.data)
    .then((episodes) => {
      if(episodes.error) {
        dispatch(recentsFailed(episodes.error));
      }
      else {
        dispatch(recentsLoaded(episodes));
      }
    })
    .catch(err => {
      console.log(`${baseUrl}/recent`);
      console.log(err);
      dispatch(recentsFailed(err.message));
    });
};

export const recentsLoaded = (episodes) => ({
  type: RECENTS.RECENTS_LOADED,
  payload: episodes,
});

export const recentsLoading = () => ({
  type: RECENTS.RECENTS_LOADING,
});

export const recentsFailed = (errorMessage) => ({
  type: RECENTS.RECENTS_FAILED,
  payload: errorMessage,
});
