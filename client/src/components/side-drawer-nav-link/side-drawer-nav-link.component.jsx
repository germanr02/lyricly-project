import React, { useContext } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import Context from "../../contexts/context";
import "./side-drawer-nav-link.styles.scss";

const SideDrawerNavLink = ({ accountIcon, accountType, url }) => {
  const { state, dispatch } = useContext(Context);

  const handleRevokeHover = (event, action) => {
    const initialValue =
      accountType === "YouTube" ? state.youtube_username : state.genius_username;

    event.target.previousSibling.lastChild.innerHTML =
      action === "over" ? "Revoke access?" : initialValue;
  };

  const handleRevoke = () => {
    if (accountType === "YouTube") {
      axios
        .get("/youtube/revokeCredentials")
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: "UPDATE_CONTEXT",
              payload: {
                ...state,
                youtube_username: null,
                youtube_user_playlists: null
              },
            });
          }
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .get("/genius/revokeCredentials")
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: "UPDATE_CONTEXT",
              payload: {
                ...state,
                genius_username: null,
                current_genius_data: null,
              },
            });
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const isAccountAuthorized = () => {
    const accountName =
      accountType === "YouTube" ? state.youtube_username : state.genius_username;
    const revokeIconId = uuidv4();

    if (accountName) {
      return (
        <span className="mdl-navigation__link">
          <span className="account-info">
            <span>
              <img
                className="account-icon"
                src={accountIcon}
                alt={`${accountType} "icon"`}
              />
              <span id={accountType} className="account-name">
                {accountName}
              </span>
            </span>
            <i
              id={revokeIconId}
              className="material-icons revoke-icon"
              onMouseOver={(e) => handleRevokeHover(e, "over")}
              onMouseLeave={(e) => handleRevokeHover(e, null)}
              onClick={handleRevoke}
            >
              close
            </i>
            <div className="mdl-tooltip" htmlFor={revokeIconId}>
              Revoke
            </div>
          </span>
        </span>
      );
    }
    return (
      <a id={`${accountType}-link`} href={url} className="mdl-navigation__link">
        Login to {accountType}
      </a>
    );
  };

  return isAccountAuthorized();
};

export default SideDrawerNavLink;
