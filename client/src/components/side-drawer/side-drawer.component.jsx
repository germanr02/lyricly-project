import React, { useContext } from "react";

import SideDrawerNavLink from "../side-drawer-nav-link/side-drawer-nav-link.component";

import Context from "../../contexts/context";

import youtube_icon from "../../assets/youtube_icon.png";
// import genius_icon from "../../assets/genius_icon.png"
import "./side-drawer.styles.scss";

const SideDrawer = () => {
  const { authUrls } = useContext(Context).state;

  return (
    <div className="mdl-layout__drawer">
      <span className="mdl-layout-title account-title">Your Accounts</span>
      <hr />
      <nav className="mdl-navigation">
        <SideDrawerNavLink
          accountIcon={youtube_icon}
          accountType="YouTube"
          url={authUrls.youtube}
        />
        {/* 
          <SideDrawerNavLink
          accountIcon={genius_icon}
          accountType="Genius"
          url={authUrls.genius}
          />
        */}
      </nav>
    </div>
  );
};

export default SideDrawer;
