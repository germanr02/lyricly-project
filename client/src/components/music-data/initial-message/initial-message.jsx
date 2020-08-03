import React, { useContext } from "react";

import Context from "../../../contexts/context";

import "./initial-message.scss";

const InitialMessage = ({ type }) => {
  const { state } = useContext(Context);
  const {
    authUrls,
    genius_username,
    genius_search_results,
    current_genius_data,
    youtube_search_results
  } = state;

  const initialComponentMessage = () => {
    if (type === "genius-search" || type === "genius-about") {
      if (!genius_username) {
        return (
          <div className="initial-message login">
            <span>
              <a href={authUrls.genius}>Login to Genius</a> to get started
            </span>
          </div>
        );
      } else if (type === "genius-search") {
        if (!genius_search_results) {
          return (
            <div className="initial-message">
              <span style={{ fontStyle: "italic" }}>
                Search to get started...
              </span>
            </div>
          );
        }
      } else if (type === "genius-about") {
        if (!current_genius_data) {
          return (
            <div className="initial-message">
              Select an item from the results tab
            </div>
          );
        }
      }
    } else if (type === "MXM") {
      if (!current_genius_data) {
        return (
          <div className="initial-message">
            Select an item from the results tab
          </div>
        );
      }
    } else if (type === "youtube") {
      if (!current_genius_data && !youtube_search_results.length) {
        return (
          <div className="initial-message">
            Select an item from the results tab
          </div>
        );
      } else if (!youtube_search_results.length) {
        return (
          <div className="initial-message">
            Click 'Search For Video' from the 'More' tab to get results
          </div>
        );
      } 
    }
  };

  return <div>{initialComponentMessage()}</div>;
};

export default InitialMessage;
