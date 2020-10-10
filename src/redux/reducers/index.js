import { combineReducers } from "redux";
import { recents } from "./recents";
import { episode } from "./episode";
import { anime } from "./anime";

export default combineReducers({
  recents,
  episode,
  anime
});
