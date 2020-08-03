import React, { useContext } from "react";
import axios from "axios";

import Context from "../../../contexts/context";

import "./youtube-item.scss";

const YTSearchItem = ({ id, title, url, channelTitle, channelId, type }) => {
  const { state, dispatch } = useContext(Context);

  const handlePlaylistItemClick = async (event) => {
    await axios
      .get(`/youtube/playlist/items/${id}`)
      .then((res) => {
        dispatch({
          type: "UPDATE_CONTEXT",
          payload: {
            ...state,
            youtube_search_results: res.data,
            youtube_results_active_tab: "youtube-search-results-tab",
          },
        });
      })
      .catch((err) => console.log(err));
  };

  const handleVideoItemClick = async (event) => {
    var autoplay = event.target.id === "play-icon" ? 1 : 0;
    const search_field = title;

    dispatch({
      type: "UPDATE_CONTEXT",
      payload: {
        ...state,
        // last_search: search_field,
        current_video: {
          id,
          title,
          autoplay,
        },
      },
    });
    document.querySelector(".mdl-layout__content").scrollTop = 0;
  };

  return (
    <div
      className="youtube-result mdl-shadow--4dp"
      onClick={
        type === "playlistItem" ? handlePlaylistItemClick : handleVideoItemClick
      }
    >
      <div className="thumbnail-container">
        <div className="overlay">
          <i
            id={type === "playlistItem" ? "playlist-icon" : "play-icon"}
            className={`material-icons ${
              type === "playlistItem" ? "playlist-icon" : "play-icon"
            }`}
          >
            {(type === "playlistItem") ? ("list") : ("play_arrow")}
          </i>
        </div>
        <img
          className="video-thumbnail"
          src={url}
          alt={`thumbnail for ${title}`}
        />
      </div>

      <div className="video-data-container">
        <div className="video-title-container">
          <p className="video-title">{title}</p>
        </div>

        <div className="channel-title-container">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://youtube.com/channel/${channelId}`}
          >
            <span className="channel-title">Channel: {channelTitle}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default YTSearchItem;
