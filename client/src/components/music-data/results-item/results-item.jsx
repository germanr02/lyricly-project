import React, { useContext } from "react";
import axios from "axios";

import Context from "../../../contexts/context";

import "./results-item.scss";

const MusicDataSearchItem = ({ artist, title, url, songId, itemType, subType }) => {
  const { dispatch, state } = useContext(Context);

  const handleLyricItemClick = async () => {
    await axios.get(`/mxm/getLyrics/${songId}`).then((res) => {
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
          mxm_smart_pick: null
        },
      });
    });
  };

  const handleGeniusItemClick = async () => {
    await dispatch({
      type: "UPDATE_CONTEXT",
      payload: {
        ...state,
        mxmResultsLoading: true,
        geniusDataLoading: true,
      },
    });

    const encodedArtist = encodeURIComponent(artist);
    const encodedTrack = encodeURIComponent(title);

    await axios
      .all([
        axios.get(`/genius/songs/${songId}`),
        axios.get(`/mxm/searchLyrics/${encodedArtist}/${encodedTrack}`),
      ])
      .then(
        axios.spread(async (geniusRes, mxmRes) => {
          var mxm_search_results = {};
          var mxm_error_message = null;
          var mxm_smart_pick = null;
          var mxm_new_results = false;

          try {
            mxm_search_results = mxmRes.data.message.body;
            mxm_new_results =
              JSON.stringify(state.mxm_search_results) !==
              JSON.stringify(mxm_search_results);
            
            // if genius item data === mxm item data -> immediately display lyrics
            mxm_smart_pick = mxm_search_results.track_list.find((r) => {
              const artistMatch =
                r.track.artist_name.toLowerCase() === artist.toLowerCase();
              const trackMatch =
                r.track.track_name.toLowerCase() === title.toLowerCase();
              return artistMatch && trackMatch;
            }).track.commontrack_id;

          } catch (error) {
            mxm_error_message = mxmRes.data.code;
          }

          // Genius data history variables
          var genius_index = state.genius_data_index;
          var genius_data_history = [
            ...state.genius_data_history,
            geniusRes.data,
          ];
          genius_index = genius_data_history.length - 1;

          var music_data_active_tab = "lyrics-tab";

          if(subType === "relationship") {
            music_data_active_tab = "genius-tab";
          }

          const lyric_length_available = (mxm_error_message) ? 0 : mxm_search_results.track_list.length;
          const lyrics_available_history = [...state.lyrics_available_history, lyric_length_available]
          console.log(lyrics_available_history)

          dispatch({
            type: "UPDATE_CONTEXT",
            payload: {
              ...state,
              current_genius_data: geniusRes.data,
              genius_data_history: genius_data_history,
              genius_data_index: genius_index,
              mxm_search_results: mxm_search_results,
              mxm_new_results: mxm_new_results,
              lyrics_available_history: lyrics_available_history,
              mxmResultsLoading: false,
              geniusDataLoading: false,
              mxm_error_message: mxm_error_message,
              is_reading_lyrics: false,
              music_data_active_tab,
              mxm_smart_pick
            },
          });
        })
      );
  };

  return (
    <div
      className="search-item mdl-shadow--2dp"
      onClick={
        itemType === "genius" ? handleGeniusItemClick : handleLyricItemClick
      }
    >
      <span className="title item-data">
        <i className="material-icons">music_note</i>
        <span>Track: {title}</span>
      </span>
      <span className="artist item-data">
        <i className="material-icons">account_circle</i>
        <span>Artist: {artist}</span>
      </span>
      <hr className="divider" />
      <span className="item-data">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`link ${itemType === "MXM" ? "mxmLink" : "geniusLink"}`}
        >
          {itemType === "MXM" ? "View on Musixmatch" : "View on Genius"}
        </a>
      </span>
    </div>
  );
};

export default MusicDataSearchItem;
