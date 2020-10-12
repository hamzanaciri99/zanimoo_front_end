/**
 * @enum {string}
 */
export const RECENTS = {
  /** Recent episodes are now being loaded */
  RECENTS_LOADING: 'RECENTS_LOADING',
  /** Recent episodes have failed to load */
  RECENTS_FAILED: 'RECENTS_FAILED',
  /** Recent episodes have been loaded successfully */
  RECENTS_LOADED: 'RECENTS_LOADED',
}

/**
 * @enum {string}
 */
export const POPULAR = {
  /** Popular animes are now being loaded */
  POPULAR_LOADING: 'POPULAR_LOADING',
  /** Popular animes have failed to load */
  POPULAR_FAILED: 'POPULAR_FAILED',
  /** Popular animes have been loaded successfully */
  POPULAR_LOADED: 'POPULAR_LOADED',
}

/**
 * @enum {string}
 */
export const TRENDS = {
  /** Trending animes are now being loaded */
  TRENDS_LOADING: 'TRENDS_LOADING',
  /** Trending animes episodes have failed to load */
  TRENDS_FAILED: 'TRENDS_FAILED',
  /** Trending animes episodes have been loaded successfully */
  TRENDS_LOADED: 'TRENDS_LOADED',
}

/**
 * @enum {string}
 */
export const LAST_ADDED = {
  /** Last added animes are now being loaded */
  LAST_ADDED_LOADING: 'LAST_ADDED_LOADING',
  /** Last added animes have failed to load */
  LAST_ADDED_FAILED: 'LAST_ADDED_FAILED',
  /** Last added animes have been loaded successfully */
  LAST_ADDED_LOADED: 'LAST_ADDED_LOADED',
}

/**
 * @enum {string}
 */
export const EPISODE = {
  /** Episode is now being loaded */
  EPISODE_LOADING: 'EPISODE_LOADING',
  /** Episode has failed to load */
  EPISODE_FAILED: 'EPISODE_FAILED',
  /** Episode has been loaded successfully */
  EPISODE_LOADED: 'EPISODE_LOADED',
};

/**
 * @enum {string}
 */
export const ANIME = {
  /** Anime is now being loaded */
  ANIME_LOADING: 'ANIME_LOADING',
  /** Anime has failed to load */
  ANIME_FAILED: 'ANIME_FAILED',
  /** Anime has been loaded successfully */
  ANIME_LOADED: 'ANIME_LOADED',
};

/**
 * @enum {string}
 */
export const SEARCH = {
  /** Search results are being loaded */
  SEARCH_UNDERWAY: 'SEARCH_LOADING',
  /** Search failed */
  SEARCH_FAILED: 'SEARCH_FAILED',
  /** Search is done  */
  SEARCH_DONE: 'SEARCH_LOADED',
  /** Search bar is empty / cleared  */
  SEARCH_CLEARED: 'SEARCH_CLEARED',
}
