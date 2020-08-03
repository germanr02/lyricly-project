import React, { useContext } from "react";

import { ResultsItem } from "../index";

import Context from "../../../contexts/context";

import "./search-results.scss";
import { PoweredBy } from "../index";

const SearchResults = ({ type }) => {
  const { state } = useContext(Context);
  const {
    mxm_search_results,
    genius_search_results,
    current_genius_data,
    genius_username,
  } = state;
  const mxmList = mxm_search_results.track_list
    ? mxm_search_results.track_list
    : [];

  const geniusSearchResults = () => {
    return (
      <div>
        {genius_search_results && genius_search_results != "error" && genius_search_results.length > 0 ? (
          <div className="music-data-search-results-message">
            Your track results
          </div>
        ) : null}
        {(() => {
          if (genius_username && genius_search_results) {
            if (genius_search_results.length > 0) {
              return genius_search_results.map((song) => {
                try {
                  const { result } = song;
                  return (
                    <ResultsItem
                      itemType={type}
                      key={result.url}
                      title={result.title}
                      artist={result.primary_artist.name}
                      url={result.url}
                      songId={result.id}
                    />
                  );
                } catch (error) {
                  return null;
                }
              });
            }
          }
        })()}
        <PoweredBy type="genius" />
      </div>
    );
  };

  const mxmSearchResults = () => {
    return (
      <div>
        {mxmList.length > 0 ? (
          <div className="music-data-search-results-message">
            Your track results
          </div>
        ) : null}
        {mxmList.map((r) => {
          try {
            return (
              <ResultsItem
                itemType={type}
                key={r.track.commontrack_id}
                title={r.track.track_name}
                artist={r.track.artist_name}
                url={r.track.track_share_url}
                songId={r.track.commontrack_id}
              />
            );
          } catch (error) {
            return null;
          }
        })}
        <PoweredBy type="MXM" />
      </div>
    );
  };

  const errorMessages = () => {
    if (type === "genius") {
      if (genius_username && genius_search_results) {
        if (genius_search_results.length === 0) {
          return (
            <div className="music-data-search-results-message">
              <span>
                No search results for
                <br />"{state.last_search}". <br />
                <br />
                Try something simple like "Artist - Track Title"
                <br />
                <br />
                Searches don't affect the video you're playing or the lyrics
                you've chosen, so feel free to search on!
              </span>
            </div>
          );
        }
      }
    } else if (type === "MXM") {
      if (mxmList.length === 0 && current_genius_data) {
        return (
          <div className="music-data-search-results-message">
            No lyric results for "{`${current_genius_data.fullTitle}`}".
            {state.mxm_error_message ? (
              <div>
                <br />
                error code: {state.mxm_error_message}
              </div>
            ) : null}
          </div>
        );
      }
    }
  };

  return (
    <div className="music-data-search-results">
      {type === "genius" ? geniusSearchResults() : mxmSearchResults()}
      {errorMessages()}
    </div>
  );
};

export default SearchResults;
