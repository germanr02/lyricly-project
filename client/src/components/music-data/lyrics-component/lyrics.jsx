import React, { useContext, useEffect } from "react";

import Context from "../../../contexts/context";

import "./lyrics.scss";

const MXMLyrics = () => {
  const { dispatch, state } = useContext(Context);
  const { current_lyrics, mxm_new_results } = state;

  useEffect(() => {}, [mxm_new_results]);

  const handleBackClick = () => {
    dispatch({
      type: "UPDATE_CONTEXT",
      payload: {
        ...state,
        is_reading_lyrics: false,
        mxm_new_results: false,
      },
    });
  };

  // Same is in genius-data.component
  const handleYouTubeStart = () => {
    const index = current_lyrics.relatedVideo.search("=");
    const songId = current_lyrics.relatedVideo.slice(index + 1);
    dispatch({
      type: "UPDATE_CONTEXT",
      payload: {
        ...state,
        current_video: {
          title: current_lyrics.videoTitle,
          id: songId,
          autoplay: 1,
        },
      },
    });
    document.querySelector(".mdl-layout__content").scrollTop = 0;
  };

  return (
    <div className="lyrics-content-container">
      <div className="lyrics-header">
        <div className="top-links">
          <span className="back-function">
            <i className="back-arrow material-icons" onClick={handleBackClick}>
              arrow_back
            </i>
          </span>
          {(() => {
            if (current_lyrics.relatedVideo) {
              return (
                <a
                  href="/#"
                  className="media-link"
                  onClick={handleYouTubeStart}
                >
                  Watch related video
                </a>
              );
            } else {
              return (
                <span className="media-unavailable">Video unavailable</span>
              );
            }
          })()}
        </div>
        <div className="track-title-container">
          <div className="track-title">{`${current_lyrics.track.artist_name} - ${current_lyrics.track.track_name}`}</div>
          <div className="album-title">{`album: "${current_lyrics.track.album_name}"`}</div>
        </div>
      </div>
      <hr className="divider" />
      <div className="lyrics-container">
        <pre className="lyrics">{`${current_lyrics.lyrics.lyrics_body}`}</pre>
        <pre className="lyrics">{`${current_lyrics.lyrics.lyrics_copyright}`}</pre>
        <img src={current_lyrics.lyrics.pixel_tracking_url} />
      </div>
    </div>
  );
};

export default MXMLyrics;
