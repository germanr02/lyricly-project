import React from 'react';

import "./powered-by.scss";

const PoweredBy = ({type}) => {
  return (
    <div className="initial-message powered-by">
      Powered by{" "}
      {(() => {
        switch (type) {
          case "genius":
            return "Genius";
          case "MXM":
            return "Musixmatch";
          case "youtube":
            return "YouTube";
          default:
            return "'undefined'";
        }
      })()}
    </div>
  );
};

export default PoweredBy
