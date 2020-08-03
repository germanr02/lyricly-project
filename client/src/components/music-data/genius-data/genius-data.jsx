import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { PoweredBy } from "../index";
import { Header, MusicArt, SongRelationships, MediaLinks } from "./index";

import Context from "../../../contexts/context";

import "./genius-data.scss";

const GeniusData = () => {
  const { dispatch, state } = useContext(Context);
  // const { current_genius_data } = state;
  const genius_index = state.genius_data_index;
  const current_genius_data = state.genius_data_history[genius_index];
  // header component
  var songTitle = null;
  var youtubeLink = null;
  // music art component
  var albumArt = null;
  var songArt = null;
  // media component
  var mediaLinks = null;
  // song relationships
  var songRelationships = null;

  try {
    songTitle = current_genius_data.fullTitle;
    youtubeLink = current_genius_data.media.youtube;
    albumArt = current_genius_data.albumArt;
    songArt = current_genius_data.songArt;
    mediaLinks = current_genius_data.media;
    songRelationships = current_genius_data.songRelationships;
  } catch (error) {}

  useEffect(() => {
    const thisComponent = document.getElementById("genius-data-component");

    if (thisComponent) {
      thisComponent.scrollTop = 0;
    }
  }, [current_genius_data, genius_index]);

  // same as in mxm-lyrics.component
  const handleYouTubeStart = () => {
    const index = youtubeLink.search("=");
    const songId = youtubeLink.slice(index + 1);
    dispatch({
      type: "UPDATE_CONTEXT",
      payload: {
        ...state,
        current_video: {
          title: songTitle,
          id: songId,
          autoplay: 1,
        },
      },
    });
    document.querySelector(".mdl-layout__content").scrollTop = 0;
  };

  return (
    <div id="genius-data-component" className="genius-data">
      {!current_genius_data ? null : (
        <div>
          {/* song info component */}
          <Header
            state={state}
            dispatch={dispatch}
            songTitle={songTitle}
            youtubeLink={youtubeLink}
            handleYouTubeStart={handleYouTubeStart}
          />
          <hr className="genius-data-divider" />

          {/* Art component */}
          <MusicArt albumArt={albumArt} songArt={songArt} />
          <hr className="genius-data-divider" />

          {/* Media Links */}
          <MediaLinks
            mediaLinks={mediaLinks}
            handleYouTubeStart={handleYouTubeStart}
          />
          <hr className="genius-data-divider" />

          {/* Relationship components*/}
          <div className="song-relationships genius-data-container">
            {/* Samples component */}
            <div className="genius-data-title genius-data-text">
              This song has samples from -
            </div>
            <SongRelationships arr={songRelationships.samples} title="" />

            <div className="genius-data-title genius-data-text">...</div>
            <div className="genius-data-title genius-data-text">
              And has been
            </div>

            {/* Sampled-in component */}
            <SongRelationships
              arr={songRelationships.sampled_in}
              title="Sampled-In"
            />

            {/* Remixed-by component */}
            <div className="genius-data-title genius-data-text">...</div>
            <SongRelationships
              arr={songRelationships.remixed_by}
              title="Remixed-By"
            />

            {/* Covered-by component */}
            <div className="genius-data-title genius-data-text">...</div>
            <SongRelationships
              arr={songRelationships.covered_by}
              title="Covered-By"
            />
          </div>
        </div>
      )}
      <PoweredBy type="genius" />
    </div>
  );
};

export default GeniusData;
