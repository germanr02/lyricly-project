import React from "react";

import VideoPlayer from "../video-player/video-player.component";
import { MusicData } from "../music-data/index";

import "./content-display.styles.scss";

const ContentDisplay = () => {
  return (
    <div className="content-container mdl-shadow--4dp">
      <div className="video-and-lyrics">
        <div className="media-content-container">
          <VideoPlayer />
        </div>
        <div className="data-container">
          <MusicData />
        </div>
      </div>
    </div>
  );
};

export default ContentDisplay;
