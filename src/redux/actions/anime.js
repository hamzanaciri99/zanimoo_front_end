import {ANIME} from '../actions/ActionTypes';
import axios from 'axios';

const baseUrl = 'http://localhost:3001/animeultima';

export const fetchAnime = (slug) => (dispatch) => {
  dispatch(animeLoading());

  /**
   * Using application/x-www-form-urlencoded format for params
   */
  const params = new URLSearchParams();
  params.append('slug', slug);

  axios.post(`${baseUrl}/anime`, params)
    .then(result => result.data)
    .then((anime) => {
      if(anime.error) {
        dispatch(animeFailed(anime.error));
      }
      else {
        dispatch(animeLoaded(anime));
      }
    })
    .catch(err => {
      console.log(`${baseUrl}/ep/${slug}`);
      console.log(err);
      dispatch(animeFailed(err.message));
    });
};

export const animeLoaded = (episode) => ({
  type: ANIME.ANIME_LOADED,
  payload: episode,
});

export const animeLoading = () => ({
  type: ANIME.ANIME_LOADING,
});

export const animeFailed = (errorMessage) => ({
  type: ANIME.ANIME_FAILED,
  payload: errorMessage,
});
