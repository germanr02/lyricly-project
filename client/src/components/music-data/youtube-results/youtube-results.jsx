import React, { useContext } from "react";

import Context from "../../../contexts/context";

import { PoweredBy, YTSearchItem } from "../index";

import "./youtube-results.scss";

const YoutubeResults = () => {
  const { dispatch, state } = useContext(Context);
  const { youtube_search_results } = state;

  const displayErrorMessage = () => {
    return (
      <div className="message">
        {/* <span>{youtube_search_results.error}</span> */}
        <span>
          The daily YouTube quota has been reached. <br />
          You may continue using the results and related videos for more.
          <br />
          <br />
          YouTube search results will reset by tomorrow.
          <br />
          {/* 
              To support me (the developer) and help me set a higher quota limit, you can donate <a href="/#">here</a>. <br/>
              All proceeds will go towards funding this project and getting 100% of the lyrics and a higher YouTube quota. <br/><br/>
              */}
          Thanks for using Lyricly, hope you enjoy!
          <br />
          <br />
        </span>
      </div>
    );
  };

  const displayYoutubeResults = () => {
    return (
      <div className="yt-results-container">
        {youtube_search_results.map((result) => {
          try {
            const id = result.id.videoId || result.snippet.resourceId.videoId;
            const thumbnailURL = result.snippet.thumbnails.medium.url;
            const title = result.snippet.title;
            const channelTitle = result.snippet.channelTitle;
            const channelId = result.snippet.channelId;
            return (
              <YTSearchItem
                key={id}
                type="videoItem"
                id={id}
                url={thumbnailURL}
                title={title}
                channelTitle={channelTitle}
                channelId={channelId}
              />
            );
          } catch (error) {
            {
              /* exlude any non-working results */
            }
            return null;
          }
        })}
      </div>
    );
  };

  const handleDisplay = () => {
    if (
      youtube_search_results !== null &&
      youtube_search_results.length !== 0
    ) {
      return (
        <div>
          <div className="music-data-search-results-message" style={{textAlign: "center"}}>
            Your video results for "{state.youtube_query}"
          </div>
          {(() => {
            if (youtube_search_results.error) {
              return displayErrorMessage();
            } else {
              return displayYoutubeResults();
            }
          })()}
        </div>
      );
    }
  };

  return (
    <div className="youtube-results">
      {}
      {handleDisplay()}
      <PoweredBy type="youtube" />
    </div>
  );
};

export default YoutubeResults;
