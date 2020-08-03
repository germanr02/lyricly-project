import React from "react";

import LoadingSpinner from "../loading-spinner/loading-spinner.component";

import "./tab.styles.scss";

const Tab = ({ id, name, tabType, activeTabId, handleTabClick, loading }) => {
  
  // add custom classnames for different tab styles
  const className = (() => {
    switch (tabType) {
      case "main":
        return `tab ${activeTabId === id ? "active" : ""}`;
      case "subtab":
        return `sub-tab ${activeTabId === id ? "active" : ""}`;
      default:
        return `tab`;
    }
  })();

  return (
    <div id={`${id}`} className={className} onClick={handleTabClick}>
      {loading ? <LoadingSpinner /> : null}
      <span id={`${id}`}>{name}</span>
    </div>
  );
};

export default Tab;
