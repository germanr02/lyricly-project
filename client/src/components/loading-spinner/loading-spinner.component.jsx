import React from "react";

import "./loading-spinner.styles.css";

const LoadingSpinner = () => {
  return (
    <div className="lds-facebook">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
