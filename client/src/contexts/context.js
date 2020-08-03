import React from "react";

const Context = React.createContext({
  // other app component states
  search_field: "",
  last_search: "",
  mxm_new_results: false,
  mxm_error_message: null,
  is_reading_lyrics: false,
  
  // search results
  genius_search_results: null,
  youtube_search_results: [],
  mxm_search_results: [],
  youtube_query: "",
  
  // active tabs
  music_data_active_tab: "results-tab",
  youtube_results_active_tab: "youtube-search-results-tab",

  // current data
  current_video: null,
  current_genius_data: null,
  current_lyrics: null,

  // history
  genius_data_history: [],
  lyrics_available_history: [],     // share same index as genius_data
  genius_data_index: 0,
  current_video_history: [],
  current_video_index: 0,

  // account data
  youtube_user_authorized: false,
  genius_user_authorized: false,
  youtube_username: null,
  genius_username: null,
  youtube_user_playlists: null,

  // auth urls
  authUrls: {
    youtube: "",
    genius: "",
  },

  // loading spinners
  youtubeResultsLoading: false,
  geniusResultsLoading: false,
  mxmResultsLoading: false,
  geniusDataLoading: false,
  youtubePlaylistsLoading: false,
});

export default Context;
