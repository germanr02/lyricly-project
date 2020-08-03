import React from "react";

const MusicArt = ({ albumArt, songArt }) => {
  return (
    <div className="genius-data-container">
      <div className="genius-data-title genius-data-text">Music Art</div>
      <span className="art genius-data-text genius-data-container">
        {albumArt ? (
          <div className="image-content">
            <a target="_blank" rel="noopener noreferrer" href={albumArt}>
              <img
                id="album-art"
                className="album-art"
                src={albumArt}
                alt="album art"
              />
            </a>
            <span>Album Art</span>
          </div>
        ) : null}
        {songArt ? (
          <div className="image-content">
            <a target="_blank" rel="noopener noreferrer" href={songArt}>
              <img className="song-art" src={songArt} alt="song art" />
            </a>
            <span>Song Art</span>
          </div>
        ) : null}
      </span>
    </div>
  );
};

export default MusicArt;
