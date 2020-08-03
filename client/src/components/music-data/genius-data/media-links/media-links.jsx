import React from "react";

const MediaLinks = ({ mediaLinks, handleYouTubeStart }) => {
  return mediaLinks ? (
    <div className="genius-data-container">
      <div className="genius-data-title genius-data-text">Media</div>
      <div className="mediaLinks">
        YouTube:{" "}
        {mediaLinks.youtube ? (
          <span>
            <a className="mediaLinks-link" href="/#" onClick={handleYouTubeStart}>
              Start Now
            </a>
            {", "}
            <a
              className="mediaLinks-link"
              target="_blank"
              rel="noopener noreferrer"
              href={mediaLinks.youtube}
            >
              New Tab
            </a>
          </span>
        ) : (
          <span className="genius-data-text unavailable">None available</span>
        )}
      </div>
      <div className="mediaLinks">
        Spotify:{" "}
        {mediaLinks.spotify ? (
          <span>
            <a
              className="mediaLinks-link"
              target="_blank"
              rel="noopener noreferrer"
              href={mediaLinks.spotify}
            >
              Open
            </a>
          </span>
        ) : (
          <span className="genius-data-text unavailable">None available</span>
        )}
      </div>
    </div>
  ) : null;
};

export default MediaLinks;
