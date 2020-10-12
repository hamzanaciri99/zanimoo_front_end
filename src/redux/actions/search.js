import {SEARCH} from '../actions/ActionTypes';
import axios from 'axios';
import {baseUrl} from './baseUrl';

export const fetchSearchResults = (query, page = 1) => (dispatch) => {
  dispatch(seachUnderway());

  console.log('starting to search!');
  axios.get(`${baseUrl}/search/${query}/${page}`)
    .then(result => result.data)
    .then((searchResults) => {
      console.log('search done!');
      if(searchResults.error) {
        dispatch(searchFailed(searchResults.error));
      }
      else {
        dispatch(searchDone(searchResults, page));
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(searchFailed(err.message));
    });
};

export const searchCleared = () => ({
  type: SEARCH.SEARCH_CLEARED,
});

export const searchDone = (animes, page) => ({
  type: SEARCH.SEARCH_DONE,
  payload: {
      animes,
      page,
    },
});

export const seachUnderway = () => ({
  type: SEARCH.SEARCH_UNDERWAY,
});

export const searchFailed = (errorMessage) => ({
  type: SEARCH.SEARCH_FAILED,
  payload: errorMessage,
});
