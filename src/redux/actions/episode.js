import {EPISODE} from '../actions/ActionTypes';
import axios from 'axios';
import {baseUrl} from './baseUrl';

export const fetchEpisode = (slug) => (dispatch) => {
  dispatch(episodeLoading());

  /**
   * Using application/x-www-form-urlencoded format for params
   */
  const params = new URLSearchParams();
  params.append('slug', slug);

  axios.post(`${baseUrl}/ep`, params)
    .then(result => result.data)
    .then((episode) => {
      if(episode.error) {
        dispatch(episodeFailed(episode.error));
      }
      else {
        dispatch(episodeLoaded(episode));
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(episodeFailed(err.message));
    });
};

export const episodeLoaded = (episode) => ({
  type: EPISODE.EPISODE_LOADED,
  payload: episode,
});

export const episodeLoading = () => ({
  type: EPISODE.EPISODE_LOADING,
});

export const episodeFailed = (errorMessage) => ({
  type: EPISODE.EPISODE_FAILED,
  payload: errorMessage,
});
