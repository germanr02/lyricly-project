import React from "react";

import {ResultsItem} from "../../index";

import "./song-relationships.scss";

const SongRelationships = ({arr, title}) => {
  return (
    <div>
      <div className="genius-data-title genius-data-text">{ title }</div>
      {arr.length > 0 ? (
        <div className="rel-container mdl-shadow--4dp">
          {arr.map((s) => {
            try {
              return (
                <div key={s.id} className="music-data-search-item">
                  <ResultsItem
                    itemType="genius"
                    subType="relationship"
                    setSideEffect={null}
                    artist={s.primary_artist.name}
                    title={s.title}
                    url={s.url}
                    songId={s.id}
                  />
                </div>
              );
            } catch (error) {
              return null;
            }
          })}
        </div>
      ) : (
        <span className="genius-data-text unavailable">None available</span>
      )}
    </div>
  );
};

export default SongRelationships;
