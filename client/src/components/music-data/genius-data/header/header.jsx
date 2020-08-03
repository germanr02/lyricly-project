import React, { useState } from "react";

import axios from "axios";

import "./header.scss";

const Header = ({
  state,
  dispatch,
  songTitle,
  youtubeLink,
  handleYouTubeStart,
}) => {
  const [innerWidth, setinnerWidth] = useState(window.innerWidth);
  const { genius_data_history } = state;
  const geniusDataArrLength = genius_data_history.length;
  var genius_index = state.genius_data_index;
  const lyrics_available_history = state.lyrics_available_history[genius_index];

  const handleVideoSearch = async () => {
    const title =
      state.genius_data_history[genius_index].title +
      " " +
      state.genius_data_history[genius_index].artist;

    const query = title.replace(/[^\w\s]/gi, "");

    await dispatch({
      type: "UPDATE_CONTEXT",
      payload: {
        ...state,
        youtubeResultsLoading: true,
      },
    });

    await axios
      .get(`/youtube/search/${query}`)
      .then((youtube) => {
        dispatch({
          type: "UPDATE_CONTEXT",
          payload: {
            ...state,
            last_search: title,
            youtube_search_results: youtube.data,
            youtubeResultsLoading: false,
            music_data_active_tab: "youtube-tab",
            youtube_query: title,
          },
        });
      })
      .catch((err) => console.log(err));

    if (innerWidth <= 963) {
      const element = document.getElementById("music-data-wrapper");
      element.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  const handleViewLyrics = async () => {

    await dispatch({
      type: "UPDATE_CONTEXT",
      payload: {
        ...state,
        mxmResultsLoading: true,
      },
    });

    const title = state.genius_data_history[genius_index].title;
    const artist = state.genius_data_history[genius_index].artist;
    const encodedArtist = encodeURIComponent(artist);
    const encodedTrack = encodeURIComponent(title);
    axios
      .get(`/mxm/searchLyrics/${encodedArtist}/${encodedTrack}`)
      .then((res) => {
        var mxm_search_results = {};
        var mxm_error_message = null;
        var mxm_smart_pick = null;
        var mxm_new_results = false;

        try {
          mxm_search_results = res.data.message.body;
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
          mxm_error_message = res.data.code;
        }

        dispatch({
            type: "UPDATE_CONTEXT",
            payload: {
              ...state,
              mxm_search_results: mxm_search_results,
              mxm_new_results: mxm_new_results,
              mxmResultsLoading: false,
              mxm_error_message: mxm_error_message,
              is_reading_lyrics: false,
              music_data_active_tab: "lyrics-tab",
              mxm_smart_pick
            },
          });

      });
  };

  const handleNavigate = async (event) => {
    const id = event.target.id;

    if (id === "genius_data_back") {
      if (genius_index > 0) genius_index -= 1;
    } else if (id === "genius_data_forward") {
      if (genius_index + 1 < geniusDataArrLength) genius_index += 1;
    }

    await dispatch({
      type: "UPDATE_CONTEXT",
      payload: {
        ...state,
        genius_data_index: genius_index,
      },
    });
  };

  return (
    <div>
      {(() => {
        const backArrow = genius_index > 0;
        const forwardArrow = genius_index < geniusDataArrLength - 1;
        return (
          <div className="history-arrows">
            <span
              className={`${
                !backArrow ? "nav-direction-disabled" : "nav-direction"
              }`}
              onClick={handleNavigate}
            >
              <i id="genius_data_back" className="material-icons">
                arrow_back
              </i>
            </span>
            <span
              className={`${
                !forwardArrow ? "nav-direction-disabled" : "nav-direction"
              }`}
              onClick={handleNavigate}
            >
              {/* <span className="nav-text">forward</span> */}
              <i id="genius_data_forward" className="material-icons">
                arrow_forward
              </i>
            </span>
          </div>
        );
      })()}
      <div className="genius-data-title genius-data-text genius-song-title">
        {songTitle}
        <br />
        {youtubeLink ? (
          <a
            className="media-link search-link"
            href="/#"
            onClick={handleYouTubeStart}
          >
            Watch related video
          </a>
        ) : (
          <span className="genius-data-text unavailable">
            Video unavailable
          </span>
        )}
        <br />
        <a
          className="media-link search-link"
          href="/#"
          onClick={handleVideoSearch}
        >
          Search title on YouTube
        </a>
        <br />
        {(() => {
          if (!lyrics_available_history) {
            return (
              <span className="genius-data-text unavailable">
                Lyrics unavailable
              </span>
            );
          }
          return (
            <a
              className="media-link search-link"
              href="/#"
              onClick={handleViewLyrics}
            >
              View Lyrics
            </a>
          );
        })()}
        <br />
        <span className="genius-data-text read-more">Read more.</span>
      </div>
    </div>
  );
};

export default Header;
