import React, { useContext } from "react";

import Context from "../../contexts/context";

import "./video-player.styles.scss";

const VideoPlayer = () => {
  const current_video = useContext(Context).state.current_video;

  return <div className="video-iframe-div mdl-shadow--2dp">{
    (() => {
      {
        if (current_video) {
          const { title, id, autoplay } = current_video;
          return (
            <iframe
              className="video-iframe"
              title={title}
              src={`https://www.youtube.com/embed/${id}?autoplay=${autoplay}&playsinline=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          );
        } else {
          return (
            <div className="no-video-message">
              <div>Welcome to <i>Lyricly!</i></div>
              <div className="submessage">Choose a video from the search results</div>
            </div>
          );
        }
      };
    })()
  }</div>;
};

export default VideoPlayer;
