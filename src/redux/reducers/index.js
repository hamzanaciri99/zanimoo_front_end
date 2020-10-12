import { combineReducers } from 'redux';
import { recents } from './recents';
import { episode } from './episode';
import { anime } from './anime';
import { popular } from './popular';
import { trends } from './trends';
import { lastAdded } from './lastAdded';
import { search } from './search';

export default combineReducers({
  recents,
  episode,
  anime, 
  popular,
  trends,
  lastAdded,
  search,
});
