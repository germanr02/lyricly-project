import React, { useContext } from "react";

import { Lyrics, SearchResults } from "../index";

import Context from "../../../contexts/context";

import axios from "axios";

import "./lyrics-container.scss";

const LyricsContainer = () => {
  const { dispatch, state } = useContext(Context);
  const smart_pick = state.mxm_smart_pick;
  const is_reading_lyrics = state.is_reading_lyrics;

  const autoPickLyrics = async () => {
    if (smart_pick) {
      await axios.get(`/mxm/getLyrics/${smart_pick}`).then((res) => {
        const relatedVideo = state.current_genius_data.media.youtube;
        const videoTitle = state.current_genius_data.fullTitle;
        dispatch({
          type: "UPDATE_CONTEXT",
          payload: {
            ...state,
            current_lyrics: {
              track: res.data.track,
              lyrics: res.data.lyrics,
              relatedVideo,
              videoTitle,
            },
            is_reading_lyrics: true,
            mxm_new_results: false,
            mxm_smart_pick: null,
          },
        });
      });
    }
  };

  return (() => {
    autoPickLyrics();
    if (is_reading_lyrics) {
      return (
        <div className="lyrics-container">
          <Lyrics />
        </div>
      );
    } else {
      return (
        <div className="lyrics-container">
          <SearchResults type="MXM" setSideEffect={null} />
        </div>
      );
    } 
  })();
};

export default LyricsContainer;
