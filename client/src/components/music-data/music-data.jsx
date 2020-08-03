import React, { useContext } from "react";

import Tab from "../tab/tab.component";
import {
  InitialMessage,
  SearchResults,
  GeniusData,
  LyricsContainer,
  YoutubeResults
} from "./index";

import Context from "../../contexts/context";

import "./music-data.scss";

const LyricsDataContainer = () => {

  const { dispatch, state } = useContext(Context);
  const {
    geniusResultsLoading,
    mxmResultsLoading,
    geniusDataLoading,
    youtubeResultsLoading,
    music_data_active_tab
  } = state;

  const handleTabClick = async (event) => {
    await dispatch({
      type: "UPDATE_CONTEXT",
      payload: {
        ...state,
        music_data_active_tab: event.target.id
      },
    });
  };

  return (
    <div id="music-data-wrapper" className="music-data-wrapper">
      <div className="music-data-container mdl-shadow--2dp">
        <div className="tab-options">
          <Tab
            id="results-tab"
            name="Results"
            tabType="main"
            activeTabId={music_data_active_tab}
            loading={geniusResultsLoading}
            handleTabClick={handleTabClick}
          />
          <Tab
            id="lyrics-tab"
            name="Lyrics"
            tabType="main"
            activeTabId={music_data_active_tab}
            loading={mxmResultsLoading}
            handleTabClick={handleTabClick}
          />
          <Tab
            id="genius-tab"
            name="More"
            tabType="main"
            activeTabId={music_data_active_tab}
            loading={geniusDataLoading}
            handleTabClick={handleTabClick}
          />
          <Tab
            id="youtube-tab"
            name="YouTube"
            tabType="main"
            activeTabId={music_data_active_tab}
            loading={youtubeResultsLoading}
            handleTabClick={handleTabClick}
          />
        </div>

        {/* display results based on active tab*/}
        {music_data_active_tab === "results-tab" ? (
          <div className="music-data-content">
            <InitialMessage type="genius-search" />
            <SearchResults type="genius" />
          </div>
        ) : null}
        {music_data_active_tab === "genius-tab" ? (
          <div className="music-data-content">
            <InitialMessage type="genius-about" />
            <GeniusData />
          </div>
        ) : null}
        {music_data_active_tab === "lyrics-tab" ? (
          <div className="music-data-content">
            <InitialMessage type="MXM" />
            <LyricsContainer />
          </div>
        ) : null}
        {music_data_active_tab === "youtube-tab" ? (
          <div className="music-data-content">
            <InitialMessage type="youtube" />
            <YoutubeResults />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LyricsDataContainer;
